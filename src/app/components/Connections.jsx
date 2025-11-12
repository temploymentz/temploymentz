import React from 'react'
import Button from './Button'
import { style } from '@/styles'

const Connections = ({ data }) => {
    return (
        <div style={{ backgroundColor: style.lightBG.backgroundColor }} className='text-left p-5 space-y-5 rounded-xl'>
            <div className='flex flex-col justify-between h-full gap-5 items-start pb-4'>
                <div className='space-y-2 xl:space-y-5'>
                    <img src={data.image.src} className='w-full rounded-xl h-[200px] xl:h-[350px] object-contain mx-auto' alt="" />
                    <h1 className='text-xl xl:text-2xl font-medium pt-4'>{data.title}</h1>
                    <p className='xl:text-xl'>{data.description}</p>
                </div>
                <button className='text-blue-600 font-bold'>Explore {"->"}</button>
            </div>
        </div>
    )
}

export default Connections