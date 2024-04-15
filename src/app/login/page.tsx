'use client'
import axios from 'axios'
import React, {useState} from 'react'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const res = await axios.post('/api/users/login', {email, password})
        console.log(res)
        const data = await res.data
        localStorage.setItem('userId', data.user.id)
    }
  return (
    <div>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="email">Email</label>
            <input className="form-control text-black" 
            onChange={(e) => setEmail(e.target.value)}
            type="email" id="email" name="email" />
            </div>
            <div>
            <label htmlFor="password">Password</label>
            <input className="form-control text-black" 
            onChange={(e) => setPassword(e.target.value)}
            type="password" id="password" name="password" />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login