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
        return <h1>No users found</h1>
    }

  return (
    <div>
        <h1>My Network</h1>
        <div>
            <h3>Users</h3>
            <ul>
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