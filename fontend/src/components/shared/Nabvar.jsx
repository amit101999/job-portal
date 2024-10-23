import React from 'react'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { LogOut, User2 } from 'lucide-react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { setAuthUser } from '@/redux/authSlice'



const Nabvar = () => {

    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setAuthUser(null))
                navigate('/')
                toast.success("Logged out successfully")
            }
        } catch (err) {
            console.log("error in logout : ", err)
            toast.error(err.response.data.message)
        }
    }

    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-24 max-h-7xl h-16 '>
                <div>
                    <h1 className='text-2xl font-bold'>Job <span className='text-[#f83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium item-center gap-5'>
                        {user && user.role === 'recruiter' ? (<>
                            <li><Link to="/admin/companies">Companies</Link> </li>
                            <li><Link to="/admin/jobs" >Jobs</Link></li>
                        </>) : (
                            <>
                                <li><Link to="/">Home</Link> </li>
                                <li><Link to="/jobs" >Jobs</Link></li>
                                <li><Link to="/browse">Browse</Link></li></>
                        )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login">
                                    <Button className="border-2 border-black rounded">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38c2] hover:bg-[#452380] text-white rounded">SignUp</Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user.profile.profilePic || "data:image/jpeg;base64,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tFuPDHyxGJ3HjnkUdVbRLhlGwghAQEBAQZnTOm67UVT2dG3diacSzuHus8PE+C4dZrsWlr809/SHvhwWyT9l2acsFFp6hFLRM4njJKfxSHvKp+p1WTUX67pnHirjrxVmMLweggICAgICAgICAgIGB3INc1HpK3XvekczsKs8p4xxPD+YdV3aTcM2mniJ5j2ceo0ePNHtKt73pS6Wcl0kJmgHKaHJHmOismm3PBnjjnifaUNm0OXF6cwwakolxuEjA9pa4ZBWWazNXgliMTsHkeRR1VvFodaNhAQEHfR0dTXzCCippaiZxxuxtJx8eg815Zc2PFHN54bUx2vPaFhac2ZOfuzagk3Wg59mhdgu/U4cvgFAave/y6eP3lIYdD63WZRUlNQ00dPRwRwwsGGsY3ACgL3tknqvPMpCtYrHFYehathAQEBAQEBAQEBAQEBAQQRngQgwN10nZrqXPnpBHKf+7D7jv25+a68G4ajB9Nu3tLly6PDl8w1et2ZuHG33IkflqI+P9TfRSuLfZj/cp/DhvtX9lmGqtnl7ALezp5m9DHL64XbTe9NPnmHhG3Z6T24YmTQWpWOIFuLh0Ikb6r2jdtJP5v8AL0/CZvZzj2e6lkODQtb+uZvqtbbxpY/NMsxossslSbLLxK4Gqq6Onb13S6Q/LAH7rmvv2GPorL1roL+stltezC0UzxJXVFRWuH8jiGR/JvE+ZKjs29ai/akRDopoccd57txt9vo7dCIaGmhp4xybEwNCi75b5J6rzzLrrWKxxEPWtGwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/2Q=="} />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user.profile.profilePic || "data:image/jpeg;base64,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tFuPDHyxGJ3HjnkUdVbRLhlGwghAQEBAQZnTOm67UVT2dG3diacSzuHus8PE+C4dZrsWlr809/SHvhwWyT9l2acsFFp6hFLRM4njJKfxSHvKp+p1WTUX67pnHirjrxVmMLweggICAgICAgICAgIGB3INc1HpK3XvekczsKs8p4xxPD+YdV3aTcM2mniJ5j2ceo0ePNHtKt73pS6Wcl0kJmgHKaHJHmOismm3PBnjjnifaUNm0OXF6cwwakolxuEjA9pa4ZBWWazNXgliMTsHkeRR1VvFodaNhAQEHfR0dTXzCCippaiZxxuxtJx8eg815Zc2PFHN54bUx2vPaFhac2ZOfuzagk3Wg59mhdgu/U4cvgFAave/y6eP3lIYdD63WZRUlNQ00dPRwRwwsGGsY3ACgL3tknqvPMpCtYrHFYehathAQEBAQEBAQEBAQEBAQQRngQgwN10nZrqXPnpBHKf+7D7jv25+a68G4ajB9Nu3tLly6PDl8w1et2ZuHG33IkflqI+P9TfRSuLfZj/cp/DhvtX9lmGqtnl7ALezp5m9DHL64XbTe9NPnmHhG3Z6T24YmTQWpWOIFuLh0Ikb6r2jdtJP5v8AL0/CZvZzj2e6lkODQtb+uZvqtbbxpY/NMsxossslSbLLxK4Gqq6Onb13S6Q/LAH7rmvv2GPorL1roL+stltezC0UzxJXVFRWuH8jiGR/JvE+ZKjs29ai/akRDopoccd57txt9vo7dCIaGmhp4xybEwNCi75b5J6rzzLrrWKxxEPWtGwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/2Q=="} />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user.fullname}</h4>
                                            <p children='text-sm text-muted-foregorund'>{user.profile.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-2  text-gray-600'>
                                        {user && user.role === "student" && (
                                            <div className='flex w-fit items-center gap-0 cursor-pointer'>
                                                <User2 />
                                                <Button variant="link"> <Link to="/profile">View profile</Link></Button>
                                            </div>
                                        )}

                                        <div className='flex w-fit items-center gap-0 cursor-pointer'>
                                            <LogOut />
                                            <Button variant="link" onClick={logoutHandler}> logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div >

        </div >
    )
}

export default Nabvar