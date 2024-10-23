import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setSingleCompany } from '@/redux/CompanySlice'
import { useDispatch } from 'react-redux'

const CreateCompany = () => {
    const navigate = useNavigate()

    const [companyName, setComapanyName] = useState()

    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    "Content-Type": "application/json"
                }, withCredentials: true
            })
            if (res.data.success) {
                toast.success("res.data.success")
                dispatch(setSingleCompany(res.data.company))
                const cmpID = res?.data?.company?._id
                navigate(`admin/companies/:${cmpID}`)
            }
        } catch (err) {
            console.error("Error in registering new company", err)
        }
    }

    return (
        <div>
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='text-2xl font-bold'>Your Company Name</h1>
                    <p className='text-gray-500'>what would uou like to give company name ? you can change this name later</p>
                </div>
                <Label>Company Name</Label>
                <Input type="text" className="my-2" placeholder="JobHunt , Microsoft , etc"
                    onChange={(e) => setComapanyName(e.target.value)} />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button onClick={registerNewCompany} className="bg-black text-white rounded">Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateCompany