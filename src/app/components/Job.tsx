import React from 'react'
import { JobInterface } from '../jobs/page'

const Job = ({job}:{job: JobInterface}) => {
    const {id, title, description, location, company, salary, user} = job
  return (
    <div 
        className = 'border border-blue-50 p-2 bg-slate-300 rounded-md'
        >
        <h3>
            <span className=' text-blue-500 text-lg font-bold uppercase tracking-wider'
            >{title}</span> 
            <span className='p-2'>for 
            <span
                className='p-2 text-blue-500 text-lg font-bold uppercase tracking-wider'
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
        <p
            className='text-black text-sm font-normal tracking-wider italic'
            ><span className='font-semibold'>Published by: </span>{user.name}</p>
    </div>
  )
}

export default Job