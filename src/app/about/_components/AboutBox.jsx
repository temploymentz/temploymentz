import React from 'react'

const AboutBox = ({ data }) => {
    return (
        <div className='space-y-5 border rounded-xl p-5 bg-white'>
            <img src={data.image.src} className='h-10 w-10' alt="" />
            <h1 className='text-2xl font-bold'>{data.title}</h1>
            <p className='font-medium'>{data.description}</p>
        </div>
    )
}

export default AboutBox