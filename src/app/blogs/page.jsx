import { style } from '@/styles'
import React from 'react'
import about from "@/assets/about.png"
import Button from '../components/Button'
import Blog from './_components/Blog'

const page = () => {
    return (
        <>
            <div className='w-[85%] md:w-[80%] mx-auto flex flex-col justify-center items-center py-10 md:py-20 gap-10'>
                <div className='flex flex-col md:flex-row gap-5 md:gap-0 text-center md:text-left justify-between'>
                    <h1 className={`md:w-2/7 ${style.minHeader.fontSize} ${style.minHeader.lineHeight} ${style.minHeader.fontWeight}`}>Blogs</h1>
                    <p className={`md:w-5/7 font-medium ${style.para.fontSize} ${style.para.lineHeight}`}>Founded in Bangalore, Temploymentz set out to revolutionize temporary staffing across India. Our mission is to create flexible work opportunities for skilled professionals and reliable staffing solutions for organizations. With thousands of success stories, we’re dedicated to compliance, quality, and convenience. Partner with us to transform your workforce and unlock growth, balance, and innovation</p>
                </div>
            </div>

            <div className='w-[90%] md:w-[80%] mx-auto flex flex-col justify-center items-center py-5 md:py-15'>
                <div className='flex flex-col md:flex-row items-center justify-between px-10 gap-10 border rounded-xl'>
                    <div className='md:w-2/4'>
                        <img src={about.src} className='h-[250px] object-cover' alt="" />
                    </div>
                    <div className='md:w-2/4 space-y-3 pb-5'>
                        <h1 className={`font-medium ${style.para.fontSize} ${style.para.lineHeight}`}>Flexibility & Scalability</h1>
                        <p className={`text-sm md:text-md`}>When workloads fluctuate, or you have a short-term project, a temporary workforce allows you to *scale up or down quickly*. You avoid committing to long-term payroll overheads when the need is transient. Meador Staffing Services+1</p>
                        <Button className='text-xs md:text-base'>Read More -{">"}</Button>
                    </div>
                </div>
            </div>

            <div className='w-[80%] mx-auto pb-20'>
                <div className='grid md:grid-cols-2 gap-x-20 gap-y-10'>
                    <Blog />
                    <Blog />
                    <Blog />
                    <Blog />
                    <Blog />
                    <Blog />
                    <Blog />
                    <Blog />
                    <Blog />
                </div>
            </div>

        </>
    )
}

export default page