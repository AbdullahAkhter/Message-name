import { Children, useEffect, useState } from "react";
import { createContext, useContext } from "react";
import io from "socket.io-client"
import { useAuth_data } from "./Authcontext";
const SocketContext=createContext();
export const useSocketContext=()=>{
    return useContext(SocketContext);
}
export const SocketContextProvider=({children})=>{
    const[socket,setsocket]=useState(null)
    const[onlineuser,setonlineuser]=useState([])
    const{Login_user}=useAuth_data()

    useEffect(()=>{
        if(Login_user){
           
        const socketConnection=io('http://localhost:3000',{
            query:{userID:Login_user._id
        }})
    socketConnection.on('getOnlineUsers',(users)=>{
        setonlineuser(users)
        console.log("online users are ",users)
})


setsocket(socketConnection);
return()=>socketConnection.close()
    }
    else{
        if(socket){
            socket.close()
            setsocket(null)
        }
    }

    },[Login_user])
  return(  <SocketContext.Provider value={[socket,onlineuser]}>
           {children}
        </SocketContext.Provider>)
   
}