import React, { useState } from 'react'
import Nabvar from './shared/Nabvar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobs from './AppliedJobs'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const skills = ['html', 'js', 'css', 'react']
const Profile = () => {
    const ishaveResume = true;

    const [open, setOpen] = useState(false)

    const { user } = useSelector(store => store.auth)

    useGetAppliedJobs()

    return (
        <div>
            <Nabvar />
            <div className='max-w-4xl mx-auto bg-gray-100 border-gray-800 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>

                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24 ">
                            <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwm2crnRitxC5fh95sHn-NIvLHH1CyORvr9g&s" />
                        </Avatar>
                        <div>
                            <h1 className='text-xl font-medium'> {user?.fullname} </h1>
                            <p>{user.profile.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => (
                                <Badge key={index} className="text-white bg-green-500">{item}</Badge>
                            )) : <span>No skills</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {ishaveResume ?
                        <a href={user?.profile?.resume} target='blank' className='text-blue-500 w-full hover:underline cursor-pointer'>{user.profile.resumeOriginalName}</a> :
                        <span>No Resume Found</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>All applied jobs</h1>
                <AppliedJobs />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div >
    )
}

export default Profile