import React, { use, useEffect, useState } from 'react'
import { Post } from '../interfaces/post'
import axios from 'axios'


const  PostComponent = ({post}:{post: Post}) => {
    const {id, title, content, author, published, comments} = post
    const [comment, setComment] = useState('')

    console.log(post)

    const  handleComment = async ()  => {
        const authorId = Number(localStorage.getItem('userId'))
        const res = await axios.post('/api/users/comment', {comment, authorId, postId: post.id})
    }

  return (
    <div className='border border-blue-50 p-2 bg-zinc-800 rounded-md'>
        <p
            className='text-white text-lg font-semibold'
            >{author.name}</p>
        <h3
            className='text-2xl text-white uppercase font-bold'
            >{title}</h3>
        <p
            className='text-white italic text-lg font-semibold'
            >{content}</p>
        <p
            className='text-white text-sm  '
            >{published ? "yes published": "yet to be published"}</p>

        <div className='flex gap-2 my-3 items-baseline'>
        <label 
            className='text-white font-semibold'
            htmlFor="comment">Comment</label>
        <textarea 
            className='border border-blue-50 p-1 bg-zinc-800 rounded-md text-white'
            onChange={(e) => setComment(e.target.value)}
            name="comment" id="comment" rows={1} cols={20} placeholder='Add a comment'></textarea>
        <button 
            className='bg-blue-500 text-white p-1 rounded-md hover:bg-blue-700'
            onClick={handleComment}>Comment</button>
        </div>

        <h4
            className='text-white text-lg font-semibold '
            >Comments:-</h4>
        <ul className='flex flex-col gap-2 m-1 mx-3'>
            {comments && comments.map((comment) => (
                <div 
                    className='flex flex-col border border-blue-50 p-2 bg-zinc-700 rounded-md'
                    key={comment.id}>
                    <div
                        className='text-white font-semibold'
                        >{comment.author.name}</div>
                    <div
                        className='text-white italic font-semibold'
                        >{comment.text}</div>
                </div>
            ))}
        </ul>
       
    </div>
  )
}


export default PostComponent