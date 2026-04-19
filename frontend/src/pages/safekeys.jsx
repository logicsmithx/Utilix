import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'
function createPassword(length = 12){
const chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
const randomValues=new Uint32Array(length)
crypto.getRandomValues(randomValues)
let pass=""
for(let i=0;i<length;i++){pass+=chars[randomValues[i]%chars.length]}
return pass
}
function Safekeys(){
const authToken=localStorage.getItem("authToken") || ""
const [formData,setFormData]=useState({site:"",username:"",password:""})
const [items,setItems]=useState([])
const [strength,setStrength]=useState("")
const [error,setError]=useState("")
const [show,setShow]=useState(false)
useEffect(()=>{
if(!authToken){
setError("Please sign in again to view your saved credentials")
return
}
fetch('http://localhost:5000/api/passwords',{headers:{Authorization:`Bearer ${authToken}`}})
.then(async res=>({ok:res.ok,data:await res.json()}))
.then(({ok,data})=>{
if(!ok)throw new Error(data.message || "Failed to load")
setItems(data)
})
.catch(()=>setError("Failed to load"))
},[authToken])
function handleChange(e){
const {name,value}=e.target
setFormData({...formData,[name]:value})
if(name==="password")checkStrength(value)
}
async function handleAdd(e){
e.preventDefault()
if(!authToken){setError("Please sign in again to save credentials");return}
if(!formData.site.trim()||!formData.username.trim()||!formData.password.trim()){setError("All fields required");return}
try{
const res=await fetch('http://localhost:5000/api/passwords',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${authToken}`},body:JSON.stringify(formData)})
const saved=await res.json()
if(!res.ok){setError(saved.message || "Failed to save");return}
setItems([...items,saved])
setFormData({site:"",username:"",password:""})
setError("")
setStrength("")
}catch{setError("Failed to save")}
}
async function handleDelete(id){
try{
const res=await fetch(`http://localhost:5000/api/passwords/${id}`,{method:'DELETE',headers:{Authorization:`Bearer ${authToken}`}})
if(!res.ok){throw new Error("Delete failed")}
setItems(items.filter(i=>i.id!==id))
}catch{setError("Delete failed")}
}
function generatePassword(){
const pass=createPassword()
setFormData({...formData,password:pass})
checkStrength(pass)
}
function checkStrength(pw){
if(!pw){setStrength("");return}
let score=0
if(pw.length>=8)score++
if(/[A-Z]/.test(pw))score++
if(/[0-9]/.test(pw))score++
if(/[^A-Za-z0-9]/.test(pw))score++
if(score<=1)setStrength("Weak")
else if(score===2)setStrength("Medium")
else setStrength("Strong")
}
return(
<div>
<main>
<Link to="/dashboard">⬅️ Back to Dashboard</Link>
<h1>🔐 SafeKeys</h1>
<form onSubmit={handleAdd}>
<input type="text" name="site" placeholder="Site" value={formData.site} onChange={handleChange}/>
<br/>
<input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange}/>
<br/>
<input type={show?"text":"password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange}/>
<br/>
<button type="button" onClick={()=>setShow(!show)}>{show?"Hide":"Show"}</button>
<br/>
<button type="button" onClick={generatePassword}>Generate Password</button>
<br/>
<button type="submit">Save</button>
</form>
{error&&<p>{error}</p>}
{strength&&<p>Strength: {strength}</p>}
<h3>Saved Credentials</h3>
<ol>
{items.map((i)=>(
<li key={i.id}>
<h4>{i.site}</h4>
<p>{i.username}</p>
<button onClick={()=>handleDelete(i.id)}>Delete</button>
</li>
))}
</ol>
</main>
</div>
)
}
export default Safekeys
