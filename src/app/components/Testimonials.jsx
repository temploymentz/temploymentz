import React from 'react'
import { StarIcon } from 'lucide-react'
import { style } from '@/styles'

const Testimonials = ({ data }) => {
    // Generate stars based on rating (default to 5)
    const rating = data.rating || 5;
    const stars = Array.from({ length: 5 }, (_, i) => i < rating);

    return (
        <div style={{ backgroundColor: style.lightBG.backgroundColor }} className='rounded-xl p-5 md:py-10 md:px-10 space-y-7'>
            <div className='flex gap-5 items-center'>
                <img src={data.image} className='h-[50px] w-[50px] rounded-full' alt="" />
                <div className='space-y-1'>
                    <h1 className='font-medium md:text-xl'>{data.name}</h1>
                    <p className='text-xs md:text-sm'>{data.role}</p>
                </div>
            </div>
            <div className='md:text-xl'>
                {data.feedback}
            </div>
            <div className='flex gap-1 items-center'>
                {stars.map((filled, index) => (
                    <StarIcon 
                        key={index}
                        fill={filled ? '#F7A40F' : '#E5E7EB'} 
                        color={filled ? '#F7A40F' : '#D1D5DB'}
                    />
                ))}
            </div>
        </div>
    )
}

export default Testimonials