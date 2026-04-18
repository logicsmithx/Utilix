import {Link} from "react-router-dom"
function Header() {
return(
<nav>
<Link to="/">Home</Link>
<br/>
<Link to="/about">About Us</Link>
<br/>
<Link to="/contact">Contact Us</Link>
<br/>
</nav>
)
}
export default Header