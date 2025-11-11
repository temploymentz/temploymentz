import React from 'react'
import Image from 'next/image';
import logo from "@/assets/logo.png"

const Footer = () => {
    return (
        <div className='bg-[#F9FAFB] p-2 xl:p-0'>
            <div className='mx-auto xl:w-[80%]'>
                <div className='py-20 flex flex-col xl:flex-row justify-between gap-2 xl:gap-5 border-b-gray-400'>
                    <div className='space-y-2 xl:space-y-5'>
                        <img src={logo.src} className='object-contain h-[120px]' alt="" />
                    </div>
                    <div className='mt-5 xl:mt-0'>
                        
                        <ul className='space-y-3 xl:space-y-5'>
                            <h1 className='font-bold text-xl'>Company</h1>
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Blogs</li>
                            <li>Contacts</li>
                        </ul>
                    </div>
                    <div>
                        
                        <ul className='space-y-3 xl:space-y-5'>
                            <h1 className='font-bold text-xl'>Contact Info</h1>
                            <li>Silk St, Barbican, London EC2Y 8DS, UK</li>
                            <li>info@fitnessguru.com</li>
                            <li>800-123-45-678</li>
                        </ul>
                    </div>
                    <div>
    
                        <ul className='space-y-3 xl:space-y-5'>
                            <h1 className='font-bold text-xl'>Follow Us</h1>
                            <li>Instagram</li>
                            <li>Facebook</li>
                            <li>LinkedIn</li>
                            <li>Twitter</li>
                        </ul>
                    </div>
                </div>

                <div className='text-center text-xs xl:text-xl font-medium py-5 border-black border-t w-[50%] mx-auto'>
                    <h1>Copyright @ 2025 Temploymentz , All rights reserved.</h1>
                </div>
            </div>
        </div>
    )
}

export default Footer