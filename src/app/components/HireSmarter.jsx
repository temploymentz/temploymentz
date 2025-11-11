import React from 'react'
import Button from './Button'
import hire from "@/assets/hire.png"
import { style } from '@/styles'

const HireSmarter = () => {
    return (
        <div className='flex items-center min-h-[65vh]'>
            <div className='w-[80%] mx-auto flex justify-between rounded-xl py-10' style={{ backgroundColor: style.lightBG.backgroundColor }}>
                <div className='w-[50%] flex justify-center items-center'>
                    <img src={hire.src} className='h-[400px] object-contain' alt="" />
                </div>
                <div className='w-[50%] space-y-5 flex flex-col justify-center'>
                    <h1 className={`${style.minHeader.fontSize} leading-15 ${style.minHeader.fontWeight}`}>Hire Smarter. Scale Faster. Simplify Staffing.</h1>
                    <p className={`${style.para.fontSize} font-medium text-muted-foreground`}>Experience a new era of on-demand hiring with verified talent, compliance, and quality — all in one platform.</p>
                    <Button>Get Started</Button>
                </div>
            </div>
        </div>
    )
}

export default HireSmarter