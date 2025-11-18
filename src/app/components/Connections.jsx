"use client"
import React from 'react'
import { style } from '@/styles'
import { signIn } from "next-auth/react";
import Button from './Button';
import google from "@/assets/google.png"

const Connections = ({ data, index }) => {
    return (
        <div style={{ backgroundColor: style.lightBG.backgroundColor }} className='text-left p-5 space-y-5 rounded-xl'>
            <div className='flex flex-col justify-between h-full gap-5 items-start pb-4'>
                <div className='space-y-2 xl:space-y-5'>
                    <img src={data.image.src} className='w-full rounded-xl h-[200px] xl:h-[350px] object-contain mx-auto' alt="" />
                    <h1 className='text-xl xl:text-2xl font-medium pt-4 text-blue-600'>{data.title}</h1>
                    <p className='xl:text-xl'>{data.description}</p>
                </div>
                {
                    index === 0 ?
                        <Button onClick={() => signIn("google")} className='text-blue-600 font-bold xl:text-xl xl:px-10'>Employer LogIn
                            {/* <img src={google.src} className='ml-2 object-contain w-7 h-7 bg-white rounded-full' alt="" /> */}
                        </Button>
                        :
                        index === 1 ?
                            <Button className='text-blue-600 font-bold xl:text-xl xl:px-10'>Candidate LogIn</Button>
                            :
                            <Button className='xl:text-xl xl:px-10'>Explore</Button>
                }
            </div>
        </div>
    )
}

export default Connections