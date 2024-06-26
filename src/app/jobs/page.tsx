'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Job from '../components/Job';
import { useRouter } from 'next/navigation';

export interface JobInterface {
    id: string;
    title: string;
    description: string;
    location: string;
    company: string;
    salary: string;
    user: {
        id: string;
        name: string;
    }
}
const Jobs = () => {
    const router = useRouter()
    const [jobs, setJobs] = useState<JobInterface[]>([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [company, setCompany] = useState('')
    const [salary, setSalary] = useState('')
    const userId = localStorage.getItem('userId') || ''
    const [trigger, setTrigger] = useState(false)
    const [createdJobs, setCreatedJobs] = useState<JobInterface[]>([])
    const [selectedJob, setSelectedJob] = useState<JobInterface | null>(null)

    const handleCreateJob = async (e: any) => {
        e.preventDefault()

        const res = await axios.post('/api/users/createJob',
        {userId, title, description, company, location, salary})

        console.log(res)

        if(res.status === 200){
            console.log("Job created successfully")

            setTitle('')
            setDescription('')
            setLocation('')
            setCompany('')
            setSalary('')

            setTrigger(!trigger)
        }
    }

    const getAllJobs = async () => {
        const res = await axios.get('/api/users/getAllJobs')
        const data = await res.data
        console.log(data)
        setJobs(data.jobs)
    }

    const getCreatedJobs = async () => {
        const res = await axios.post('/api/users/getCreatedJobs', {userId})
        const data = await res.data
        console.log(data)
        setCreatedJobs(data.createdJobs)
    }

    const mangeJobHandler = async (e: any) => {
        
    }   

    useEffect(() => {
        getAllJobs()
        getCreatedJobs()
    }, [trigger])

  return (
    <div className='grid grid-cols-3 '>
        <div className='col-span-2 bg-slate-400 p-2'>
            <h2
                className='text-blue-500 text-2xl font-bold uppercase tracking-wider text-center hover:text-blue-600 cursor-pointer'
                >Jobs</h2>
            <div 
                className='flex flex-col gap-2' 
                    >{
                    jobs && jobs.map((job) => (
                        <Job key={job.id} job={job} showApply={true} status={''}/>
                    ))
                }
            </div>
        </div>
        <div className='col-span-1 bg-slate-300 p-2'>
            <h2
                className='text-blue-500 text-2xl font-bold uppercase tracking-wider text-center'
                >Create new JOB:</h2>
            <form
                className='flex flex-col gap-2'
                onSubmit={handleCreateJob}
                >
                <div className=''>
                    <label 
                        className='font-bold p-2 '
                        htmlFor="title">Title</label>
                    <input 
                        className='border border-blue-500 p-2 rounded-md'
                        onChange={(e) => setTitle(e.target.value)}
                        type="text" id="title" name="title" required/>
                </div>
                <div>
                    <label 
                        className='font-bold p-2 '
                        htmlFor="description">Description</label>
                    <input 
                        className='border border-blue-500 p-2 rounded-md'
                        onChange={(e) => setDescription(e.target.value)}
                        type="text" id="description" name="description" required />
                </div>
                <div>
                    <label 
                        className='font-bold p-2 '
                        htmlFor="location">Location</label>
                    <input 
                        className='border border-blue-500 p-2 rounded-md'
                        onChange={(e) => setLocation(e.target.value)}
                        type="text" id="location" name="location" required/>
                </div>
                <div>
                    <label 
                        className='font-bold p-2 '
                        htmlFor="company">Company</label>
                    <input 
                        className='border border-blue-500 p-2 rounded-md'
                        onChange={(e) => setCompany(e.target.value)}
                        type="text" id="company" name="company" required/>
                </div>
                <div>
                    <label 
                        className='font-bold p-2 '
                        htmlFor="salary">Salary</label>
                    <input 
                        className='border border-blue-500 p-2 rounded-md'
                        onChange={(e) => setSalary(e.target.value)}
                        type="text" id="salary" name="salary" required/>
                </div>

                <div className='flex items-center justify-center'>
                    <button 
                        className='bg-blue-500 text-white p-2 rounded-md font-bold hover:bg-blue-600'
                        type='submit'>Create Job</button>
                </div>

                <div>
                    <h2
                        className='text-blue-500 text-2xl font-bold uppercase tracking-wider text-center'
                        >Created Jobs:-</h2>
                    <div className='flex flex-col gap-1'>
                        {
                            createdJobs && createdJobs.map((job) => (
                                <div 
                                    className='border border-blue-500 p-1  rounded-md bg-slate-400 hover:bg-slate-500 cursor-pointer'
                                    key={job.id}
                                    
                                >
                                    <h2 
                                        className='text-lg font-bold uppercase tracking-wider text-center'
                                        onClick={()=> router.push(`/jobs/${job.id}`)}
                                        >{job.title}</h2>
                                </div>
                            ))
                        }
                    </div>                    
                </div>
            </form>
        </div>
    </div>
  )
}

export default Jobs