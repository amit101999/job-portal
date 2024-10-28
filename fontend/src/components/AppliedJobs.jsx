import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'


// const data = [1, 2, 3, 4]

const AppliedJobs = () => {

    const { allAppliedJob } = useSelector(store => store.job)

    console.log(allAppliedJob[1])
    return (
        <div>
            <Table >
                <TableCaption>A list of  your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Compamy</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJob.length <= 0 ? <span>havent applied for any job yet!!</span>
                            : (
                                allAppliedJob.map((application, index) => (
                                    <TableRow key={index}>
                                        <TableCell>17-07-2024</TableCell>
                                        <TableCell>{application.job?.title}</TableCell>
                                        <TableCell>{application?.job?.company?.name}</TableCell>
                                        <TableCell className="text-right" >
                                            <Badge className={` ${application?.status == 'accept' ? 'bg-green-500' : 'bg-red-500'}`}>
                                                {
                                                    application?.status.toUpperCase()
                                                }
                                            </Badge></TableCell>
                                    </TableRow>
                                ))
                            )
                    }
                </TableBody>
            </Table>
        </div >
    )
}

export default AppliedJobs