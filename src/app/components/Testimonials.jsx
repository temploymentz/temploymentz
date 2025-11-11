import React from 'react'
import { StarIcon } from 'lucide-react'
import { style } from '@/styles'

const Testimonials = ({ data }) => {
    return (
        <div style={{ backgroundColor: style.lightBG.backgroundColor }} className='rounded-xl w-[450px] py-10 px-10 space-y-7'>
            <div className='flex gap-5 items-center'>
                <img src={data.image.src} className='h-[50px] w-[50px] rounded-full' alt="" />
                <div className='space-y-1'>
                    <h1 className='font-medium text-xl'>{data.name}</h1>
                    <p className='text-sm'>{data.role}</p>
                </div>
            </div>
            <div className='text-xl'>
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