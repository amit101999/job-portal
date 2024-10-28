import React, { useEffect } from 'react'
import Nabvar from '../shared/Nabvar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { setAllApplicants } from '@/redux/applicationsSlice'
import { useDispatch, useSelector } from 'react-redux'

const Applicants = () => {
    const params = useParams()
    const dispatch = useDispatch();
    const { allApplicants } = useSelector((store) => store.application)
    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
                    withCredentials: true
                })
                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.job))
                }
            } catch (err) {
                console.log("error in fetching applicants", err)
            }
        }
        fetchAllApplicants()
    }, [])

    return (
        <div>
            <Nabvar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Appliants({allApplicants?.applications?.length})</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants