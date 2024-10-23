import React from 'react'
import Job from './Job'
import Nabvar from './shared/Nabvar'


const randomJobs = [1, 2, 3]

const Browse = () => {
    return (
        <div>
            <Nabvar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold'>Search Results :  ({randomJobs.length}) </h1>
                <div className='grid grid-cols-3 gap-4 mt-5 '>
                    {
                        randomJobs.map((item, index) => (
                            <Job />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse