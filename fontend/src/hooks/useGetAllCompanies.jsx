import { setCompanies } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                    withCredentials: true
                })

                if (res.data.success) {
                    dispatch(setCompanies(res.data.company))
                }
            } catch (err) {
                console.error(err)
            }
        }
        fetchAllCompanies()
    }, [])
}

export default useGetAllCompanies