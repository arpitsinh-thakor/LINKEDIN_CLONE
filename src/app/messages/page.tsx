'use client'
import axios from 'axios'
import React, { useMemo, useState, useEffect } from 'react'
import {io} from 'socket.io-client'

const Messages = () => {

    const [message, setMessage] = useState('')
    const [room, setRoom] = useState('')
    const [messages, setMessages] = useState<{
        message: string,
        room: string,
        userName: string,
        roomName: string
    }[]>([])
    const [roomName, setRoomName] = useState('')
    const [socketId, setSocketId] = useState('')
    const [following, setFollowing] = useState<any[]>([])
    const userId = localStorage.getItem('userId') || ''
    const userName = localStorage.getItem('userName') || ''


    const socket = useMemo(() => io('http://localhost:4000'), [])

    useEffect(() => {
        socket.on('connect', () => {
          console.log('Connected to server')
    
            setSocketId(socket.id || 'No Socket ID')
    
          socket.on('welcome', (msg) => {
            console.log('message: ' + msg)
            })
          })
    
        socket.on('receive-message', (res) => {
          console.log('Message: ' + res.message)
          setMessages((messages) => [...messages, res])
          console.log(res)
        })
    
        socket.on('disconnect', () => {
          console.log('Disconnected from server')
        })
    
        
        return () => {
          socket.disconnect()
          setSocketId('')
        }
      }, [])

      const submitHandler = (e: any) => {
        e.preventDefault()
    
        socket.emit('message', {message, room, userName, roomName})
    
        setMessage('')
      }
    
      const joinRoomHandler = (e: any) => {
        e.preventDefault()
    
        socket.emit('join-room', {roomName})
    
        setRoomName('')
      }

      const getFollowing = async () => {
        try{
            const res = axios.post('http://localhost:3000/api/users/getFollowing', {
                userId: localStorage.getItem('userId')
            })

            const data = (await res).data
            const following = data.following.following
            setFollowing(following)
            setRoomName(userName)
            setRoom(userName)
            
            console.log(following)
        }
        catch(err){
          console.log(err);
        }
      }

      useEffect(() => {
        getFollowing()
      },[])

  return (
    <div className = 'grid grid-cols-4'>
        <div className='col-span-1 h-screen flex flex-col items-center justify-center gap-3 bg-yellow-200'>
            <h2 
              className='font-bold text-2xl text-center'
              >All Followings :- </h2>
            <div className='flex flex-col gap-2'>
                {
                  following && following.map(({following}) => (
                    <button 
                      onClick={() => {
                          setRoomName(following.name)
                          setRoom(following.name)
                          }}
                      className='bg-blue-400 text-white  font-semibold p-2 rounded-md w-4/4 focus:outline-none focus:ring-2 focus:bg-blue-600 focus:border-transparent hover:bg-blue-600'
                      key={following.id}>
                      {following.name}
                    </button>
                  ))
                }
            </div>
            <div className='flex gap-2'>
                <button 
                    className='bg-red-500 text-white p-2 rounded-md w-4/4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-bold'
                    onClick={() => {
                        socket.disconnect()
                        setSocketId('')
                    }}>Disconnect</button>

                  <button 
                    className='bg-green-500 text-white p-2 rounded-md w-4/4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-bold'
                    onClick={() => {
                        socket.connect()
                    }}>Connect</button>
            </div>
        </div>
        <div className='col-span-3 flex flex-col items-center justify-center bg-yellow-50 gap-4'>
            <h1 
              className='font-bold text-2xl text-center bg-blue-500 text-white p-2 px-[10%] rounded-md w-4/4'
            >Messages</h1>
            <div 
              className='bg-blue-200 p-2 rounded-md w-4/4 text-center italic font-bold'
            >{socketId}</div>
            <form 
                className='flex flex-col items-center justify-center gap-4 '
                onSubmit={submitHandler}>

                <input 
                    className='border border-gray-400 rounded-md font-bold p-2 w-4/4 text-center focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                    type="text" value={message} placeholder='Message'
                    onChange={(e) => setMessage(e.target.value)} />
                <input 
                    className='border border-gray-400 rounded-md font-bold p-2 w-4/4 text-center focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                    type="text" value={room}  placeholder='Room'
                    onChange={(e) => setRoom(e.target.value)} />
                <button 
                    className='bg-blue-500 text-white font-bold p-2 rounded-md w-4/4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent hover:bg-blue-600'
                    type="submit">Send</button>
            </form>

            <form 
                className='flex flex-col items-center justify-center gap-4 '
                onSubmit={joinRoomHandler}>
                <input 
                    className='border border-gray-400 rounded-md p-2 w-4/4 font-bold text-center focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                    type="text" value={roomName} placeholder='Room Name'
                    onChange={(e) => setRoomName(e.target.value)} />
                <button 
                    className='bg-blue-500 text-white  font-bold  p-2 rounded-md w-4/4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent hover:bg-blue-600'
                    type="submit">Join Room</button>
            </form>



            <div className='flex flex-col items-center justify-center gap-4'>
                <h3 
                  className= 'font-bold text-2xl text-center  p-2 rounded-md w-4/4'
                  >Messages:- </h3>
                {
                  messages.length == 0 ? <div className='bg-red-400 font-bold rounded-sm p-1 m-1'>No messages!! Start Chatting!!</div> : 
                  messages.map((msg, index) => (
                      <div 
                        className='flex bg-blue-200 p-2 rounded-md w-4/4 gap-2'
                        key={index}>
                          <p 
                            className='font-bold text-md '
                            >{`From: ${msg.userName} -> `}</p>
                          <p
                            className='text-md underline'
                            >{msg.message}</p>
                          <p
                            className='text-md font-light'
                            >Room: {msg.roomName}</p>
                        </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Messages