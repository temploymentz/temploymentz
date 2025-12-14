"use client";
import React from 'react'
import { style } from '@/styles'
import Button from '@/app/components/Button'
import { useRouter } from 'next/navigation';

const Blog = ({ data, index }) => {
    const router = useRouter();

    const handleReadMore = () => {
        // Use MongoDB _id if available, otherwise fallback to index
        const blogId = data._id || (index + 1);
        router.push(`/blogs/${blogId}`);
    };
    return (
        <div style={{ backgroundColor: style.lightBG.backgroundColor }} className='p-5 border rounded-xl'>
            <img src={typeof data.image === 'string' ? data.image : data.image.src} className='h-[300px] md:h-[300px] object-cover mx-auto rounded-xl' alt="" />
            <div className='mt-4 space-y-4 flex flex-col justify-between items-start'>
                <div className='py-4 space-y-2'>
                    <h1 className={`font-medium line-clamp-1 ${style.para.fontSize} ${style.para.lineHeight}`}>{data.heading}</h1>
                    <p className={`text-sm line-clamp-3 md:text-md`}>{data.intro}</p>
                </div>
                <Button onClick={handleReadMore} className='text-xs md:text-sm'>Read More -{">"}</Button>
            </div>
        </div>
    )
}

export default Blog