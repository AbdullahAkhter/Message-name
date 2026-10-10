import { createContext, useContext, useState } from "react";
const Authcontext=createContext();
export const useAuth_data=()=>(
    useContext(Authcontext)
);
export const Authcontextprovider=({children})=>{
    const[Login_user,setLogin_user]=useState(JSON.parse(localStorage.getItem('chatapp')||null));
    const[current_chatters,setchatter]=useState({});
    return <Authcontext.Provider value={{Login_user,setLogin_user,current_chatters,setchatter}}>
        {children}
    </Authcontext.Provider>
}