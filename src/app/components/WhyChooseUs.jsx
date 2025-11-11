import { BanIcon, CircleCheck } from 'lucide-react'
import React from 'react'

const WhyChooseUs = ({ data }) => {
    console.log(data);
    return (
        <div className='w-[500px] space-y-5 border rounded-xl p-5 bg-white'>
            <CircleCheck color='#F7A40F' className='h-8 w-8' />
            <h1 className='text-2xl font-medium'>{data.title}</h1>
            <p className='font-medium'>{data.description}</p>
        </div>
    )
}

export default WhyChooseUs