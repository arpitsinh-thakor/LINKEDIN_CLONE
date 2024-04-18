'use client'
import axios from 'axios'
import React, {use, useState, useEffect} from 'react'
import { User } from '../interfaces/post'
import NetworkProfile from '../components/NetworkProfile'


const MyNetwork = () => {

    const [users, setUsers] = useState([])

    const getData = async () => {
        const userId = localStorage.getItem('userId')
        const res = await axios.get('/api/users/allUsers')
        const data = await res.data
        const users = data.users      
        console.log(users)
        setUsers(users) 
    }
    useEffect(() => {
        getData()
    }, [])

    if(users.length === 0){
        return <h1
                 className='text-2xl text-center text-red-500 font-bold tracking-wider'
                 >No users found</h1>
    }

  return (
    <div className='bg-slate-700 flex flex-col items-center'>
        <h1
            className='text-2xl text-center text-white font-bold tracking-wider p-4 bg-slate-800 w-full'
            >My Network</h1>
        <div
            className='bg-slate-800 w-full p-4 flex flex-col items-center gap-4'
            >
            <h3
                className='text-xl text-white font-bold tracking-wider p-4 bg-slate-700 w-1/4 text-center rounded-md'
                >Users</h3>
            <ul
                className='w-2/4 flex flex-col items-center gap-4 bg-slate-800 p-4 rounded-md'
                >
                {users.map((user: User) => (
                    <li key={user.id}>
                        <NetworkProfile user={user}/>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default MyNetwork