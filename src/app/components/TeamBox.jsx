"use client";
import React from 'react'
import Button from './Button';

const TeamBox = ({ data }) => {
    const handleClick = () => {
        window.open(data.link, '_blank');
    }
    return (
        <div className='p-5 md:w-[400px] flex flex-col justify-between rounded-xl shadow-lg'>
            <img src={data.image.src} className='max-h-[400px] w-6/7 object-contain mx-auto' alt="" />
            <div className='flex flex-col justify-between gap-2 p-4 h-full items-start'>
                <div>
                    <h1 className='md:text-2xl font-bold mt-4'>{data.name}</h1>
                    <p className='text-xs font-medium mt-1'>{data.position}</p>
                    <p className='font-medium py-4 text-sm md:text-xl'>{data.desc}</p>
                </div>
                <Button variant='primary' className='w-full' onClick={handleClick}>Explore</Button>
                {/* <button  className='text-blue-600 font-bold md:text-xl hover:pointer'>Explore {"->"}</button> */}
            </div>
        </div>
    )
}

export default TeamBox