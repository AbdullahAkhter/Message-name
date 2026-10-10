import{Outlet,Navigate} from "react-router-dom"
import { useAuth_data } from "../context/Authcontext";
export const Varifyuser=()=>{
    const{Login_user}=useAuth_data();
    return Login_user?<Outlet/>:<Navigate to={'/login'}/>
}
