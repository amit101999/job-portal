import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8]

const LatestJobs = () => {

    const { allJobs } = useSelector(store => store.job)

    return (
        <div className='max-w-7xl mx-auto my-16'>
            <h1 className='text-4xl font-bold'> <span className='text-[#6A38C2]'>Latest & Top </span> JOb Opening</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    allJobs?.length <= 0 ? <span>No Jobs Avilable</span> : (
                        allJobs?.slice(0, 6).map((job) => {
                            return <LatestJobCards job={job} key={job._id} />
                        })
                    )
                }
            </div>
        </div>
    )
}

export default LatestJobs