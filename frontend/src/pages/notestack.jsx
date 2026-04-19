import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
function Notestack(){
const authToken=localStorage.getItem("authToken") || ""
const [note,setNote]=useState({title:"",note:"",category:""})
const [notes,setNotes]=useState([])
const [filter,setFilter]=useState("")
const [error,setError]=useState("")
useEffect(()=>{
if(!authToken){
setError("Please sign in again to view your notes")
return
}
fetch('http://localhost:5000/api/notes',{
headers:{Authorization:`Bearer ${authToken}`}
})
.then(async res=>({ok:res.ok,data:await res.json()}))
.then(({ok,data})=>{
if(!ok)throw new Error(data.message || "Failed to load notes")
setNotes(data)
})
.catch(()=>setError("Failed to load notes"))
},[authToken])
function handleChange(e){setNote({...note,[e.target.name]:e.target.value})}
async function handleAddnote(e){
e.preventDefault()
if(!authToken){setError("Please sign in again to add notes");return}
if(!note.title.trim()){setError("Note title is required");return}
else if(note.title.length>50){setError("Title too long");return}
try{
const res=await fetch('http://localhost:5000/api/notes',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${authToken}`},body:JSON.stringify(note)})
const saved=await res.json()
if(!res.ok){setError(saved.message || "Failed to add note");return}
setNotes([...notes,saved])
setNote({title:"",note:"",category:""})
setError("")
}catch{setError("Failed to add note")}
}
async function handleDelete(id){
try{
const res=await fetch(`http://localhost:5000/api/notes/${id}`,{method:'DELETE',headers:{Authorization:`Bearer ${authToken}`}})
if(!res.ok){throw new Error("Delete failed")}
setNotes(notes.filter(n=>n.id!==id))
}catch{setError("Delete failed")}
}
return(
<div>
<main>
<Link to="/dashboard">⬅️ Back to Dashboard</Link>
{error&&<p>{error}</p>}
<h1>📒 NoteStack</h1>
<form onSubmit={handleAddnote}>
<input type="text" name="title" placeholder="Note Title" value={note.title} onChange={handleChange}/>
<br/>
<textarea name="note" placeholder="note" value={note.note} onChange={handleChange}/>
<br/>
<input type="text" name="category" placeholder="Category (e.g. Study, Personal)" value={note.category} onChange={handleChange}/>
<br/>
<button type="submit">Add Note</button>
</form>
<h3>Notes</h3>
<input type="text" placeholder="Filter by category" value={filter} onChange={(e)=>setFilter(e.target.value)}/>
<ol>
{notes.filter(n=>!filter?true:n.category.toLowerCase().includes(filter.toLowerCase())).map((n)=>(
<li key={n.id}>
<h4>{n.title}</h4>
{n.category&&<p>📂 {n.category}</p>}
{n.note&&<p>{n.note}</p>}
<button onClick={()=>handleDelete(n.id)}>Delete</button>
</li>
))}
</ol>
</main>
</div>
)
}
export default Notestack
