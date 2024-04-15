"use client"
import { get } from 'http';
import { NextResponse } from 'next/server';
import { useState, useEffect } from 'react'
import { Post } from '../interfaces/post';
import PostComponent from '../components/Post';


const Feed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const res = await fetch('/api/users/feed')
            const data = await res.json()
            console.log(data.data)
            setPosts(data.data)
        }
        getPosts()
    }, [])

  return (
    <div>
        <h1>Feed Page</h1>
        <ul className='flex flex-col gap-2 m-2 '>
            {
                posts.map((post: Post) => {
                    return <li key={post.id}>
                       <PostComponent post = {post}/>
                    </li>
                })
            }   
        </ul>
    </div>
  )
}
export default Feed