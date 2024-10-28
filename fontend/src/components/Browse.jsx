import React, { useEffect } from 'react'
import Job from './Job'
import Nabvar from './shared/Nabvar'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'


const randomJobs = [1, 2, 3]

const Browse = () => {
    useGetAllJobs()
    const { allJobs } = useSelector(store => store.job)
    const dispatch = useDispatch();


    // useEffect(() => {
    //     dispatch(setSearchedQuery(""))
    // }, [])

    return (
        <div>
            <Nabvar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold'>Search Results :  ({randomJobs.length}) </h1>
                <div className='grid grid-cols-3 gap-4 mt-5 '>
                    {
                        allJobs?.map((job, index) => (
                            <Job key={index} job={job} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse