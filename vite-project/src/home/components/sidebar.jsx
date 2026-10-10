
import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa"
import image from "../../assets/profile_image.png"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import profile from "../../assets/profile_image.png"
import { IoArrowBackSharp } from "react-icons/io5"
import { BiLogOut } from "react-icons/bi"
import { useNavigate } from 'react-router-dom'
import { useAuth_data } from '../../context/Authcontext'
import useConversation from '../../context/conversation'
import { useSocketContext } from '../../context/socketcontext'


const Sidebar = ({onSelectUser}) => {
    const [searchInput, setsearchInput] = useState('')
    const [loading, setloading] = useState(false)
    const [searchUser, setsearchUser] = useState([])
    const [Chatuser, setchatuser] = useState([])
    const [selectedUserId, setselecteduserid] = useState(null)
    const { setchatter } = useAuth_data();
    const { messages, selectedconversation, setselectedconversation, setmesage } = useConversation();
    const [socket, onlineuser] = useSocketContext();
    const [messageNotification, setnotification] = useState('');
    const{Login_user}=useAuth_data();
    const nowOnline = Chatuser.map((user) => (user._id))
    const isOnline = nowOnline.map((userid) => {
        return onlineuser?.includes(userid)
    })
    useEffect(() => {
        socket?.on('new_Message', (newMessage) => {
            console.log("new  message new message new_message",newMessage)
            setnotification(newMessage)
        })
        return () => socket?.off('new_Message')
    }, [socket, setmesage, messages])
    const navigate = useNavigate();

    const handlesearchSubmit = async (e) => {
        e.preventDefault();
        setloading(true)
        try {
            const search = await axios.get(`/api/searching/user?search=${searchInput}`)
            const data = search.data
            console.log("data is is", data)
            if (data.success === false) {
                setloading(false)
                console.log(data.message)
            }
            setloading(false)
            if (data.length === 0) {
                toast.info("user is not found")
            } else {
                setsearchUser(data)

            }

        } catch (error) {
            setloading(false)
            console.log(error)
        }

    }
    useEffect(() => {
        const chatuserhandler = async () => {
            setloading(true)
            try {
                const chatters = await axios.get('/api/searching/current_chatters')
                const data = chatters.data
                if (data.success === false) {
                    setloading(false)
                    console.log(data.message)
                }
                setloading(false)
                setchatuser(data)



            } catch (error) {
                setloading(false)
                console.log(error)
            }
        }
        chatuserhandler();
    }, [])
    const handleClick = (user) => {
        setselecteduserid(user._id)
        setselectedconversation(user)
        onSelectUser(user)


        setchatter(user)

        setnotification('')

    }
    const handlesearchback = () => {
        setsearchUser([]

        )
        setsearchInput("")
    }
    const handleLogout = async () => {
        const log_out = await axios.post('/api/auth/logout');
        const data = log_out.data;
        if (data.success === false) {
            console.log("error is ", data.messsage)
        }
        else {
            toast.success("logout successfully occured")
            navigate('/login')

        }
    }
    console.log(Chatuser)
    console.log(searchUser)

    return (
        <div
            className='h-full'
        >
            <div
                className='bg-white rounded-2xl mt-2 ml-2 '>
                <form
                    className='flex justify-between pl-2'
                    onSubmit={handlesearchSubmit}
                >
                    <input
                        placeholder='search user'
                        className='outline-0'
                        onChange={(e) => { setsearchInput(e.target.value) }}
                        value={searchInput}
                    />
                    <button
                        className='bg-blue-600 rounded-full w-10 h-10 flex justify-center items-center'>
                        <FaSearch
                            className='text-white' />
                    </button>


                </form>

            </div>
            <div
                className='h-0.5 w-full bg-black/20 mb-4 mt-4'></div>

            {searchUser?.length > 0 ? (<>
                <div
                    className='min-h-[70%] max-h-[80%] overflow-y-auto scrollbar'>
                    <div
                        className='w-auto'>
                        {searchUser.map((user, index) => (
                            <div
                                key={index}>
                                <div
                                    className={`flex gap-6 items-center rounded-lg p-2 py-1 cursor-pointer
                            ${selectedUserId === user?._id ? 'bg-blue-400' : ''}`}
                                    onClick={() => handleClick(user)}>
                                    <div
                                        className={`avatar ${isOnline[index] ? 'online' : ''}`}>
                                        <div
                                            className='w-12 h-12 rounded-full'>
                                            <img
                                                src={profile}
                                                className='rounded-full' />
                                        </div>
                                    </div>
                                    <div
                                        className='flex flex-col flex-1'
                                    >
                                        <p className='font-bold text-gray-950'>{user.fullname}</p>
                                    </div>
                                    <div>
                                        { messageNotification.receiverID===Login_user._id && messageNotification.senderID===user._id?
                                        <div
                                            className='rounded-full bg-green-700 px-[4px] '>+1</div>:<></>}
                                    </div>
                                </div>
                                <div className='h-0.5 w-full bg-black/20'></div>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className='mt-auto px-1 py-1 flex'>
                    <button
                        className='bg-white rounded-full px-2 py-1 self-center'
                        onClick={handlesearchback}>
                        <IoArrowBackSharp
                            size={25} />
                    </button>

                </div>
            </>) : (<>
                <div
                    className='min-h-[70%] max-h-[80%] overflow-y-auto scrollbar'>
                    <div
                        className='w-auto'>
                        {Chatuser.length === 0 ? (
                            <>
                                <div
                                    className='flex flex-col items-center font-bold text-xl text-yellow-300'>
                                    <h1>May are you alone</h1>
                                    <h1>Search username for chat</h1>
                                </div>
                            </>
                        ) : (
                            <div
                                className='space-y-5'
                            >
                                {Chatuser.map((user, index) => (
                                    <div
                                        key={index}
                                        className='space-y-1'
                                    >
                                        <div
                                            className={`flex gap-6 items-center rounded-lg p-2 py-1 cursor-pointer
                            ${selectedUserId === user?._id ? 'bg-blue-400' : ''}`}
                                            onClick={() => handleClick(user)}>
                                            <div
                                             className={`avatar ${isOnline[index] ? 'avatar-online' : ''}`}>
                                                <div
                                                    className='w-12 h-12 rounded-full'>
                                                    <img
                                                        src={profile}
                                                        className='rounded-full' />
                                                </div>
                                            </div>
                                            <div
                                                className='flex flex-col flex-1'
                                            >
                                                <p className='font-bold text-gray-950'>{user.fullname}</p>
                                            </div>
                                            <div>
                                                {messageNotification.receiverID=== Login_user._id && messageNotification.senderID === user._id ?
                                                    <div
                                                        className='rounded-full bg-green-700 px-[4px] '>+1</div> : <></>}
                                            </div>


                                        </div>
                                        <div
                                            className='h-0.5 w-full bg-black/20'></div>

                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div
                    className='mt-auto px-1 py-1 flex'>
                    <button
                        className='hover:bg-red-500 w-10 cursor-pointer flex hover:text-white rounded-lg'
                        onClick={handleLogout}>
                        <BiLogOut
                            size={25} />

                    </button>
                    <p
                        className='text-sm px-1'>Logout</p>

                </div>


            </>)

            }

        </div>





    )
}

export default Sidebar