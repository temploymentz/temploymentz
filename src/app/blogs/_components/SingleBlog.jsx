"use client";
import Button from '@/app/components/Button'
import { blogData } from '@/data'
import { style } from '@/styles'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SingleBlog = () => {
    const router = useRouter();
    const [firstBlog, setFirstBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFirstBlog = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
                const response = await fetch(`${baseUrl}/api/blogs?admin=false`);
                
                if (response.ok) {
                    const blogs = await response.json();
                    if (blogs.length > 0) {
                        console.log('✅ First blog fetched:', blogs[0].heading);
                        setFirstBlog(blogs[0]);
                    }
                }
            } catch (error) {
                console.error('Error fetching first blog:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFirstBlog();
    }, []);

    const handleReadMore = () => {
        router.push(`/blogs/1`);
    };

    const blog = firstBlog || blogData[0];
    const imageUrl = typeof blog.image === 'string' ? blog.image : blog.image.src;

    return (
        <div className='w-[80%] md:w-[70%] mx-auto flex flex-col justify-center items-center py-5 md:py-15'>
            <div style={{ backgroundColor: style.lightBG.backgroundColor }} className=' flex flex-col lg:flex-row items-center justify-between md:px-5 md:gap-10 border rounded-xl'>
                <div className='p-5 w-full lg:w-1/2'>
                    <img src={imageUrl} className='h-[300px] md:h-[300px] object-cover mx-auto rounded-xl' alt="" />
                </div>
                <div className='space-y-3 pb-5 px-5 lg:w-1/2'>
                    <h1 className={`font-medium line-clamp-2 ${style.para.fontSize} ${style.para.lineHeight}`}>{blog.heading}</h1>
                    <p className={`text-sm line-clamp-3 md:text-md`}>{blog.intro}</p>
                    <Button onClick={handleReadMore} className='text-xs md:text-sm'>Read More -{">"}</Button>
                </div>
            </div>
        </div>
    )
}

export default SingleBlog