import Blog from '@/app/blogs/_components/Blog';
import { blogData } from '@/data';
import Link from 'next/link';
import Button from './Button';

async function getBlogs() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const apiUrl = `${baseUrl}/api/blogs`;
    console.log('📡 Fetching blogs from:', apiUrl);
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 60 }, // Cache for 60 seconds
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Blogs fetched from API:', data.length, 'blogs');
      return data;
    } else {
      console.warn('API returned status:', response.status);
    }
  } catch (error) {
    console.error('❌ Error fetching blogs:', error.message);
  }
  
  // Fallback to static data if API fails
  console.log('⚠️ Falling back to static blog data');
  return blogData;
}

export default async function BlogsSection() {
  const blogs = await getBlogs();
  console.log('Blogs fetched:', blogs);
  const { style } = require('@/styles');

  if (!blogs || blogs.length === 0) {
    return <div>No blogs available</div>;
  }

  const firstBlog = blogs[0];
  const imageUrl = typeof firstBlog.image === 'string' ? firstBlog.image : firstBlog.image.src;

  return (
    <div className='w-[85%] md:w-[80%] mx-auto flex flex-col justify-center items-center py-10 md:py-20 gap-10'>
      {/* Header */}
      <div className='`gap-5 md:gap-0 text-center justify-between w-full'>
        <h1 className={`text-blue-600 ${style.minHeader.fontSize} ${style.minHeader.lineHeight} ${style.minHeader.fontWeight}`}>Blogs <span className='text-[#493f4a]'>|</span>  <span className='text-yellow-500'>Resources</span> </h1>
      </div>

      {/* Featured Blog - First Blog */}
      <div className='w-full'>
        <div style={{ backgroundColor: style.lightBG.backgroundColor }} className='flex flex-col lg:flex-row items-center justify-between md:px-5 md:gap-10 border rounded-xl'>
          <div className='p-5 w-full lg:w-1/2'>
            <img src={imageUrl} className='h-[300px] md:h-[300px] object-cover mx-auto rounded-xl' alt="" />
          </div>
          <div className='space-y-3 pb-5 px-5 lg:w-1/2'>
            <h1 className={`font-medium line-clamp-2 ${style.para.fontSize} ${style.para.lineHeight}`}>{firstBlog.heading}</h1>
            <p className={`text-sm line-clamp-3 md:text-md`}>{firstBlog.intro}</p>
            <Link href={`/blogs/${firstBlog._id}`}>
              <Button className='text-xs md:text-sm'>Read More -{">"}</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Rest of Blogs - Grid */}
      <div className='w-full'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-10'>
          {
            blogs.map((ele, idx) => {
              if (idx === 0) return null; // Skip first blog as it's displayed above
              return <Blog index={idx} key={ele._id || idx} data={ele} />
            })
          }
        </div>
      </div>
    </div>
  );
}
