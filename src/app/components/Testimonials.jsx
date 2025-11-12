import React from 'react'
import { StarIcon } from 'lucide-react'
import { style } from '@/styles'

const Testimonials = ({ data }) => {
    return (
        <div style={{ backgroundColor: style.lightBG.backgroundColor }} className='rounded-xl p-5 md:py-10 md:px-10 space-y-7'>
            <div className='flex gap-5 items-center'>
                <img src={data.image.src} className='h-[50px] w-[50px] rounded-full' alt="" />
                <div className='space-y-1'>
                    <h1 className='font-medium md:text-xl'>{data.name}</h1>
                    <p className='text-xs md:text-sm'>{data.role}</p>
                </div>
            </div>
            <div className='md:text-xl'>
                {data.feedback}
            </div>
            <div className='flex gap-1 items-center'>
                <StarIcon fill='#F7A40F' color='#F7A40F' />
                <StarIcon fill='#F7A40F' color='#F7A40F' />
                <StarIcon fill='#F7A40F' color='#F7A40F' />
                <StarIcon fill='#F7A40F' color='#F7A40F' />
                <StarIcon fill='#F7A40F' color='#F7A40F' />
            </div>
        </div>
    )
}

export default Testimonials