'use client'
import React, { useMemo, useState, useEffect } from 'react'
import {io} from 'socket.io-client'

const Messages = () => {

    const [message, setMessage] = useState('')
    const [room, setRoom] = useState('')
    const [messages, setMessages] = useState<string[]>([])
    const [roomName, setRoomName] = useState('')
    const [socketId, setSocketId] = useState('')

    const socket = useMemo(() => io('http://localhost:4000'), [])

    useEffect(() => {
        socket.on('connect', () => {
          console.log('Connected to server')
    
            setSocketId(socket.id || 'No Socket ID')
    
          socket.on('welcome', (msg) => {
            console.log('message: ' + msg)
            })
          })
    
        socket.on('receive-message', (msg) => {
          console.log('Message: ' + msg)
          setMessages((messages) => [...messages, msg])
          console.log(messages)
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
    
        socket.emit('message', {message, room})
    
        setMessage('')
      }
    
      const joinRoomHandler = (e: any) => {
        e.preventDefault()
    
        socket.emit('join-room', {roomName})
    
        setRoomName('')
      }

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
        <h1>Messages</h1>
        <div>{socketId}</div>
        <form 
            className='flex flex-col items-center justify-center gap-4 '
            onSubmit={submitHandler}>

            <input 
                className='border border-gray-400 rounded-md p-2 w-4/4 text-center focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                type="text" value={message} placeholder='Message'
                onChange={(e) => setMessage(e.target.value)} />
            <input 
                className='border border-gray-400 rounded-md p-2 w-4/4 text-center focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                type="text" value={room}  placeholder='Room'
                onChange={(e) => setRoom(e.target.value)} />
            <button 
                className='bg-blue-500 text-white p-2 rounded-md w-4/4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                type="submit">Send</button>
        </form>

        <form 
            className='flex flex-col items-center justify-center gap-4 '
            onSubmit={joinRoomHandler}>
            <input 
                className='border border-gray-400 rounded-md p-2 w-4/4 text-center focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                type="text" value={roomName} placeholder='Room Name'
                onChange={(e) => setRoomName(e.target.value)} />
            <button 
                className='bg-blue-500 text-white p-2 rounded-md w-4/4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                type="submit">Join Room</button>
        </form>

        <div className='flex flex-col items-center justify-center gap-4'>
            <h3>Messages:- </h3>
            {messages.map((msg, index) => (
                <div key={index}>{msg}</div>
            ))}
        </div>
    </div>
  )
}

export default Messages