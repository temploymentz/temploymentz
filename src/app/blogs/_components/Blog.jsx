import React from 'react'
import about from "@/assets/about.png"
import { style } from '@/styles'
import Button from '@/app/components/Button'

const Blog = () => {
    return (
        <div style={{ backgroundColor: style.lightBG.backgroundColor }} className='p-5 border rounded-xl'>
            <img src={about.src} className='h-[250px] object-cover' alt="" />
            <div className='mt-4 space-y-4'>
                <h1 className={`font-medium ${style.para.fontSize} ${style.para.lineHeight}`}>Flexibility & Scalability</h1>
                <p className={`text-sm md:text-md`}>When workloads fluctuate, or you have a short-term project, a temporary workforce allows you to *scale up or down quickly*. You avoid committing to long-term payroll overheads when the need is transient. Meador Staffing Services+1</p>
                <Button className='text-xs md:text-base'>Read More -{">"}</Button>
            </div>
        </div>
    )
}

export default Blog