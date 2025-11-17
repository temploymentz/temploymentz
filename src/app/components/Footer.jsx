import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import logoBG from "@/assets/logoBG.png"

const Footer = () => {
    const companyLinks = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Blogs', href: '/blogs' },
        { name: 'Contacts', href: '/contact' },
    ]

    const socialLinks = [
        { name: 'Instagram', href: 'https://www.instagram.com/temploymentz/' },
        { name: 'Facebook', href: 'https://www.facebook.com/1dayjobs' },
        { name: 'WhatsApp', href: 'https://www.whatsapp.com/channel/0029VbBVmJrIt5rsOGpXZk3D' },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/company/82350285/' },
    ]

    return (
        <div className='p-2 xl:p-0 bg-[#fcf103]'>
            <div className='mx-auto w-[85%] xl:w-[90%]'>
                <div className='py-20 flex flex-col lg:flex-row justify-between gap-10 xl:gap-5 border-b-gray-400'>
                    <div className='space-y-2 xl:space-y-5'>
                        <img src={logoBG.src} className='object-contain h-[120px]' alt="" />
                    </div>
                    <div className='lg:w-3/4 flex flex-col gap-10 lg:flex-row justify-between'>
                        <div className='mt-5 xl:mt-0 '>
                            <ul className='space-y-3 xl:space-y-5 lg:text-xl'>
                                <h1 className='font-bold text-xl lg:text-2xl'>Company</h1>
                                {companyLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className='hover:underline hover:text-blue-600 transition-colors'>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='lg:w-1/2'>
                            <ul className='space-y-3 xl:space-y-5 lg:text-xl'>
                                <h1 className='font-bold text-xl lg:text-2xl'>Contact Info</h1>
                                <li>No.7, 1st Floor, Venkata Hanumaiah Building, Jnanabharathi Main Road, Near Madduramma Temple, Naagarabhaavi, Bengaluru, Karnataka – 560072</li>
                                <li>Info@temploymentz.com</li>
                                <li>+91 7406207776 | +91 9620885201</li>
                            </ul>
                        </div>
                        <div className='w-1/4'>
                            <ul className='space-y-3 xl:space-y-5 lg:text-xl'>
                                <h1 className='font-bold text-xl lg:text-2xl'>Follow Us</h1>
                                {socialLinks.map((link) => (
                                    <li key={link.name}>
                                        <a 
                                            href={link.href} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className='hover:underline hover:text-blue-600 transition-colors'
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
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