import React from 'react'

const TeamBox = ({ data }) => {
    return (
        <div className='p-5 flex flex-col w-[700px] rounded-xl shadow-lg '>
            <img src={data.image.src} className='h-[500px] w-6/7 object-cover mx-auto' alt="" />
            <div className='flex flex-col justify-between gap-2 p-4 h-full items-start'>
                <div>
                    <h1 className='text-2xl font-bold mt-4'>{data.name}</h1>
                    <p className='font-medium mt-1'>{data.position}</p>
                    <p className='font-medium py-4 text-xl'>{data.desc}</p>
                </div>
                <button className='text-blue-600 font-bold text-xl'>Explore {"->"}</button>
            </div>
        </div>
    )
}

export default TeamBox