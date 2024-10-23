import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';

const JobDescription = () => {
    const params = useParams()
    const jobId = params.id
    const dispatch = useDispatch();
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant == user?._id) || false
    const [isApplied, setIsApplied] = useState(isIntiallyApplied)


    const applyJobhandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
                withCredentials: true
            })
            if (res.data.success) {
                setIsApplied(true)
                const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updateSingleJob))
                toast.success('Application submitted successfully!')
            }
        } catch (err) {
            console.log("error in applying job", err)
            toast.success('Application not submittted!')
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {

            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
                    withCredentials: true
                })
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchSingleJob()
    }, [jobId, dispatch, user?._id])


    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.description.slice(0, 10)}</h1>
                    <div>
                        <Badge className='text-blue-700 font-bold' variant="ghost">12 Positions </Badge>
                        <Badge className='text-[#F83002] font-bold' variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className='text-[#7209b7] font-bold' variant="ghost">{singleJob?.salary || "24lpa"}</Badge>
                    </div>
                </div>
                <Button onClick={isApplied ? null : applyJobhandler} disable={isApplied} className={`rounded-lg ${isApplied ?
                    'bg-gray-600 cursor-not-allowed' : ' bg-[#7209b7] hover:bg-[#72458d]'}`}>
                    {
                        isApplied ? " Already applied" : "Apply Now"
                    }
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>{singleJob?.description} </h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role : <span className='pl-4 font-normal text-gray-800'>front End</span></h1>
                <h1 className='font-bold my-1'>location : <span className='pl-4 font-normal text-gray-800'>Dehradun</span></h1>
                <h1 className='font-bold my-1'>Description : <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}.</span></h1>
                <h1 className='font-bold my-1'>Experience : <span className='pl-4 font-normal text-gray-800'>2 yrs</span></h1>
                <h1 className='font-bold my-1'>Salary : <span className='pl-4 font-normal text-gray-800'>12 Lpa</span></h1>
                <h1 className='font-bold my-1'>Total Applicants : <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications.length || "0"}</span></h1>
                <h1 className='font-bold my-1'>Posted Date : <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription