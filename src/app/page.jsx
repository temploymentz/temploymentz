import React from 'react'
import Button from './components/Button'
import { style } from '@/styles'
import Connections from './components/Connections'
import Accord from './components/Accord'
import WhyChooseUs from './components/WhyChooseUs'
import Testimonials from './components/Testimonials'

import heroSection from "@/assets/heroSection.png"
import whyChooseUs from "@/assets/whyChooseUs.png"
import hire from "@/assets/hire.png"
import HireSmarter from './components/HireSmarter'
import { accordianData, connections, testimonialsData, whyChooseUsData1, whyChooseUsData2 } from '@/data'
import AccordNew from './components/AccordNew'


export default function Page() {
  return (
    <>
      {/* Elevate Your Page */}
      <div className='border-t-2' style={{ backgroundColor: style.lightBG.backgroundColor }}>
        <div className='w-[80%] mx-auto flex justify-between min-h-[80vh] items-center'>
          <div className='w-[50%] space-y-5'>
            <h1 className={`${style.header.fontSize} ${style.header.lineHeight} ${style.header.fontWeight}`}> <span className='text-blue-600'>Elevate your business with trusted</span> <span className='text-yellow-500'>White- <br /> Collar gig professionals</span></h1>
            <p className={`${style.para.fontSize} ${style.para.lineHeight}`}>Temploymentz is India’s leading gig staffing platform, connecting businesses quickly with skilled temporary workers. Find the right talent for single shifts or ongoing contracts with ease. Enjoy fast hiring, compliance, and quality service through our easy-to-use portal. Grow your business or career with Temploymentz</p>
            <Button>Get Started</Button>
          </div>
          <div className='w-[50%] flex justify-center'>
            <img src={heroSection.src} className='object-contain h-[700px]' alt="" />
          </div>
        </div>
      </div>

      {/* Empowering */}
      <div className='w-[80%] mx-auto flex flex-col justify-center min-h-[95vh] items-center pt-20'>
        <div className='space-y-5 text-center'>
          <h1 className={`${style.minHeader.fontSize} leading-14 ${style.minHeader.fontWeight}`}>Empowering Growth Through Flexible Work <br /> <span className='text-yellow-500'>Connections</span></h1>
          <div className='grid grid-cols-3 gap-x-10 py-20'>
            {
              connections.map((ele) => <Connections key={ele.title} data={ele} />)
            }
          </div>
        </div>
      </div>

      {/* Connecting */}
      <div style={{ backgroundColor: style.lightBG.backgroundColor }}>
        <div className='w-[80%] mx-auto flex justify-center min-h-[50vh] items-center'>
          <div className='space-y-10 text-center'>
            <h1 className={`${style.minHeader.fontSize} leading-14 ${style.minHeader.fontWeight}`}>Empowering <span className='text-blue-600'>Businesses</span> & <span className='text-yellow-500'>Professionals</span> in the <br /> New Age of Work </h1>
            <p className={`${style.para.fontSize} ${style.para.lineHeight} font-medium`}>
              Founded in Bangalore, Temploymentz set out to revolutionize temporary staffing across India. Our mission is to create flexible work opportunities for skilled professionals and reliable staffing solutions for organizations. With thousands of success stories, we’re dedicated to compliance, quality, and convenience. Partner with us to transform your workforce and unlock growth, balance, and innovation
            </p>
          </div>
        </div>
      </div>

      {/* Accodians */}
      <div className='w-[80%] py-30 mx-auto flex justify-center min-h-[80vh] items-center'>
        <div className='space-y-10 text-center'>
          <h1 className={`${style.minHeader.fontSize} leading-15 ${style.minHeader.fontWeight}`}>Connecting India’s Leading Industries with <br /> <span className='text-blue-600'>Skilled Gig Professionals</span></h1>
          <p className={`text-center font-medium text-xl`}>
            Explore diverse sectors powered by trusted gig talent. <br /> From retail to healthcare, technology to design — Temploymentz bridges the gap between businesses and professionals, delivering flexibility, <br /> speed, and expertise to every industry.
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
        <div className='w-[80%] mx-auto flex flex-col justify-center min-h-screen items-center'>
          <div className='space-y-10 text-center'>
            <div className='flex justify-between'>
              <h1 className={`w-1/5 ${style.minHeader.fontSize} leading-15 ${style.minHeader.fontWeight}`}>Why  Choose <span className='text-blue-600'>Temploymentz?</span></h1>
              <p className={`w-3/5 text-left ${style.para.fontSize} font-medium ${style.para.lineHeight}`}>
                Discover a smarter way to hire and work. Temploymentz simplifies staffing with fast hiring, verified professionals, and complete compliance—helping businesses grow confidently and professionals thrive with flexibility.
              </p>
            </div>
          </div>

          <div className='flex justify-between w-full py-10 mt-10 gap-20'>
            <div className='flex flex-col gap-10'>
              {
                whyChooseUsData1.map(ele => <WhyChooseUs key={ele.title} data={ele} />)
              }
            </div>
            <div className='flex justify-center items-center'>
              <img src={whyChooseUs.src} className='w-[950px] object-contain' alt="" />
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
      <div className='w-[80%] mx-auto flex flex-col justify-center min-h-[80vh]'>
        <div className='space-y-10'>
          <h1 className={`${style.minHeader.fontSize} leading-14 ${style.minHeader.fontWeight}`}>Experiences Shared by <br /> <span className='text-blue-600'>Our Clients</span></h1>
        </div>
        <div className='flex justify-between w-full py-20'>
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