import {Link} from 'react-router-dom'
import { useState } from 'react'
function Signup() {
const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    })
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
const [showPassword, setShowPassword] = useState(false)
    function handleChange(e){
        setFormData({
                ...formData,
                [e.target.name]: e.target.value,
        })
    }
    async function handleSubmit(e) {
        e.preventDefault()
if(!formData.name || !formData.email || !formData.password){
    setError("All fields are required")
    setSuccess("")
    return
}
try {    
    const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    const data = await res.json()
    if(!res.ok){
        setError(data.message || "Something went wrong")
        setSuccess("")
    } else {
        setSuccess("Account created successfully")
    setFormData({
        name: "",
        email: "",
        password: "",
    })
        setError("")
}
} catch (err) {
    setError("Server error. Try again later.")
    setSuccess("")
}
}
return(
    <main>
    <div className="signup-container">
<h1>Create Your Account</h1>
<p> {error} </p>
<p> {success} </p>
<form onSubmit={handleSubmit}>
    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
    <br/>
    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
    <br/>
    <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
    <br/>
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? "Hide" : "Show"}
  </button>
<br/>
    <button type="submit">Sign Up</button>
    </form>
    <p>Already have an account? 
        <br/>
        <Link to="/signin">Sign in</Link>
        </p>
</div>
</main>
)
}
export default Signup