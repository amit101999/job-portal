import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
const HeroSection = () => {
    const [query, setQuery] = useState("")

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='px-4  py-2 mx-auto rounded-full bg-gray-200 text-[#f83002] font-medium'>NO.1 Job hunt website</span>
                <h1 className='text-4xl'>Search Apply & <br /> Get youy <span className='text-blue-700'>Dream job</span></h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, animi. Quia enim temporibus deserunt?</p>
                <div>
                    <div className='flex  w-[40%] shadow-lg  border-gray-100  pl-3 rounded-full items-center gap-4 mx-auto'>
                        <input type="text"
                            onChange={(e) => { setQuery(e.target.value) }}
                            placeholder='Find job dream JOBs'
                            value={query}
                            className='outline-none w-full h-10 text-lg' />
                        <Button onClick={searchJobHandler}
                            className="rounded-r-full h-10 bg-[#6A38C2]">
                            <Search className="h-10 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default HeroSection