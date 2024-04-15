"use client"
import axios from 'axios'
import React, { useState } from 'react'

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const res = await axios.post('/api/users/signup', 
            {name: name, email: email, password: password})
        console.log(res)

    }
  return (
    <div>
        <h1>Sign Up Page</h1>
        <form onSubmit={handleSubmit}>
            <div>

            <label htmlFor="name">Name</label>
            <input className="form-control text-black" 
            onChange={(e) => setName(e.target.value)}
            type="text" id="name" name="name" />
            </div>
            <div>

            <label htmlFor="email">Email</label>
            <input className="form-control text-black" 
            onChange={(e) => setEmail(e.target.value)}
            type="email" id="email" name="email" />
            </div>
            
            <label htmlFor="password">Password</label>
            <input className="form-control text-black"
            onChange={(e) => setPassword(e.target.value)}
            type="password" id="password" name="password" />
            <div>
            </div>
            <button type="submit">Sign Up</button>
        </form>
    </div>
  )
}

export default SignUp