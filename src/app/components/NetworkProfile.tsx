import React from 'react'
import { User } from '../interfaces/post'
import axios from 'axios'

const NetworkProfile = ({user}:{user:User}) => {
  const handleFollow = async () => {
    const res = await axios.post('/api/users/follow', {
      userId: localStorage.getItem('userId'),
      followerId: user.id
    });
    console.log(res.data);
  }
  return (
    <div 
      className='border border-white p-3  bg-slate-700  flex  items-center gap-2 rounded-md'
      >
        <h4
          className='text-white font-bold tracking-wider text-lg bg-blue-400 p-1 rounded'
          >{user.name}</h4>
        <button 
        onClick={handleFollow}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Follow
        </button>
    </div>
  )
}

export default NetworkProfile