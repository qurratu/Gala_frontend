import './header.css'
import Icon from '../assets/icon.png'
import { Link } from 'react-router-dom'
import { faHome, faUser,faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header=()=> {
let clientName= localStorage.getItem('clientName')
let loginType= localStorage.getItem('userType')
  return (
    // <div className="h-100 w-100 test">
      <header className="header-fixed">

<div
 style={{
  textAlign:'right'
}}
className="header-limiter h-100">

 

  {/* <nav className='d-flex'> */}
  <Link 
//  onClick={localStorage.removeItem('access_token')}
className='adminList mr-0 '
to="/">  
  <FontAwesomeIcon
      className="searchIcon mr-1"
      icon={faSignOutAlt}
      />{" "}
Logout</Link>
  
    {/* <a href="#">Logout</a> */}
    {/* <a href="#" className="selected">Blog</a>
    <a href="#">Pricing</a>
    <a href="#">About</a>
    <a href="#">Faq</a>
    <a href="#">Contact</a> */}
  {/* </nav> */}

</div>

</header>


// <div className="header-fixed-placeholder"></div>
//     </div>
  
  );
}

export default Header;