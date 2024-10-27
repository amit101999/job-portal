
import { setAllAdminJob } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getAdminJobs`, {
                    withCredentials: true
                })
                if (res.data.success) {
                    dispatch(setAllAdminJob(res.data.jobs))
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchAllAdminJobs()
    }, [])
}

export default useGetAllAdminJobs