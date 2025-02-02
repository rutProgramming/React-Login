
import { Outlet } from "react-router"
import RecipesList from "../store/recipesList"
import { centerStyle } from "./style"

const Recipes=()=>{
    return (
    <div style={centerStyle}>
       <RecipesList/>
       <Outlet/>
    </div>)
}
export default Recipes