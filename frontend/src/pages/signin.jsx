import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
function Signin() {
const [formData, setFormData] = useState({
    email: "",
    password: "",
    })
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
const [showPassword, setShowPassword] = useState(false)
const navigate = useNavigate();
    function handleChange(e){
        setFormData({
                ...formData,
                [e.target.name]: e.target.value,
        })
    }
    async function handleSubmit(e) {
        e.preventDefault()
if(!formData.email || !formData.password){
    setError("All fields are required")
    setSuccess("")
    return
}
try {    
    const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    const data = await res.json()
    if(!res.ok){
        localStorage.removeItem("authToken")
        localStorage.removeItem("userEmail")
        localStorage.removeItem("userName")
        setError(data.message || "Something went wrong")
        setSuccess("")
    } else {
        localStorage.setItem("userName", data.name || "")
        localStorage.setItem("userEmail", data.email || formData.email.trim().toLowerCase())
        localStorage.setItem("authToken", data.token || "")
setTimeout(() => {
  navigate("/dashboard") }, 2000)
    setFormData({
        email: "",
        password: "",
    })
        setError("")
        setSuccess("Login Successful!")
}
} catch {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    setError("Server error. Try again later.")
    setSuccess("")
}
}
return(
    <main>
    <div>
<h1>Welcome back. Please login</h1>
<p> {error} </p>
<p> {success} </p>
<form onSubmit={handleSubmit}>
    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
    <br/>
    <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
<br/>
<button type="button" onClick={() => setShowPassword(!showPassword)}>
{showPassword ? "Hide" : "Show"}
  </button>
<br/>
    <button type="submit">Sign In</button>
    </form>
    <p>Don't have an account? 
        <br/>
        <Link to="/signup">Sign up</Link>
        </p>
</div>
</main>
)
}
export default Signin
