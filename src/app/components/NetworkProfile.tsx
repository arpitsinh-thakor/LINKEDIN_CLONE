import React from 'react'
import { User } from '../interfaces/post'
import axios from 'axios'

const NetworkProfile = ({user}:{user:User}) => {
  const handleFollow = async () => {
    const res = await axios.post('/api/users/follow', {
      userId: localStorage.getItem('userId'),
      followId: user.id
    });
  }
  return (
    <div className='border border-white p-3'>
        <h4>{user.name}</h4>
        <p>{user.email}</p>
        <button 
        onClick={handleFollow}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Follow
        </button>
    </div>
  )
}

export default NetworkProfile