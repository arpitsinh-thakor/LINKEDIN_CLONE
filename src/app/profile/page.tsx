'use client'
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import User from '../components/User'

const Profile = () => {

    const [user, setUser] = useState({
        id: '',
        email: '',
        name: '',
        posts: [],
        followers: [],
        following: []
    })
    const [posts, setPosts] = useState([])

    const getData = async () => {
        const userId = localStorage.getItem('userId')
        const res = await axios.post('/api/users/profile',{userId})
        const data = await res.data
        const user = data.user
        console.log(user)
        setUser(user)
        setPosts(user.posts)
        
    }

    useEffect(() => {
        getData()
    }, [])

  return (
    <div>
        <h1>Profile</h1>
        <div>
            <h3>User Profile</h3>
            <p>{user?.id}</p>
            <p>{user?.email}</p>
            <p>{user?.name}</p>
            <div>
                <h3>Posts</h3>
                <ul>
                    {posts && posts.map((post: {
                        id: string;
                        title: string;
                        content: string;
                        published: boolean;
                    }) => (
                        <li key={post.id}>
                            <div className='border border-white p-2'>
                                <h4>{post.title}</h4>
                                <p>{post.content}</p>
                                <p>{post.published ? "yes published":"not published"}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <h3>Followers</h3>
            <div>
                {user.followers && user.followers.map((follower: any) => (
                    <User key={follower.id} userId = {follower.id} />
                ))}
            </div>
            <h3>Following</h3>
            <div>
                {user.following && user.following.map((follow: any) => (
                    <User key={follow.id} userId = {follow.id} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Profile