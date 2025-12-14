import React from 'react'
import { StarIcon } from 'lucide-react'
import { style } from '@/styles'

const Testimonials = ({ data }) => {
    // Generate stars based on rating (default to 5)
    const rating = data.rating || 5;
    const stars = Array.from({ length: 5 }, (_, i) => i < rating);
    
    // Use image if available, otherwise use a placeholder
    const imageUrl = data.image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(data.name) + '&background=0D8ABC&color=fff';

    return (
        <div style={{ backgroundColor: style.lightBG.backgroundColor }} className='rounded-xl p-5 md:py-10 md:px-10 space-y-7'>
            <div className='flex gap-5 items-center'>
                <img src={imageUrl} className='h-[50px] w-[50px] rounded-full object-cover' alt={data.name} />
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