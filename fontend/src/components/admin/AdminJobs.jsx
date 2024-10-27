import React, { useEffect, useState } from 'react'
import Nabvar from '../shared/Nabvar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJob = () => {
    useGetAllAdminJobs()
    const [input, setInput] = useState("")
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input))
    }, [input])

    const navigate = useNavigate()
    return (
        <div>
            <Nabvar />
            <div className='max-w-6xl mx-auto my-10 '>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className='w-fit'
                        placeholder="filter by name or role"
                        value={input}
                        onChange={(e) => { setInput(e.target.value) }}
                    />
                    <Button className='flex bg-black text-white rounded'
                        onClick={() => navigate("/admin/jobs/create")}
                    >
                        Post New Job</Button>
                </div>
                <AdminJobsTable />
            </div>
        </div>
    )
}

export default AdminJob