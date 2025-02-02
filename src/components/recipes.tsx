
import { Outlet } from "react-router"
import RecipesList from "./recipesList"
import { centerStyle } from "./style"

const Recipes=()=>{
    return (<>
    <div style={centerStyle}>
        <Outlet/>
       <RecipesList/>
    </div>
   </> )
}
export default Recipes