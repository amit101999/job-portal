import React from 'react'
import Nabvar from './shared/Nabvar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'

const Jobs = () => {

    const { allJobs } = useSelector(store => store.job)


    return (
        <div>
            <Nabvar />
            <div className='max-w-7xl mx-auto mt-5 '>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        allJobs?.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        allJobs?.map((job) => {
                                            return (
                                                <Job key={job?._id} job={job} />
                                            )
                                        }

                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div >
    )
}

export default Jobs