'use client'
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import User from '../components/User'
import Job from '../components/Job'

const Profile = () => {

    const [user, setUser] = useState({
        id: '',
        email: '',
        name: '',
        currentCompany: '',
        posts: [],
        followers: [],
        following: []
    })
    const [posts, setPosts] = useState([])
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [applications, setApplications] = useState([])

    const getData = async () => {
        const userId = localStorage.getItem('userId')
        const res = await axios.post('/api/users/profile',{userId})
        const data = await res.data
        const user = data.user
        console.log(user)
        setUser(user)
        setPosts(user.posts)
        setFollowers(user.followers)
        setFollowing(user.following)        
        setApplications(user.applications)
    }

    useEffect(() => {
        getData()
    }, [])

  return (
    <div 
        className='flex flex-col items-center justify-center  py-2 bg-blue-600  gap-3 '
        >
        <h1 
            className='font-bold text-2xl text-center'
            >Profile</h1>
        <div
            className='w-[80%] flex flex-col items-center justify-center gap-3 bg-blue-400 p-4 rounded-md'
            >
            <h3
                className='font-bold text-xl text-center'
                >User Profile</h3>
            <div
                className='w-8/12 flex flex-col items-center justify-center gap-3 bg-blue-300 p-4 rounded-md'
                >
            <p
                className='font-bold text-lg text-center'
                >{`User ID -> ${user?.id}`}</p>
            <p
                className='font-bold text-lg text-center'
                >{`User EMAIL -> ${user?.email}`}</p>
            <p
                className='font-bold text-lg text-center'
                >{`User Name -> ${user?.name}`}</p>

            <p
                className='font-bold text-lg text-center'
                >{`User Current Company -> ${user?.currentCompany || 'No Current Company'}`}</p>

            </div>
            <div
                className = 'w-10/12 flex flex-col items-center justify-center gap-3 bg-blue-400 p-4 rounded-md'
                >
                <h3
                    className='font-bold text-xl text-center'
                    >Posts: <span>{posts && posts.length}</span></h3>
                <ul 
                    className = 'w-11/12 flex flex-col items-center justify-center gap-3 bg-blue-300 p-4 rounded-md '
                    >
                    {posts && posts.map((post: {
                        id: string;
                        title: string;
                        content: string;
                        published: boolean;
                    }) => (
                        <li key={post.id}>
                            <div 
                                className = ' flex flex-col items-center justify-center gap-3 bg-blue-200 p-4 rounded-md '
                                >
                                <h4
                                    className='font-bold text-lg text-center text-black'
                                    >{post.title}</h4>
                                <p
                                    className='font-bold text-lg text-center text-black'
                                    >{post.content}</p>
                                <p
                                    className='font-bold text-lg text-center'
                                    >{post.published ? 
                                        <div className = 'text-green-500'
                                            >Yes Published</div>
                                        :
                                        <div
                                            className = 'text-red-500'
                                            >Not Yet Published</div>}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div 
                className = 'w-10/12 flex flex-col items-center justify-center gap-3 bg-blue-400 p-4 rounded-md'
                >
            <h3 className='font-bold text-xl text-center'
                >Followers: <span>{followers && followers.length}</span></h3>
            <div
                className='w-11/12 flex flex-col items-center justify-center gap-3 bg-blue-300 p-4 rounded-md'
                >
                {
                    followers && followers.map((follower: any) => (
                        <User key={follower.follower.id} userId = {follower.follower.id} userName = {follower.follower.name}/>
                    ))
                }
            </div>
            </div>
            <div
                 className = 'w-10/12 flex flex-col items-center justify-center gap-3 bg-blue-400 p-4 rounded-md'
                >
            <h3
                className='font-bold text-xl text-center'
                >Following: <span>{following && following.length}</span></h3>
            <div
                className='w-11/12 flex flex-col items-center justify-center gap-3 bg-blue-300 p-4 rounded-md'
                >
                {user.following && user.following.map((follow: any) => (
                    <User key={follow.following.id} userId = {follow.following.id}  userName={follow.following.name}/>
                ))}
            </div>
            </div>

            <div>
                <h3
                    className='font-bold text-xl text-center m-2'
                    >Applied for JOB: <span>{applications && applications.length}</span></h3>
                <ul className='flex flex-col gap-1'>
                    {
                        applications && applications.map((application: any) => (
                            <Job key={application.job.id} job={application.job} showApply={false} status={application.status}/>
                        ))
                    }
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Profile