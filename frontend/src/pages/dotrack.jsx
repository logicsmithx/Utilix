import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
function Dotrack() {
const authToken=localStorage.getItem("authToken") || ""
const [formData,setFormData]=useState({title:"",description:"",date:"",time:""})
const [tasks,setTasks]=useState([])
const [error,setError]=useState("")
useEffect(()=>{
if(!authToken){
setError("Please sign in again to view your tasks")
return
}
fetch('http://localhost:5000/api/tasks',{
headers:{Authorization:`Bearer ${authToken}`}
})
.then(async res=>({ok:res.ok,data:await res.json()}))
.then(({ok,data})=>{
if(!ok)throw new Error(data.message || "Failed to load tasks")
setTasks(data)
})
.catch(()=>setError("Failed to load tasks"))
},[authToken])
function handleChange(e){
setFormData({...formData,[e.target.name]:e.target.value})
}
async function handleAddtask(e){
e.preventDefault()
if(!authToken){
setError("Please sign in again to add tasks")
return
}
if(!formData.title.trim()){
setError("Task title is required")
return
}else if(formData.title.length>50){
setError("Title too long")
return
}else if(formData.date&&new Date(formData.date)<new Date().setHours(0,0,0,0)){
setError("Cannot select past date")
return
}
try{
const res=await fetch('http://localhost:5000/api/tasks',{
method:'POST',
headers:{'Content-Type':'application/json',Authorization:`Bearer ${authToken}`},
body:JSON.stringify({...formData,completed:false})
})
const saved=await res.json()
if(!res.ok){
setError(saved.message || "Failed to add task")
return
}
setTasks([...tasks,saved])
setFormData({title:"",description:"",date:"",time:""})
setError("")
}catch{
setError("Failed to add task")
}
}
async function handleDelete(id){
try{
const res=await fetch(`http://localhost:5000/api/tasks/${id}`,{method:'DELETE',headers:{Authorization:`Bearer ${authToken}`}})
if(!res.ok){
throw new Error("Delete failed")
}
setTasks(tasks.filter(t=>t.id!==id))
}catch{
setError("Delete failed")
}
}
function handleToggle(id){
setTasks(tasks.map(t=>t.id===id?{...t,completed:!t.completed}:t))
}
return(
<div>
<main>
<Link to="/dashboard">⬅️ Back to Dashboard</Link>
{error&&<p>{error}</p>}
<h1>📝 DoTrack</h1>
<form onSubmit={handleAddtask}>
<input type="text" name="title" placeholder="Task Title" value={formData.title} onChange={handleChange}/>
<br/>
<textarea name="description" placeholder="Description (optional)" value={formData.description} onChange={handleChange}/>
<br/>
<input type="date" name="date" value={formData.date} onChange={handleChange}/>
<br/>
<input type="time" name="time" value={formData.time} onChange={handleChange}/>
<br/>
<button type="submit">Add Task</button>
</form>
<h3>Task list</h3>
<ol>
{tasks.map((t)=>(
<li key={t.id}>
<h4>{t.completed?"✔️ ":""}{t.title}</h4>
{t.description&&<p>{t.description}</p>}
{(t.date||t.time)&&<p>{t.date} {t.time}</p>}
<button onClick={()=>handleToggle(t.id)}>{t.completed?"Undo":"Complete"}</button>
<br/>
<button onClick={()=>handleDelete(t.id)}>Delete</button>
</li>
))}
</ol>
</main>
</div>
)
}
export default Dotrack
