import React from 'react'
import { JobInterface } from '../jobs/page'
import axios from 'axios'

const Job = ({job, showApply, status }:{job: JobInterface, showApply: Boolean, status: String}) => {
    const {id, title, description, location, company, salary, user} = job

    const applyForJob = async () => {
        const userId = Number(localStorage.getItem('userId') || '')
        const jobId = id

        const res = await axios.post('/api/users/apply',
                                    {userId, jobId})
        
        console.log(res)

        if(res.status === 200){
            console.log("Applied for job successfully")
        }
    }
  return (
    <div 
        className = 'border border-blue-50 p-2 bg-slate-300 rounded-md hover:bg-slate-200 m-2 flex flex-col gap-1 items-start'
        >
        <h3>
            <span className=' text-blue-500 text-lg font-bold uppercase tracking-wider'
            >{title}</span> 
            <span className='p-2'>for 
            <span
                className='p-2  text-blue-500 text-lg font-bold uppercase tracking-wider'
                >{company}</span></span></h3>
        <p
            className='text-black text-sm font-normal tracking-wider'
            ><span className='font-semibold'>Description: </span>{description}</p>
        <p
            className='text-black text-sm font-normal tracking-wider'
            ><span className='font-semibold'>Location: </span>{location}</p>
        
        <p
            className='text-black text-sm font-normal tracking-wider italic'
            ><span className='font-semibold'>Expected salary: </span>{salary}</p>
        {
           user &&  <p
            className='text-black text-sm font-normal tracking-wider italic'
            ><span className='font-semibold'>Published by: </span>{user.name}</p>
        }
        {
            showApply && <button    
                onClick={applyForJob}
                className='bg-blue-500 p-2 text-white rounded-md hover:bg-blue-600 font-bold'
                >Apply</button>
        }
        {
            status && <p
                className='flex text-black text-sm font-normal tracking-wider italic items-baseline'
                ><div className='font-semibold'>Status: 
                    </div>{status == 'pending' ? <div className='bg-red-300 rounded-md p-1'>Application Pending</div>: <div className='bg-green-300'> Application <div>{status}</div></div>}
                </p>
        }
        
    </div>
  )
}

export default Job