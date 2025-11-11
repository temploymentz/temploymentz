import { style } from '@/styles'
import React from 'react'
import about from "@/assets/about.png"
import AboutBox from './_components/AboutBox'
import HireSmarter from '../components/HireSmarter'
import TeamComponent from '../components/TeamComponent'
import { aboutData } from '@/data'


const page = () => {
    return (
        <>
            <div className='w-[80%] mx-auto flex flex-col justify-center min-h-[95vh] items-center'>
                <div className='flex justify-between'>
                    <h1 className={`w-2/7 ${style.minHeader.fontSize} ${style.minHeader.lineHeight} ${style.minHeader.fontWeight}`}> <span className='text-blue-600'>About</span> <span className='text-yellow-500'>Us</span> </h1>
                    <p className={`w-5/7 font-medium ${style.para.fontSize} ${style.para.lineHeight}`}>Founded in Bangalore, Temploymentz set out to revolutionize temporary staffing across India. Our mission is to create flexible work opportunities for skilled professionals and reliable staffing solutions for organizations. With thousands of success stories, we’re dedicated to compliance, quality, and convenience. Partner with us to transform your workforce and unlock growth, balance, and innovation</p>
                </div>
                <img src={about.src} className='h-[500px] object-contain' alt="" />
            </div>


            <div style={{ backgroundColor: style.lightBG.backgroundColor }}>
                <div className='w-[80%] mx-auto flex flex-col justify-center min-h-[70vh] items-center py-20'>
                    <div className='space-y-10 text-center py-5'>
                        <h1 className={`${style.minHeader.fontSize} ${style.minHeader.lineHeight} font-medium`}>Driven by <span className='text-blue-600'>Purpose</span>, Guided by <span className='text-yellow-500'>Innovation</span></h1>
                    </div>
                    <div className='grid grid-cols-2 gap-y-10 gap-x-20 py-10'>
                        {
                            aboutData.map((item, index) => (
                                <AboutBox key={index} data={item} />
                            ))
                        }
                    </div>
                </div>
            </div>


            <TeamComponent />


            <HireSmarter />

        </>
    )
}

export default page