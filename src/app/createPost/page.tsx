"use client"
import axios from 'axios'
import React, {useState} from 'react'

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const authorId = Number(localStorage.getItem('userId'))
        const res = await axios.post('/api/users/createPost', {title, content, authorId: authorId})
        console.log(res)

    }

  return (
    <div>
        <h1>Create Post Page</h1>
            <div>
            <label htmlFor="title">Title</label>
            <input className = "form-control text-black"
            onChange={(e) => setTitle(e.target.value)}
            type="text" id="title" name="title" />
            </div>
            <div>
            <label 
            htmlFor="content">Content</label>
            <textarea className = "form-control text-black"
            onChange={(e) => setContent(e.target.value)}
            id="content" name="content" />
            </div>
            
            <button type="submit" onClick={handleSubmit}>Create Post</button>
    </div>
  )
}

export default CreatePost