import { useContext } from "react";
import { Context } from "../App";
import { centerStyle } from "./style";

export default()=>{
     const [user] = useContext(Context);
     return (<>
    <div  style={centerStyle}>
        {user.firstName?
        <div>{user.firstName }, {user.lastName }, {user.address },{user.email} ,{user.phone}</div>:
        <div>{user.email}</div>
        }
        </div></>)
}