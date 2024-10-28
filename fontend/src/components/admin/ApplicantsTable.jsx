import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'


const shortedListedStatus = ["Accept", "Reject"]

const ApplicantsTable = () => {

    const statusHandler = async (status, id) => {
        console.log(status, id)
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, {
                withCredentials: true
            })
            if (res.data.success) {
                toast.success("Status updated successfully")
            }
        } catch (err) {
            toast.error("Error in updating status ", err)
            console.log("Error in updating status", err)
        }
    }


    const { allApplicants } = useSelector((store) => store.application)

    return (
        <div>
            <Table >
                <TableCaption>List of all the Applicants</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Content</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allApplicants && allApplicants?.applications?.map((item) => (

                            <TableRow>
                                <TableCell>{item.applicant?.fullname}</TableCell>
                                <TableCell>{item.applicant?.email}</TableCell>
                                <TableCell>{item.applicant?.phoneNumber}</TableCell>
                                <TableCell className="text-blue-600 cursor-pointer"><a href={item.applicant?.profile?.resume}>{item.applicant?.profile?.resumeOriginalName}</a></TableCell>
                                <TableCell> {allApplicants.createdAt.split("T")[0]} </TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                            <PopoverContent className="w-32">
                                                {
                                                    shortedListedStatus.map((status, index) => (
                                                        <div onClick={() => { statusHandler(status, item?._id) }} key={index} className='flex w-fit cursor-pointer items-center my-2 '>
                                                            <span className='hover:font-bold'>{status}</span>
                                                        </div>
                                                    ))
                                                }
                                            </PopoverContent>
                                        </PopoverTrigger>
                                    </Popover>

                                </TableCell>
                            </TableRow >
                        ))
                    }
                </TableBody>
            </Table>
        </div >
    )
}

export default ApplicantsTable