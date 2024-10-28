import React, { useState } from 'react'
import Nabvar from '../shared/Nabvar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {

    const companyArray = []

    const [input, setInput] = useState({
        title: "",
        description: "",
        location: "",
        requirements: "",
        salary: "",
        jobType: "",
        exprience: "",
        position: 0,
        companyId: ""
    })

    const [loading, setLoading] = useState(false)

    const { companies } = useSelector((store) => store.company)

    const navigate = useNavigate()

    const changeEventHandlder = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((cmp) => cmp.name.toLowerCase() == value)
        setInput({ ...input, companyId: selectedCompany._id })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(`${JOB_API_END_POINT}/postjob`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            if (res.data.success) {
                toast.message("job posted successfully")
                navigate("/admin/jobs")
            }
        } catch (err) {
            toast.error("Error in posting job")
            console.log("error in posting job", err)
        } finally {
            setLoading(false)
        }

    }


    return (
        <div>
            <Nabvar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className="p-8 max-w-4xl border-gray-900 shadow-xl rounded">

                    <div className='grid grid-cols-2 gap-2'>

                        <div>
                            <Label>title</Label>
                            <Input
                                value={input.name}
                                onChange={changeEventHandlder}
                                type="text" name="title" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>description</Label>
                            <Input
                                value={input.description}
                                onChange={changeEventHandlder}
                                type="text" name="description" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>job Type</Label>
                            <Input
                                value={input.jobType}
                                onChange={changeEventHandlder}
                                type="text" name="jobType" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Skills</Label>
                            <Input
                                value={input.requirements}
                                onChange={changeEventHandlder}
                                type="text" name="requirements" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>salary</Label>
                            <Input
                                value={input.salary}
                                onChange={changeEventHandlder}
                                type="text" name="salary" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>location</Label>
                            <Input
                                value={input.location}
                                onChange={changeEventHandlder}
                                type="text" name="location" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Number of positions</Label>
                            <Input
                                value={input.position}
                                onChange={changeEventHandlder}
                                type="number" name="position" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>

                        <div>
                            <Label>Exeperience Level</Label>
                            <Input
                                value={input.exprience}
                                onChange={changeEventHandlder}
                                type="text" name="exprience" className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        {
                            companies.length != 0 && (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup className='bg-white'>
                                            {companies.map((cmp) => (
                                                <SelectItem className="cursor-pointer hover:font-bold" value={cmp.name.toLowerCase()}>{cmp.name}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div>
                    {loading ?
                        (<Button> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> please wait </Button>)
                        :
                        <Button className="w-full mt-4 bg-black text-white hover:bg-blue-700">Post new Job</Button>
                    }
                    {
                        companies.length === 0 && <p className='text-xs text-center my-3 text-red-800'>Please Register a company first before posting the job</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob