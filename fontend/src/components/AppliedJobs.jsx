import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'


const data = [1, 2, 3, 4]

const AppliedJobs = () => {
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
                        data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>17-07-2024</TableCell>
                                <TableCell>front end</TableCell>
                                <TableCell>ABC</TableCell>
                                <TableCell className="text-right"><Badge className="bg-red-400">Pending</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobs