import {Link} from 'react-router-dom'
function Home() {
return(
<div>
<main>
<section>
<h1> <mark>Utilix.</mark> A Multi Productivity Tool</h1>
<p>All you require at one place!</p>
</section>
<section>
<h1>Features</h1>
<h2>📝 DoTrack</h2>
<ul>
<li>Organize tasks with deadlines</li>
<li>Edit and update tasks easily</li>
<li>Track completion status</li>
<li>Stay on top of pending work</li>
</ul>
<h2>📒 NoteStack</h2>
<ul>
<li>Create and manage notes quickly</li>
<li>Organize using custom tags</li>
<li>Search notes instantly</li>
<li>Keep ideas structured</li>
</ul>
<h2>🌐 API Lab </h2>
<ul>
<li>Send GET & POST requests</li>
<li>View real-time API responses</li>
<li>Check status codes instantly</li>
<li>Test APIs without external tools</li>
</ul>
<h2>🔐 SafeKeys</h2>
<ul>
<li>Store credentials securely</li>
<li>Generate strong passwords</li>
<li>Check password strength</li>
<li>Quick access to saved logins</li>
</ul>
<h2>⌨️ KeySprint</h2>
<ul>
<li>Real-time typing test</li>
<li>Measure speed (WPM)</li>
<li>Track accuracy</li>
<li>Improve typing skills</li>
</ul>
</section>
<section>
<h3>Get Started</h3>
<Link to="/login" className="btn">Login</Link>
<br/>
<Link to="/signup" className="btn primary">Sign Up</Link>
</section>
</main>
</div>
)
}
export default Home