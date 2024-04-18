'use client'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'

const JobsID = () => {
    const params = useParams()
    const {id} = params
    const [applicants, setApplicants] = useState([])

    const fetchApplicants = async () => {
        const res = await axios.post('/api/users/getApplicantsOfUser', {jobId: id})
        const data = await res.data
        console.log(data)
        setApplicants(data.applicants)
    }

    useEffect(() => {
        fetchApplicants()
    }, [])
  return (
    <div 
        className='w-screen h-screen flex flex-col items-center  gap-1 p-2  bg-zinc-500 border-black'
        >
        <h1 
            className='text-2xl font-bold uppercase tracking-wider text-blue-500 bg-zinc-300 p-1 rounded-md'
            >Applicants</h1>
        <div className='w-2/4 flex flex-col gap-1'>
        {
            applicants.map((applicant: any) => {
                return (
                    <div key={applicant.id}>
                        <Applicant applicant = {applicant}/>
                    </div>
                )
            })
        }
        </div>
    </div>
  )
}

const Applicant = ({applicant}: any) => {

    const approveApplicant = async () =>{
        const res = await axios.post('/api/users/approveApplicant',{applicantId: applicant.id})
        const data = res.data
        console.log(data)
        if(data.status === 200){
            console.log('Applicant approved successfully')
        }
    }

    return (
        <div className='flex flex-col item-center border border-black border-double  rounded-md p-2 bg-zinc-300'>
            <p
                className='text-md font-bold uppercase tracking-wider text-blue-500'
                >{applicant.user.name}</p>
            <p
                className='text-md font-bold uppercase tracking-wider text-blue-500'
                >{applicant.user.email}</p>
            <p
                className='text-md font-bold uppercase tracking-wider text-blue-500'
                >{applicant.user.currentCompany}</p>
            <div>
                {
                    applicant.status == 'pending' ? 
                        <button onClick={approveApplicant} 
                        className='bg-green-500 p-1 rounded-md text-white uppercase tracking-wider font-bold'
                        >Approve</button>
                        : <p>{applicant.status} ✅</p>
                }
            </div>
        </div>
    )
}

export default JobsID