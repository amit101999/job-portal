import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {

    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)

    const navigate = useNavigate()
    const [filterJobs, setFilterJobs] = useState(allAdminJobs)

    useEffect(() => {
        const filterJob = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                // return true mean the same 
                return allAdminJobs
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
        })
        setFilterJobs(filterJob)
    }, [searchJobByText, allAdminJobs])

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right" >Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs.length <= 0 ? <span>NO Job found</span> : (
                            filterJobs?.map((job, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {job?.company?.name}
                                        </TableCell>
                                        <TableCell>{job?.title} </TableCell>
                                        <TableCell>{job.createdAt.split("T")[0]} </TableCell>
                                        <TableCell className="text-right cursor-pointer">
                                            <Popover>
                                                <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                <PopoverContent className="w-32">
                                                    <div onClick={() => { navigate(`/admin/companies/${job._id}`) }}
                                                        className='flex items-center cursor-pointer w-fit'>
                                                        <Edit2 className='w-4' />
                                                        <span>Edit</span>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable