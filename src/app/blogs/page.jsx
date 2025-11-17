import { style } from '@/styles'
import React from 'react'
import about from "@/assets/about.png"
import Button from '../components/Button'
import Blog from './_components/Blog'
import { blogData } from '@/data'
import SingleBlog from './_components/SingleBlog'

const page = () => {
    return (
        <>
            <div className='w-[85%] md:w-[80%] mx-auto flex flex-col justify-center items-center py-10 md:py-20 gap-10'>
                <div className='flex flex-col md:flex-row gap-5 md:gap-0 text-center md:text-left justify-between'>
                    <h1 className={`text-blue-600 ${style.minHeader.fontSize} ${style.minHeader.lineHeight} ${style.minHeader.fontWeight}`}>Blogs <span className='text-[#493f4a]'>|</span>  <span className='text-yellow-500'>Resources</span> </h1>
                    {/* <p className={`md:w-5/7 font-medium ${style.para.fontSize} ${style.para.lineHeight}`}>Founded in Bangalore, Temploymentz set out to revolutionize temporary staffing across India. Our mission is to create flexible work opportunities for skilled professionals and reliable staffing solutions for organizations. With thousands of success stories, we’re dedicated to compliance, quality, and convenience. Partner with us to transform your workforce and unlock growth, balance, and innovation</p> */}
                </div>
            </div>
            <SingleBlog />
            <div className='w-[80%] mx-auto pb-20'>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-10'>
                    {
                        blogData.map((ele, idx) => {
                            if (idx === 0) return null;
                            return <Blog index={idx} key={idx} data={ele} />
                        })
                    }
                </div>
            </div>

        </>
    )
}

export default page