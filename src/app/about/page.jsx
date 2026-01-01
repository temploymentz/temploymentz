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
            <div className='w-[95%] xl:w-[80%] mx-auto flex flex-col justify-center items-center py-10 md:py-20 gap-10'>
                <div className='flex flex-col xl:flex-row gap-5 md:gap-0 text-center xl:text-left justify-between items-center'>
                    <h1 className={`xl:w-2/7 font-bold leading-9 xl:leading-12 ${style.minHeader.fontSize}`}> <span className='text-blue-600'>About</span> <span className='text-yellow-500'>Temploymentz</span> </h1>
                    <div className='xl:w-4/7 space-y-10'>
                        <h1 className="
                                text-xl md:text-2xl xl:text-3xl 
                                mt-2 md:mt-5 
                                leading-7 xl:leading-10 
                                text-balance 
                                mx-auto
                                font-medium
                                ">
                            Empowering <span className="text-blue-600">Businesses</span> &
                            <span className="text-yellow-500"> Professionals</span> in the
                            New Age of Work
                        </h1>
                        <p className={` font-medium xl:text-xl text-[#493f4a] ${style.para.lineHeight}`}>Founded in Bangalore, Temploymentz set out to revolutionize temporary staffing across India. Our mission is to create flexible work opportunities for skilled professionals and reliable staffing solutions for organizations. With thousands of success stories, we’re dedicated to compliance, quality, and convenience. Partner with us to transform your workforce and unlock growth, balance, and innovation</p>
                    </div>
                </div>
                <img src={about.src} className='h-[250px] -mt-10 md:h-[350px] xl:w-full xl:h-fit object-cover' alt="" />
            </div>


            <div style={{ backgroundColor: style.lightBG.backgroundColor }}>
                <div className='w-[85%] md:w-[80%] mx-auto flex flex-col justify-center min-h-[70vh] items-center py-20'>
                    <div className='space-y-10 text-center py-5'>
                        <h1 className={`${style.minHeader.fontSize} ${style.minHeader.lineHeight} font-medium`}>Driven by <span className='text-blue-600'>Purpose</span>, Guided by <span className='text-yellow-500'>Innovation</span></h1>
                    </div>
                    <div className='grid md:grid-cols-2 gap-y-10 gap-x-20 py-5 md:py-10'>
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