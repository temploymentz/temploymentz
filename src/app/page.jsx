import React from 'react'
import Button from './components/Button'
import { style } from '@/styles'
import Connections from './components/Connections'
import WhyChooseUs from './components/WhyChooseUs'
import Testimonials from './components/Testimonials'
import heroSection from "@/assets/heroSection.png"
import whyChooseUs from "@/assets/whyChooseUs.png"
import HireSmarter from './components/HireSmarter'
import { accordianData, connections, testimonialsData, whyChooseUsData1, whyChooseUsData2 } from '@/data'
import AccordNew from './components/AccordNew'
import Link from 'next/link'


export default function Page() {
  return (
    <>
      {/* Elevate Your Page */}
      <div className='border-t-2' style={{ backgroundColor: style.lightBG.backgroundColor }}>
        <div className='py-10 md:py-0 w-[85%] xl:w-[98%] mx-auto flex flex-col md:flex-row justify-between min-h-[80vh] items-center'>
          <div className='md:w-[65%] flex flex-col items-start px-50 space-y-5'>
            <h1 className={`${style.header.fontSize} ${style.header.lineHeight} ${style.header.fontWeight}`}> <span className='text-blue-600'>Elevate your business with trusted</span> <span className='text-yellow-500'> <br />White- Collar gig professionals</span></h1>
            <p className={`xl:text-2xl ${style.para.lineHeight} text-[#493f4a] py-2`}>Temploymentz is India’s leading gig staffing platform, connecting businesses quickly with skilled temporary workers. Find the right talent for single shifts or ongoing contracts with ease. Enjoy fast hiring, compliance, and quality service through our easy-to-use portal. Grow your business or career with Temploymentz</p>
            <Link href={'#login-href'}>
              <Button className='text-5xl px-5 py-3'>Get Started</Button>
            </Link>
          </div>
          <div className='md:w-[50%] flex justify-end'>
            <img src={heroSection.src} className='object-cover mt-10 h-[450px] md:mt-0 md:object-contain md:h-[600px] xl:h-[750px]' alt="" />
          </div>
        </div>
      </div>

      {/* Empowering */}
      <div id='login-href' className='w-[85%] md:w-[80%] mx-auto flex flex-col justify-center min-h-[95vh] items-center pt-20'>
        <div className='space-y-5 text-center'>
          <h1 className={`${style.minHeader.fontSize} leading-9 md:leading-14 ${style.minHeader.fontWeight}`}> <span className='text-blue-600'>Empowering Growth Through </span> <span className='text-yellow-500'>Flexible Work Connections</span></h1>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 py-10'>
            {
              connections.map((ele, idx) => <Connections index={idx} key={ele.title} data={ele} />)
            }
          </div>
        </div>
      </div>

      {/* Connecting */}
      {/* <div style={{ backgroundColor: style.lightBG.backgroundColor }}>
        <div className='w-[85%] md:w-[80%] mx-auto flex justify-center min-h-[50vh] items-center py-10 xl:py-0'>
          <div className='space-y-10 text-center'>
            <h1 className={`${style.minHeader.fontSize} leading-9 md:leading-14 ${style.minHeader.fontWeight}`}>Empowering <span className='text-blue-600'>Businesses</span> & <span className='text-yellow-500'>Professionals</span> in the <br /> New Age of Work </h1>
            <p className={`${style.para.fontSize} ${style.para.lineHeight} font-medium`}>
              Founded in Bangalore, Temploymentz set out to revolutionize temporary staffing across India. Our mission is to create flexible work opportunities for skilled professionals and reliable staffing solutions for organizations. With thousands of success stories, we’re dedicated to compliance, quality, and convenience. Partner with us to transform your workforce and unlock growth, balance, and innovation
            </p>
          </div>
        </div>
      </div> */}

      {/* Accodians */}
      <div className=' py-30 mx-auto flex justify-center min-h-[80vh] items-center'>
        <div className='space-y-10 text-center w-[85%] md:w-[80%]'>
          <h1 className={`${style.minHeader.fontSize} leading-10 md:leading-15 ${style.minHeader.fontWeight}`}> <span className='text-blue-600'>Connecting India’s Leading Industries with</span> <br /> <span className='text-yellow-500'>Skilled Gig Professionals</span></h1>
          <p className={`text-center font-medium md:text-2xl text-gray-600 pb-5`}>
            Explore diverse sectors powered by trusted gig talent. From retail to healthcare, technology to design — Temploymentz bridges the gap between businesses and professionals, delivering flexibility,speed, and expertise to every industry.
          </p>
          <div className='space-y-10'>
            {
              accordianData.map((ele, index) => <AccordNew key={ele.title} data={ele} index={index} />)
            }
          </div>
        </div>
      </div>


      {/* Why Choose Us */}
      <div style={{ backgroundColor: style.lightBG.backgroundColor }}>
        <div className='w-[85%] md:w-[80%] mx-auto flex flex-col justify-center min-h-screen items-center py-15 '>
          <div className='space-y-10 text-center'>
            <div className='flex flex-col gap-7 justify-between'>
              <h1 className={`${style.minHeader.fontSize} leading-10 lg:leading-15 ${style.minHeader.fontWeight}`}> <span className='text-blue-600'>Why Choose </span> <span className='text-yellow-500'>Temploymentz?</span></h1>
              <p className={`xl:text-2xl font-medium ${style.para.lineHeight} text-[#493f4a] pb-2`}>
                Discover a smarter way to hire and work. Temploymentz simplifies staffing with fast hiring, verified professionals, and complete compliance—helping businesses grow confidently and professionals thrive with flexibility.
              </p>
            </div>
          </div>

          <div className='flex flex-col lg:flex-row justify-between w-full py-10 md:mt-10 gap-20'>
            <div className='flex flex-col gap-10'>
              {
                whyChooseUsData1.map(ele => <WhyChooseUs key={ele.title} data={ele} />)
              }
            </div>
            <div className='flex justify-center items-center'>
              <img src={whyChooseUs.src} className='h-[250px] sm:h-[300px] md:w-[1500px] object-contain' alt="" />
            </div>
            <div className='flex flex-col gap-10'>
              {
                whyChooseUsData2.map(ele => <WhyChooseUs key={ele.title} data={ele} />)
              }
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className='w-[85%] md:w-[80%] mx-auto flex flex-col justify-center min-h-[80vh] py-15'>
        <div className='space-y-10'>
          <h1 className={`${style.minHeader.fontSize} text-center md:text-left leading-10 md:leading-14 ${style.minHeader.fontWeight}`}> <span className='text-blue-600'>Experiences Shared by</span> <span className='text-yellow-500'>Our Clients</span></h1>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-10 xl:grid-cols-3 justify-between w-full py-10'>
          {
            testimonialsData.map(ele => <Testimonials key={ele.name} data={ele} />)
          }
        </div>
      </div>

      {/* Elevate Your Page */}
      <HireSmarter />

    </>
  )
} 