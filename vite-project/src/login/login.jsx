
import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { ToastContainer,toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'
import { useAuth_data } from '../context/Authcontext'


const Login = () => {
    const[loading,setloading]=useState(false)
    const[userInput,setuserInput]=useState({});
    const navigate=useNavigate();
    const{setLogin_user}=useAuth_data();
    
    const handleInput=(e)=>{
          setuserInput({...userInput,[e.target.id]:e.target.value})
          console.log(userInput)
          console.log("Abdullah Akhter")
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
    
        
            setloading(true)
            try {
                const login=await axios.post('/api/auth/login',userInput);
                const data=login.data;
                console.log(`response ${data}`)
                if(data.success===false){
                    setloading(false)
                    console.log(data.message)
                    toast.error(data.message)
                    return 
                    
                }
               
                toast.success("you have been successfullly login");
                
                localStorage.setItem('chatapp',JSON.stringify(data.message))
               
               
                setLogin_user(data)
                
                setloading(false);
                navigate('/')


                
            } catch (error) {
                setloading(false)
                console.log(`error happened ${error}`)
            }

    }
   


    return (
        <div
            className='flex flex-col items-center justify-center mix-w-full mx-auto '>
            <div
                className='bg-gray-400/0 w-full   backdrop-filter backdrop-blur-lg rounded-lg  bg-clip-padding shadow-lg p-6'>
                <h1
                    className='text-3xl font-bold text-white'>Login <span
                        className='text-gray-950'>Chatters</span></h1>
                <form
                onSubmit={handleSubmit}>
                    <div
                        className='space-y-2 mt-2'>
                        <h1
                            className='text-xl font-bold '>Email</h1>
                        <input
                            className='py-2 px-9 rounded-lg bg-white'
                            id='email'
                            type='email'
                            placeholder='Enter your email'
                            onChange={handleInput}
                             />
                    </div>
                    <div
                        className='space-y-2 mt-2'>
                        <h1
                            className='text-xl font-bold'>Password</h1>
                        <input
                            className='py-2 px-9 rounded-lg bg-white'
                            id='password'
                            type='password'
                            placeholder='Enter your password'
                            onChange={handleInput}
                            />
                    </div>
                    <div
                        className='flex justify-center items-center mt-3'>
                        <button
                            className='text-white text-sm  py-2 px-2 rounded-lg bg-black'
                            type='submit'
                            >{loading?'loading':"Login"}</button>
                    </div>
                    <div
                        className='flex gap-1'>
                        <p
                            className='text-gray-400 text-sm'>
                            Do not have any account ?</p>
                        <div
                        >
                            <a
                                href='/registration'
                                className='text-black '
                            >Register Now!</a>
                            <div
                                className='h-0.5 w-full bg-black'></div>
                        </div>

                    </div>
                    <div
                        className='flex gap-1'>
                        <p
                            className='text-gray-400 text-sm'>
                            Forget passowrd ?</p>
                        <div
                        >
                            <a
                                href='#'
                                className='text-black '>Click Me!</a>
                            <div
                                className='h-0.5 w-full bg-black '></div>
                        </div>

                    </div>
                


                </form>
            </div>

        </div>
    )
}

export default Login