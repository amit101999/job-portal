import React, { useEffect, useState } from 'react'
import Nabvar from '../shared/Nabvar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Description } from '@radix-ui/react-dialog'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import useGetCompanyByID from '@/hooks/useGetCompanyById'

const CompanySetup = () => {

    const params = useParams()
    const companyID = params.id


    const navigate = useNavigate()

    useGetCompanyByID(companyID)

    const [loading, setLoading] = useState(false)

    const { singleCompany } = useSelector(store => store.company)

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })


    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file: file })
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', input.name)
        formData.append('description', input.description)
        formData.append('webiste', input.website)
        formData.append('location', input.location)
        if (input.file) {
            formData.append('file', input.file)
        }

        try {
            setLoading(true)
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${companyID}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/admin/companies")
            }
        } catch (err) {
            console.error("Error in submitting form", err)
            toast.success("error in updating companuy profile")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || ""
        })
    }, [singleCompany])

    return (
        <div>
            <Nabvar />
            <div className='max-w-xl mx-auto my -10'>
                <form action="" onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center text-gray-500 font-semibold gap-2">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl '>Comapany Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name </Label>
                            <Input type="text" name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Company Description </Label>
                            <Input type="text" name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Website </Label>
                            <Input type="text" name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location </Label>
                            <Input type="text" name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location </Label>
                            <Input type="file" name="logo"
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    {loading ?
                        (<Button> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> please wait </Button>)
                        :
                        (<Button type="submit" className="w-full mt-8 bg-black text-white hover:bg-blue-700">Update</Button>)
                    }
                </form>
            </div>
        </div >
    )
}

export default CompanySetup