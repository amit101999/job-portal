import { Instagram, Linkedin, Twitter } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <>
            <hr className='mx-5 text-gray-800 font-bold' />
            <div className='flex items-center justify-between mx-10 my-5'>
                <div className=''>
                    <p className='font-bold text-sm'>Job Hunt</p>
                    <p className='text-gray-400'>@2024 Your Company . All rights reserved.</p>
                </div>
                <div>
                    <div className='flex gap-4'>
                        <a href="" className='hover:bg-slate-900'> <Instagram /> </a>
                        <a href=""> <Twitter /> </a>
                        <a href=""><Linkedin /></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer