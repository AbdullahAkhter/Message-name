import React, { useEffect, useRef } from 'react'
import useConversation from '../../context/conversation'
import { useAuth_data } from '../../context/Authcontext'
import { TiMessages } from "react-icons/ti"
import { IoArrowBackSharp } from "react-icons/io5"
import image from "../../assets/profile_image.png"
import axios from 'axios'
import { useState } from 'react'
import { IoSend } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { useSocketContext } from '../../context/socketcontext'

const messageContainer = ({onBackUser}) => {
  const { selectedconversation, setselectedconversation, setmesage, messages } = useConversation()
  const { Login_user } = useAuth_data();
  const [loading, setloading] = useState(false)
  const lastMessageRef = useRef()
  const [sending, setsending] = useState(false)
  const [userInput, setuserinput] = useState('');
  const [socket, onlineuser] = useSocketContext();
  console.log("Login_user is is ",Login_user)
 
  useEffect(() => {
    console.log("socket is ", socket)
    socket?.on('new_Message', (newMessage) => {
      if (
        selectedconversation?._id === newMessage.conversationID
      ) {
        setmesage([...messages, newMessage])
        console.log("new message  are  ", newMessage)
      }

    })

    return () => socket?.off('new_Message')
  }, [socket, setmesage, messages])


  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }, [messages])
  useEffect(() => {
    const getMessages = async () => {
      setloading(false)
      try {
        const get = await axios.get(`/api/message/${selectedconversation._id}`);
        const data = get.data
        if (data.success === false) {
          setloading(false);
          console.log(data.message)
        }
        setloading(false);
        setmesage(data.message);


      } catch (error) {
        setloading(false)
        console.log(error)
      }

    }
    if (selectedconversation?._id) getMessages();

  }, [selectedconversation?._id])
  console.log(`messages sent to`, messages)
  console.log("login_user is ", Login_user)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setsending(true)
    try {
      const send = await axios.post(`/api/message/send/${selectedconversation._id}`, { message: userInput })
      const data = send.data;
      if (data.success === false) {
        setsending(false);
        console.log(data.message)
      }
      setsending(false);
      setmesage([...messages, data.message])
      console.log("response is ", data)

    } catch (error) {
      setsending(false);
      console.log(error);

    }
    setuserinput('')
  }
  const handleDelete=(index)=>{
  setmesage((prevMessages) => {
         console.log("prevMessages:", prevMessages);
        const newMessages = [...prevMessages];
        newMessages.splice(index, 1);
        return newMessages;
    });
    
  }

  return (
    <div
      className='min-w-[550px] h-full flex flex-col py-2'>
      {selectedconversation === null ? (
        <div
          className='w-full h-full flex justify-center items-center'>
          <div
            className='px-4 text-center text-2xl text-gray-950 font-semibold flex flex-col
           text-center w-full'>
            <p className='text-2xl'>Welcome!👋 <span>{Login_user.fullname}😊</span></p>
            <p className='text-sm'>Select a chat to start messaging</p>
            <TiMessages
              className='text-6xl self-center' />
          </div>
        </div>
      ) : (<>
        <div className='flex justify-between gap-1 bg-sky-600 md:px-2 rounded-lg h-10 md:h-12 w-full'>
          <div className='flex gap-2 md:justify-between items-center w-full'>
            <div
              className='md:hidden ml-1 self-center'>
              <button
                onClick={() => { onBackUser()}}
                className='rounded-full bg-white px-2 py-1 self-center'>
                <IoArrowBackSharp
                  size={25} />

              </button>
            </div>

            <div
              className='flex mr-2 gap-2'>
              <div
                className='self-center'>
                <img
                  className='rounded-full w-6 h-6 md:w-10 md:h-10 cursor-pointer'
                  src={image} />
              </div>
              <span
                className='text-gray-950 self-center text-sm md:text-xl font-bold'>{selectedconversation.fullname}</span>
            </div>
          </div>

        </div>
        <div
          className='flex-1 overflow-auto'>
          {loading && (
            <div
              className='flex flex-col justify-center h-full w-full items-center gap-4 bg-transparent '>
              <div
                className='loading loading-spinner'>

              </div>

            </div>
          )}
          {!loading && messages?.length === 0 && (
            <p
              className='text-center text-white '>send a message to start conversation</p>
          )}
          {!loading && messages?.length > 0 && messages?.map((element, index) => ((
            <div
              ref={lastMessageRef}
              key={index}
            >
              <div
                className={`chat ${element.senderID === Login_user._id ? 'chat-end' : 'chat-start'}`}>

                <div
                  className={`chat-bubble ${element.senderID?.toString() === Login_user?._id?.toString() ? 'bg-blue-500' : 'bg-black'} text-white`}
                  onClick={()=>handleDelete(index)}>
                  {element.message}
                </div>
                <div>{element.createdAt? element.createdAt:'not reated'}</div>
              </div>
            </div>
          )))}


        </div>
        <form
          className='rounded-full text-black'
          onSubmit={handleSubmit}>
          <div
            className='w-full rounded-full flex items-center bg-white'>
            <input

              className='w-full bg-transparent outline-0 px-4 rounded-full'
              required
              id='message'
              onChange={(e) => setuserinput(e.target.value)}
              value={userInput} />
            <button
              type='submit'>
              {sending ? <div></div> : <IoSend
                size={25}
                className='text-sky-600' />}
            </button>

          </div>

        </form>



      </>)}
    </div>
  )
}
export default messageContainer
