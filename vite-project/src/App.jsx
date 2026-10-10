
import React from 'react'
import Login from './login/login'
import {Routes,Route} from "react-router-dom"
import Registration from './login/registration'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Home from './home/home'
import {Varifyuser} from './utils/VarifyUser'



const App = () => {
 
  return (
   <div
   className='w-screen h-screen p-2 justify-center items-center flex  '>
   
   <ToastContainer/>
   <Routes>
    
  <Route
  element={<Varifyuser/>}>
      <Route
      path='/'
      element={<Home/>}/>
    </Route>
    
    
   
    <Route
    path='/login'
    element={<Login/>}/>
    <Route
    path='/registration'
    element={<Registration/>}
    />
   </Routes>
   </div>
  )
}

export default App