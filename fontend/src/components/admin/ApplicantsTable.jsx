import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'


const shortedListedStatus = ["Accepted", "rejected"]

const ApplicantsTable = () => {
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
                    {/* <tr */}
                    <TableRow>
                        <TableCell>amit thakur</TableCell>
                        <TableCell>amit@gmal</TableCell>
                        <TableCell>863091968</TableCell>
                        <TableCell>amit.pdf</TableCell>
                        <TableCell>20/15/2024</TableCell>
                        <TableCell className="text-right">
                            <Popover>
                                <PopoverTrigger>
                                    <MoreHorizontal />
                                    <PopoverContent className="w-32">
                                        {
                                            shortedListedStatus.map((status, index) => (
                                                <div key={index} className='flex w-fit cursor-pointer items-center my-2'>
                                                    <span>{status}</span>
                                                </div>
                                            ))
                                        }
                                    </PopoverContent>
                                </PopoverTrigger>
                            </Popover>

                        </TableCell>
                    </TableRow>
                    {/* </tr> */}
                </TableBody>
            </Table>
        </div >
    )
}

export default ApplicantsTable