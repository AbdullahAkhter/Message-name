
import React, { useState } from 'react'
import axios from "axios"
import { ToastContainer,toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'


const Registration = () => {
  const [gender, setgender] = useState("")
  const [input, setInput] = useState({})
  const[loading,setloading]=useState(false);
  
  
  const navigate=useNavigate();

  const handleInput = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value })
    console.log(input)
  }
 
  const selectgender=(gender)=>{
    setgender(gender)
    setInput({...input,gender:gender})
    
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    setloading(true);
    const sign_up=await axios.post('/api/auth/register',input)
    const data=sign_up.data;
    console.log(`response is ${data}`);
    if(data.success===false){
      setloading(false);
      toast.error(data.message)

      return
      
    }
    toast.success(data.message)
    localStorage.setItem('login_data',JSON.stringify(input))
   navigate('/')
    
    
    
    
  
   

  }
  
    return (
      <div>
        <div
          className='w-full rounded-lg p-6 backdrop-filter backdrop-blur-lg'>
          <h1
            className='text-3xl font-bold text-white'>Sign_up <span
              className='text-gray-950 '>Chatter</span></h1>
          <div>
            <form
            onSubmit={handleSubmit}>

              <div
                className='space-y-2 mt-2'>
                <h1
                  className='text-xl font-bold'>Fullname</h1>
                <input
                  className='rounded-lg bg-gray-400 py-2 px-9'
                  placeholder='Enter your fullname'
                  id='fullname'
                  type='text'
                  name='fullname'
                  onChange={handleInput} />
              </div>
              <div
                className='space-y-2 mt-2'>
                <h1
                  className='text-xl font-bold'>Username</h1>
                <input
                  className='rounded-lg bg-gray-400 py-2 px-9'
                  placeholder='Enter your username'
                  id='email'
                  type='email'
                  name='email'
                  onChange={handleInput} />
              </div>
              <div
                className='space-y-2 mt-2'>
                <h1
                  className='text-xl font-bold'>Password</h1>
                <input
                  className='rounded-lg bg-gray-400 py-2 px-9'
                  placeholder='Enter your password'
                  id='password'
                  type='password'
                  name='password'
                  onChange={handleInput} />
              </div>
              <div
                className='space-x-2 mt-2 flex'>
               <label
                className=' flex gap-3'>
                <input
                type='checkbox'
                checked={gender==="male"}
                onChange={()=>selectgender("male")}
                className='w-5 h-5 bg-red-400 '
                id='male'
                value="male"
                />
                <span>Male</span>
               </label>
               <label
               className=' flex gap-3'>
                <input
                type='checkbox'
                className='h-5 w-5 text-red-500 accent-red-500'
                id='female'
                 checked={gender==="female"}
                onChange={()=>selectgender("female")}
                value="female"
                />
                <span>Female</span>
               </label>
               
              </div>
              <div>
                <input
                type='file'
                name='profile_image'
                />
              </div>

              <div
                className='flex justify-center items-center'>
                <button
                className='text-white bg-black py-2 px-3 rounded-lg mt-2'
                type='submit'>Submit</button>
              </div>
            </form>

            <div
              className='flex gap-1'>
              <p
                className='text-white '>you have an account?</p>
              <div>
                <a
                  className='text-blue'
                  href='/'>Login</a>
                <div
                  className='h-0.5 w-full bg-black'></div>
              </div>
            </div>
            <div
              className='flex gap-1'>
              <p
                className='text-white '>Forget your password?</p>
              <div>
                <a
                  className='text-blue'
                  href='/'>Click Me</a>
                <div
                  className='h-0.5 w-full bg-black'></div>
              </div>
            </div>


          </div>


        </div>
      </div>
    
  )
}

export default Registration