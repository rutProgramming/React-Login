import { Link } from "react-router"
import { linkStyle, navStyle } from "./style"
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/reduxStore";

const NavBar = () => {
  const id = useSelector((state: RootState) => state.id);
    return (
        <Box component="nav" sx={navStyle}>
          <Link to="Home" style={linkStyle}>Home</Link>|
          <Link to="Recipes" style={linkStyle}>Show Recipes</Link>|
          <Link to="profile" style={linkStyle}>Profile</Link>|
          {id !== 0 && <Link to="/AddRecipe" style={linkStyle}>Add Recipe</Link>} 
        </Box>
      );

}
export default NavBar