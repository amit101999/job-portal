import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { current } from '@reduxjs/toolkit'

const Job = ({ job }) => {
    const navigate = useNavigate()

    const daysAgoFunction = () => {
        const currentDate = new Date().getDate();
        const documentCreatedDate = new Date(job?.createdAt).getDate();

        return currentDate - documentCreatedDate == 0 ? "Today" : `${currentDate - documentCreatedDate} days ago`

    }

    return (
        <div className='p-5 rounded-md shadow-lg bg-slate-100 border-gray-400'>
            <div className='flex items-center justify-between'>
                <p className='text-gray-600 text-sm'>{daysAgoFunction()}</p>
                <Button variant="outline" className="rounded-full" ><Bookmark /></Button>
            </div>
            <div className='flex my-2 gap-2 items-center'>
                <Button className="p-6" variant="outline" size="icon" >
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-600'>{job?.location || "india"}</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.description.slice(0, 10)}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant="ghost">12 Positions </Badge>
                <Badge className='text-[#F83002] font-bold' variant="ghost">{job?.jobType}</Badge>
                <Badge className='text-[#7209b7] font-bold' variant="ghost">{job?.salary || "24lpa"}</Badge>
            </div >
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button className="bg-[#7209b7]" >save for later</Button>
            </div>
        </div>
    )
}

export default Job