'use client'
import axios from 'axios'
import React, {useEffect, useState} from 'react'

const User =  ({userId, userName}:{userId: Number, userName: String}) => {

  return (
    <div 
        className='flex items-center justify-center w-4/12 border border-white p-2 rounded-md bg-gray-800 text-white'
        >
        {
            userId && 
            <div>
                <p 
                    className='font-bold text-md text-center'
                    >{userName}</p>
            </div>
        }
    </div>
  )
}

export default User