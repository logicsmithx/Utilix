import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/header'
import Home from './pages/home'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Dashboard from './pages/dashboard'
import About from './pages/about'
import Contact from './pages/contact'
import Footer from './components/footer'
function App() {
return(
<div>
<BrowserRouter>
<Header/>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/signin" element={<Signin/>}/>
<Route path="/signup" element={<Signup/>}/>
<Route path="/dashboard" element={<Dashboard/>}/>
<Route path="/about" element={<About />}/>
<Route path="/contact" element={<Contact/>}/>
</Routes>
<Footer/>
</BrowserRouter>
</div>
  )
}
export default App