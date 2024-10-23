import React, { useState } from 'react'
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogFooter } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setAuthUser } from '@/redux/authSlice'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false)

    const { user } = useSelector(store => store.auth)

    const dispatch = useDispatch()

    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills.map(skill => skill),
    })
    const [file, setFile] = useState(user.profile.resume)

    // const [file, setFile] = useState(user.profile.resumeOriginalName || null)

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setFile(file)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const formdata = new FormData();
        formdata.append("fullname", input.fullname)
        formdata.append("email", input.email)
        formdata.append("phoneNumber", input.phoneNumber)
        formdata.append("bio", input.bio)
        formdata.append("skills", input.skills)
        if (file) {
            formdata.append("file", file)
        }

        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (err) {
            console.log("error in updating profile  : ", err)
        } finally {
            setLoading(false)
        }
        setOpen(false);
    }


    return (
        <div className='bg-white'>
            <Dialog open={open} >
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid grid-4 gap-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input
                                    id='name'
                                    className="col-span-3"
                                    name="name"
                                    onChange={changeEventHandler}
                                    value={input.fullname}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input
                                    onChange={changeEventHandler}
                                    id='email'
                                    className="col-span-3"
                                    name="email" value={input.email} />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="number" className="text-right">Number</Label>
                                <Input
                                    onChange={changeEventHandler}
                                    id='number'
                                    className="col-span-3"
                                    type="number"
                                    name="phoneNumber"
                                    value={input.phoneNumber} />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" className="text-right">Bio</Label>
                                <Input
                                    onChange={changeEventHandler}
                                    id='bio'
                                    className="col-span-3"
                                    name="bio"
                                    value={input.bio} />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" className="text-right">Skills</Label>
                                <Input id='skills'
                                    className="col-span-3"
                                    name="skills"
                                    onChange={changeEventHandler}
                                    value={input.skills} />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="file" className="text-right">Resume</Label>
                                <Input id='file'
                                    // accept="application/pdf"
                                    type="file"
                                    className="col-span-3"
                                    name="file"
                                    onChange={fileChangeHandler}
                                    value={input.file}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {loading ?
                                (<Button> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> please wait </Button>)
                                :
                                (<Button variant="outline" type="submit" className="w-full my-4 bg-sky-700">Update</Button>)
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog