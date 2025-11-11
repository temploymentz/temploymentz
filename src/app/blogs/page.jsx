import { style } from '@/styles'
import React from 'react'
import about from "@/assets/about.png"
import Button from '../components/Button'
import Blog from './_components/Blog'

const page = () => {
    return (
        <>
            <div className='w-[80%] mx-auto flex flex-col justify-center min-h-[35vh] items-center'>
                <div className='flex justify-between'>
                    <h1 className={`w-2/7 ${style.minHeader.fontSize} ${style.minHeader.lineHeight} ${style.minHeader.fontWeight}`}>Blogs</h1>
                    <p className={`w-5/7 font-medium ${style.para.fontSize} ${style.para.lineHeight}`}>Founded in Bangalore, Temploymentz set out to revolutionize temporary staffing across India. Our mission is to create flexible work opportunities for skilled professionals and reliable staffing solutions for organizations. With thousands of success stories, we’re dedicated to compliance, quality, and convenience. Partner with us to transform your workforce and unlock growth, balance, and innovation</p>
                </div>
            </div>

            <div className='w-[80%] mx-auto flex flex-col justify-center items-center py-15'>
                <div className='flex items-center justify-between px-10 gap-10 py-5 border rounded-xl'>
                    <div className='w-2/4'>
                        <img src={about.src} className='h-full object-cover' alt="" />
                    </div>
                    <div className='w-2/4 space-y-3'>
                        <h1 className={`font-medium ${style.para.fontSize} ${style.para.lineHeight}`}>Flexibility & Scalability</h1>
                        <p className={`text-md`}>When workloads fluctuate, or you have a short-term project, a temporary workforce allows you to *scale up or down quickly*. You avoid committing to long-term payroll overheads when the need is transient. Meador Staffing Services+1</p>
                        <Button>Read More -{">"}</Button>
                    </div>
                </div>
            </div>

            <div className='w-[80%] mx-auto pb-20'>
                <div className='grid grid-cols-2 gap-x-20 gap-y-10'>
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