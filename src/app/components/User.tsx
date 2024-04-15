'use client'
import axios from 'axios'
import React, {useEffect, useState} from 'react'

const User =  ({userId}:{userId: Number}) => {
    const [user, setUser] = useState({
        id: '',
        email: '',
        name: ''
    })
    
    useEffect(
        () => {
        const getData = async () => {
            const res = await axios.post('/api/users/getUser',{userId})
            const data = await res.data
            console.log(data)
            setUser(data.user)
        }
        getData()
    }, [userId])

  return (
    <div className='border border-white p-2'>
        {
            user.id && 
            <div>
                <p>{user.id}</p>
                <p>{user.email}</p>
                <p>{user.name}</p>
            </div>
        }
    </div>
  )
}

export default User