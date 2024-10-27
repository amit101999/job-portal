import { setSingleCompany } from '@/redux/companySlice';
import { setAllJobs } from '@/redux/jobSlice';
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetCompanyByID = (cmpId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${cmpId}`, {
                    withCredentials: true
                })

                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company))
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchSingleCompany()
    }, [cmpId, dispatch])
}

export default useGetCompanyByID