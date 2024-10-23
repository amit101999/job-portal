import React, { useState } from 'react'
import Nabvar from '../shared/Nabvar'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Link, useNavigate, } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'



const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("password", input.password)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("role", input.role)
        if (input.file) formData.append("file", input.file)
        try {
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
            }
        } catch (err) {
            console.log("error in register : ", err)
            toast.success(err.message)
        }
    }

    return (
        <div>
            <Nabvar />
            <div className='flex item-center justify-center max-w-7xl mx-auto '>
                <form onSubmit={submitHandler} className='w-1/2 border-2 border-gray-800  p-4 rounded-xl'>
                    <h1 className='font-bold text-xl mb-5'>Sign up</h1>
                    <div className='my-2'>
                        <Label>full name</Label>
                        <Input type="text"
                            placeholder="Amit"
                            name="fullname"
                            value={input.fullname}
                            onChange={changeEventHandler} />
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input type="text"
                            placeholder="Amit@gmail.com"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler} />
                    </div>
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input type="text"
                            placeholder="8630912968"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeEventHandler} />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type="password"
                            placeholder="Amit199"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex item-center m-5 gap-4">
                            <div className="flex items-center space-x-2">
                                <Input type="radio"
                                    name="role"
                                    value="student"
                                    className="cursor-pointer"
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="option-one">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio"
                                    name="role"
                                    value="recruiter"
                                    className="cursor-pointer"
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler} />
                                <Label htmlFor="option-two">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                className="cursor-pointer"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    <Button variant="outline" type="submit" className="w-full my-4 bg-sky-700">Signup</Button>
                    <span>Already have an Account ? <Link to="/login" className='text-blue-600 '>Login</Link></span>
                </form>
            </div>
        </div >
    )
}

export default Signup