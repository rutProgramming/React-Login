import { Link } from "react-router"
import { navStyle } from "./style"

const NavBar = () => {
    
    return (<>
        <nav style={navStyle}>
        <Link to="home">Home</Link>|
        <Link to="recipes">show recipes</Link>|
        <Link to="profile">profile</Link>

        </nav>
    </>)
}

export default NavBar