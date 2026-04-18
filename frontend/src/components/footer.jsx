import {Link} from 'react-router-dom'
function Footer() {
return(
<footer>
<div>
<h2>Utilix</h2>
<p>
All-in-one productivity tool
</p>
</div>
<div>
<Link to="/privacypolicy">Privacy Policy</Link>
<br/>
<Link to="/termsandconditions">Terms and Conditions</Link>
<br/>
<p>
Copyright © {new Date().getFullYear()} Utilix. All rights reserved.
</p>
</div>
</footer>
)
}
export default Footer