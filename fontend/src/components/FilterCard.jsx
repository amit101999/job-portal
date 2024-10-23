import React from 'react'
import { RadioGroup } from './ui/radio-group'
import { RadioGroupItem } from '@radix-ui/react-radio-group'
import { Label } from './ui/label'

const filterData = [
    {
        filterType: "location",
        array: ["delhi", "pune", "dehradun"]
    },
    {
        filterType: "industry",
        array: ["delhi", "pune", "dehradun"]
    },
    {
        filterType: "salary",
        array: ["delhi", "pune", "dehradun"]
    },

]

const FilterCard = () => {
    return (
        <div className='w-full bg-white rounded-md p-3'>
            <h1 className='font-bold text-lg'>filter jobs</h1>
            <hr className='mt-3' />
            <RadioGroup>
                {
                    filterData.map((item, index) => (
                        <div>
                            <h1>{item.filterType}</h1>
                            {
                                item.array.map((itemData, idx) => (
                                    <div className='flex items-center space-x-2 my-2'>
                                        <RadioGroupItem value={itemData} />
                                        <Label>{itemData}</Label>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard