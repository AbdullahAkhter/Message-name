
import React, { useState } from 'react'
import { useAuth_data } from '../context/Authcontext'
import Sidebar from './components/sidebar';
import MessageContainer from './components/messageContainer';

const home = () => {
  const { Login_user } = useAuth_data();
  const [selectedUser,setuser]=useState(null)
  const handleselecteduser=(user)=>{
    setuser(user)
  }
  const handlesidebarshow=()=>{
    setuser(null)
  }

 
  return (
    <div
    className='flex gap-4 min-w-[550px] max-w-[65%] h-[95%] md:h-full backdrop-filter backdrop-blur-lg'>
     
      <div
      className={`w-full md:flex ${selectedUser?'hidden':''}`}
      >
        <Sidebar
       onSelectUser={handleselecteduser}
         />
      </div>
      <div
      className={`w-full md:flex ${selectedUser?'':'hidden'}`}
      >
         <MessageContainer
        onBackUser={handlesidebarshow}/>
      </div>
    </div>
  )
}

export default home