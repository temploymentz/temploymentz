import Testimonials from '@/app/components/Testimonials';
import { testimonialsData } from '@/data';

async function getTestimonials() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const apiUrl = `${baseUrl}/api/testimonials`;
    console.log('📡 Fetching testimonials from:', apiUrl);
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 60 }, // Cache for 60 seconds
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Testimonials fetched from API:', data.length, 'testimonials');
      return data;
    } else {
      console.warn('API returned status:', response.status);
    }
  } catch (error) {
    console.error('❌ Error fetching testimonials:', error.message);
  }
  
  // Fallback to static data if API fails
  console.log('⚠️ Falling back to static testimonials data');
  return testimonialsData.slice(0, 3); // Also limit static data to 3
}

export default async function TestimonialsSection() {
  const testimonials = await getTestimonials();
  console.log(testimonials)
  const { style } = require('@/styles');

  return (
    <div className='w-[85%] md:w-[80%] mx-auto flex flex-col justify-center min-h-[80vh] py-15'>
      <div className='space-y-10'>
        <h1 className={`${style.minHeader.fontSize} text-center md:text-left leading-10 md:leading-14 ${style.minHeader.fontWeight}`}>
          <span className='text-blue-600'>Experiences Shared by</span> <span className='text-yellow-500'>Our Clients</span>
        </h1>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-10 xl:grid-cols-3 justify-between w-full py-10'>
        {
          testimonials.map(ele => <Testimonials key={ele.name || ele._id} data={ele} />)
        }
      </div>
    </div>
  );
}
