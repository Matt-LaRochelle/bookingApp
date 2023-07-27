import "./navbar.css"
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const handleClick = () => {
    dispatch({type: 'LOGOUT'})
  }

  return (
    <div className="navbar">
      <div className="navContainer">
      <Link to='/' style={{color: "inherit", textDecoration:"none"}}>
        <span className="logo">lamabooking</span>
      </Link>
        {user ? user.username : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>
        )}
        {/* I am adding a logout button */}
        {user && <button onClick={handleClick}>Logout</button>}
      </div>
    </div>
  )
}

export default Navbar