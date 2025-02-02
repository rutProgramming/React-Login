import { Navigate, Outlet } from "react-router"
import NavBar from "./NavBar"
import WelcomePage from "./WelcomePage"
const AppLayout = () => {
    return (<>
        <NavBar></NavBar>
        <WelcomePage />
        <Navigate to="Home" replace />
        <Outlet></Outlet>
    </>)
}

export default AppLayout