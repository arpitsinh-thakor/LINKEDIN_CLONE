'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, {useState} from 'react'

const Login = () => {

    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const res = await axios.post('/api/users/login', {email, password})
        console.log(res)
        const data = await res.data
        localStorage.setItem('userId', data.user.id)
        localStorage.setItem('userName', data.user.name)

        if(res.status === 200){
            console.log("Login successful")
            //redirect to feed page
            router.push('/feed')
        }

    }
  return (
    <div className='bg-blue-300 flex flex-col h-screen justify-center items-center gap-3'>
        <h1 className=' text-3xl font-extrabold text-center'
        >Login </h1>
        <p>
          Don not have account ? 
          <Link className='text-blue-500 hover:underline font-medium'
          href='/signup'> Sign Up</Link></p>

        <form 
          className='flex flex-col gap-2 items-center w-1/3 bg-white p-5 rounded-md shadow-md border border-gray-200 justify'
          onSubmit={handleSubmit} >
            <div>
            <label className = 'font-medium '
            htmlFor="email">Email</label>
            <input className="form-control text-black bg-slate-300 p-1 m-2 rounded-md focus:bg-slate-200" 
            onChange={(e) => setEmail(e.target.value)}
            type="email" id="email" name="email" />
            </div>
            <div>
            <label className='font-medium'
            htmlFor="password">Password</label>
            <input 
            className="form-control text-black bg-slate-300 p-1 m-2 rounded-md focus:bg-slate-200" 
            onChange={(e) => setPassword(e.target.value)}
            type="password" id="password" name="password" />
            </div>
            <button 
            className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-1/2 font-medium'
            type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login