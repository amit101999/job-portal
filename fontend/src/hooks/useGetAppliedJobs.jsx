import { setAllAppliedJobs, setAllJobs } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
                    withCredentials: true
                })
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.applications))
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchAllAppliedJobs()
    }, [])
}

export default useGetAppliedJobs