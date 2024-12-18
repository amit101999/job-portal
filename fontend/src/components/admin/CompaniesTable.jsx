import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { setfilterCompanyByText } from '@/redux/companySlice'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {

    const { companies, filterCompanyByText } = useSelector(store => store.company)

    const navigate = useNavigate()
    const [filterCompany, setFilterCompany] = useState(companies)

    useEffect(() => {
        const filterCompany = companies.length >= 0 && companies.filter((company) => {
            if (!filterCompanyByText) {
                // return true mean the same 
                return companies
            }
            return company?.name?.toLowerCase().includes(filterCompanyByText.toLowerCase())
        })
        setFilterCompany(filterCompany)
    }, [filterCompanyByText])

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right" >Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany.length <= 0 ? <span>NO company found</span> : (
                            filterCompany?.map((cmp, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Avatar>
                                                <AvatarImage src={cmp.logo} />
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>{cmp.name} </TableCell>
                                        <TableCell>{cmp.createdAt.split("T")[0]} </TableCell>
                                        <TableCell className="text-right cursor-pointer">
                                            <Popover>
                                                <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                <PopoverContent className="w-32">
                                                    <div onClick={() => { navigate(`/admin/companies/${cmp._id}`) }}
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

export default CompaniesTable