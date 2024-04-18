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
    <div
      className='bg-blue-300 flex flex-col h-screen justify-center items-center gap-3'
      >
        <h1
          className='text-3xl font-extrabold text-center'
          >Create Post</h1>
          <div className='flex flex-col gap-1 items-center w-1/3 bg-white p-5 rounded-md shadow-md border border-gray-200 justify'>
            <div
              className='flex justify-center items-center'
              >
            <label 
              className='text-black font-bold'
              htmlFor="title">Title</label>
            <input 
              className="form-control text-black bg-slate-300 p-1 m-2 rounded-md focus:bg-slate-200" 
              onChange={(e) => setTitle(e.target.value)}
              type="text" id="title" name="title" />
            </div>
            <div
              className='flex  items-center justify-center'
              >
            <label 
              className='text-black font-bold'
              htmlFor="content">Content</label>
            <textarea 
              className="form-control text-black bg-slate-300 p-1 m-2 rounded-md focus:bg-slate-200" 
              onChange={(e) => setContent(e.target.value)}
              id="content" name="content" />
            </div>
            
            <button 
              className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-1/2 font-medium'
              type="submit" onClick={handleSubmit}>Create Post</button>
            </div>
    </div>
  )
}

export default CreatePost