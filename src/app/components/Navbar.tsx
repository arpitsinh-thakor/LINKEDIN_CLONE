import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav>
        <div className="flex justify-center items-center text-white  text-xl p-4 gap-6 bg-zinc-800  font-extrabold tracking-wider">
          <Link 
            className=' hover:text-blue-500 hover:underline active:text-blue-500 active:underline'
            href="/feed">Feed</Link>
          <Link 
            className=' hover:text-blue-500 hover:underline active:text-blue-500 active:underline'
            href="/mynetwork">My Network</Link>
          <Link 
            className=' hover:text-blue-500 hover:underline active:text-blue-500 active:underline'
            href='/messages'>Messages</Link>
          <Link 
            className=' hover:text-blue-500 hover:underline active:text-blue-500 active:underline'
            href="/jobs">Jobs</Link>
          <Link 
            className=' hover:text-blue-500 hover:underline active:text-blue-500 active:underline'
            href="/createPost">Create Post</Link>
          <Link 
            className=' hover:text-blue-500 hover:underline active:text-blue-500 active:underline'
            href="/login">Login</Link>
          <Link 
            className=' hover:text-blue-500 hover:underline active:text-blue-500 active:underline'
            href="/signup">SignUp</Link>
          <Link 
            className=' hover:text-blue-500 hover:underline active:text-blue-500 active:underline'
            href="/profile">Profile</Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar