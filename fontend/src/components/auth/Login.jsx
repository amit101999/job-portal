import React, { useState } from 'react'
import Nabvar from '../shared/Nabvar'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setAuthUser, setLoading } from '@/redux/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Loader2 } from 'lucide-react'


const Login = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    })
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const submitHandler = async (e) => {
        dispatch(setLoading(true))
        e.preventDefault()
        try {
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user))
                navigate('/')
                toast.success(res.data.message)
            }
        } catch (err) {
            console.log("error in login : ", err)
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <div>
            <Nabvar />
            <div className='flex item-center justify-center max-w-7xl mx-auto '>
                <form onSubmit={submitHandler} className='w-1/2 border-2 border-gray-800  p-4 rounded-xl'>
                    <h1 className='font-bold text-xl mb-5'>Sign up</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input type="text"
                            placeholder="Amit"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler} />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type="password"
                            placeholder="Amit"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler} />
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
                    </div>
                    {loading ?
                        (<Button> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> please wait </Button>)
                        :
                        (<Button variant="outline" type="submit" className="w-full my-4 bg-sky-700">Login</Button>)
                    }
                    <span>Don't have an Account ? <Link to="/signup" className='text-blue-600 '>Signup</Link></span>
                </form>
            </div>
        </div >
    )
}

export default Login