import { BanIcon, CircleCheck } from 'lucide-react'
import React from 'react'

const WhyChooseUs = ({ data }) => {
    console.log(data);
    return (
        <div className='space-y-5 border rounded-xl p-5 bg-white'>
            <CircleCheck color='#F7A40F' className='h-8 w-8' />
            <h1 className='text-xl md:text-2xl font-medium text-blue-600'>{data.title}</h1>
            <p className='text-sm md:text-base font-medium'>{data.description}</p>
        </div>
    )
}

export default WhyChooseUs