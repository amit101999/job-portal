import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useDispatch } from 'react-redux'

const filterData = [
    {
        filterType: "location",
        array: ["Delhi", "Pune", "Dehradun"]
    },
    {
        filterType: "Stream",
        array: ["Full stack", "Backend", "Frontend"]
    },
    {
        filterType: "salary",
        array: ["7lpa", "9lpa", "12lpa"]
    },

]

const FilterCard = () => {

    const [selectedValue, setSelectedValue] = useState("")
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value)
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue])

    return (
        <div className='w-full bg-white rounded-md p-3'>
            <h1 className='font-bold text-lg'>filter jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((item, index) => (
                        <div>
                            <h1>{item.filterType}</h1>
                            {
                                item.array.map((itemData, idx) => {
                                    const itemId = `r${index} - ${idx}`
                                    return (
                                        < div className='flex items-center space-x-2 my-2' >
                                            <RadioGroupItem value={itemData} id={itemId} />
                                            <Label htmlFor={itemId}>{itemData}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup >
        </div >
    )
}

export default FilterCard