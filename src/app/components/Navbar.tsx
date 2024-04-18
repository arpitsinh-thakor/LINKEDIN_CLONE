import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav>
        <div className="flex justify-center items-center p-4 gap-6 bg-sky-300">
          <Link href="/feed">Feed</Link>
          <Link href="/mynetwork">My Network</Link>
          <Link href='/messages'>Messages</Link>
          <Link href="/jobs">Jobs</Link>
          <Link href="/createPost">Create Post</Link>
          <Link href="/login">Login</Link>
          <Link href="/signup">signup</Link>
          <Link href="/profile">Profile</Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar