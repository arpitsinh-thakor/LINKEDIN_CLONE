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
    <div className='border border-blue-50 p-2'>
        <h3>{title}</h3>
        <p>{content}</p>
        <p>{author.name}</p>
        <p>{published ? "yes published": "yet to be published"}</p>

        <label htmlFor="comment">Comment</label>
        <textarea 
        className='form-control text-black'
        onChange={(e) => setComment(e.target.value)}
        name="comment" id="comment" rows={1} cols={20} ></textarea>
        <button className='bg-blue-500 text-white' 
        onClick={handleComment}>Comment</button>

        <h4>Comments</h4>
        <ul>
            {comments && comments.map((comment) => (
                <li key={comment.id}>`{comment.text} by {comment.author.name}`</li>
            ))}
        </ul>
       
    </div>
  )
}


export default PostComponent