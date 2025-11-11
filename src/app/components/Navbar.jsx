import { navlinks } from '@/data'
import Link from 'next/link'
import React from 'react'
import Button from './Button'
import logo from "@/assets/logo.png"

const Navbar = () => {
    return (
        <div className='flex justify-center'>
            <div className='py-5 flex justify-between items-center w-[80%] mx-auto'>
                <div>
                    <img src={logo.src} className='h-[100px]' alt="" />
                </div>
                <div className='flex gap-10 items-center'>
                    {
                        navlinks.map((link) => (
                            <Link className='px-2' key={link.name} href={link.href}>
                                {link.name}
                            </Link>
                        ))
                    }
                    <Button>Login</Button>
                </div>
            </div>
        </div>
    )
}

export default Navbar