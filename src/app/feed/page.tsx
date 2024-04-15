"use client"
import { get } from 'http';
import { NextResponse } from 'next/server';
import { useState, useEffect } from 'react'


interface Post {
    id: number;
    title: string;
    email: string;
    content: string;
    published: boolean
    authorId: number
    author:{
        name: string
    }

}
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
        <ul>
            {
                posts.map((post: Post) => {
                    return <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p>{post.author.name}</p>
                        <p>{post.published ? "yes published": "yet to be published"}</p>
                    </li>
                })
            }   
        </ul>
    </div>
  )
}
export default Feed