"use client"
import axios from 'axios'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SignUp = () => {
    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [currentCompany, setCurrentCompany] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const res = await axios.post('/api/users/signup', 
            {name: name, email: email, password: password, currentCompany: currentCompany})
        console.log(res)

        if(res.status === 200){
            console.log("Signup successful")
            //redirect to login page
            router.push('/login')
        }

    }
  return (
    <div className='bg-blue-300 flex flex-col h-screen justify-center items-center gap-3'>
        <h1 className=' text-3xl font-extrabold text-center'
        >Sign Up Page</h1>
        <p>
          Already have an account ? 
          <Link className='text-blue-500 hover:underline font-medium'
          href='/login'> Login</Link></p>
        <form 
            className='flex flex-col gap-2 items-center w-3/6 bg-white p-5 rounded-md shadow-md border border-gray-200 '
            onSubmit={handleSubmit}>
            <div>
            <label 
                className='font-medium '
                htmlFor="name">Name</label>
            <input className="form-control text-black bg-slate-300 p-1 m-2 rounded-md focus:bg-slate-200" 
            onChange={(e) => setName(e.target.value)}
            type="text" id="name" name="name" />
            </div>

            <div>
            <label 
                className='font-medium '
                htmlFor="email">Email</label>
            <input 
                className="form-control text-black bg-slate-300 p-1 m-2 rounded-md focus:bg-slate-200" 
                onChange={(e) => setEmail(e.target.value)}
                type="email" id="email" name="email" />
            </div>

            <div>
            <label
                className='font-medium'
                htmlFor="currentCompany">Current Company Working for</label>
            <input
                className="form-control text-black bg-slate-300 p-1 m-2 rounded-md focus:bg-slate-200"
                onChange={(e) => setCurrentCompany(e.target.value)}
                type="text" id="currentCompany" name="currentCompany" />
            </div>
            
            <div>
            <label
                className='font-medium'
                htmlFor="password">Password</label>
            <input
                className="form-control text-black bg-slate-300 p-1 m-2 rounded-md focus:bg-slate-200"
                onChange={(e) => setPassword(e.target.value)}
                type="password" id="password" name="password" />
            </div>

            <button 
                className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-1/2 font-medium'
                type="submit">Sign Up
            </button>
        </form>
    </div>
  )
}

export default SignUp