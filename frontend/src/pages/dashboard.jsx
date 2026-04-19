import {Link, useNavigate} from 'react-router-dom'
function Dashboard() {
const navigate = useNavigate()
const hour = new Date().getHours()
const userName = localStorage.getItem("userName")?.trim()
let greeting="Hello"
if(hour<12) {
greeting="Good Morning"
} else if(hour<18) {
greeting="Good Afternoon"
} else {
greeting="Good Evening"
}
const greetingText = userName ? `${greeting} ${userName}` : greeting
function handleLogout(){
localStorage.removeItem("authToken")
localStorage.removeItem("userEmail")
localStorage.removeItem("userName")
navigate('/signin')
}
return(
<div>
<main>
<h1>{greetingText}</h1>
<h2>Welcome to Utilix Dashboard</h2>
<button type="button" onClick={handleLogout}>Logout</button>
<section>
<h3>Your Tools</h3>
<ul>
<li>
<Link to="/dotrack">
<h4>📝 DoTrack</h4>
<p>Organize tasks with deadlines</p>
</Link>
</li>
<li>
<Link to="/notestack">
<h4>📒 NoteStack</h4>
<p>Create and manage notes quickly</p>
</Link>
</li>
<li>
<Link to="/apilab">
<h4>🌐 API Lab</h4>
<p>View real-time API responses</p>
</Link>
</li>
<li>
<Link to="/safekeys">
<h4>🔐 SafeKeys</h4>
<p>Store credentials securely</p>
</Link>
</li>
<li>
<Link to="/keysprint">
<h4>⌨️ KeySprint</h4>
<p>Real-time typing test</p>
</Link>

</li>
</ul>
</section>
</main>
</div>
)
}
export default Dashboard
