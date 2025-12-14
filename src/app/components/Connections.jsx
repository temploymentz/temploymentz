"use client"
import React, { useState } from 'react'
import { style } from '@/styles'
import { signIn, useSession } from "next-auth/react";
import Button from './Button';
import google from "@/assets/google.png"
import { useRouter } from 'next/navigation';

const Connections = ({ data, index }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [showExploreForm, setShowExploreForm] = useState(false);

    const handleLoginClick = () => {
        if (session) {
            // User is logged in - show form
            setShowExploreForm(true);
        } else {
            // User not logged in - redirect to login
            router.push("/login");
        }
    };

    const navigateToLogin = () => {
        if (index === 0) {
            if (session) {
                // User is logged in - show form
                setShowExploreForm(true);
            } else {
                // User not logged in - use Google sign in
                signIn("google", { callbackUrl: "/form" });
            }
        }
    };

    const handleExploreSubmit = () => {
        // Close form and navigate to /form
        setShowExploreForm(false);
        router.push("/form");
    };

    const handleExploreClose = () => {
        setShowExploreForm(false);
    };

    return (
        <>
            <div style={{ backgroundColor: style.lightBG.backgroundColor }} className='text-left p-5 space-y-5 rounded-xl'>
                <div className='flex flex-col justify-between h-full gap-5 items-start pb-4'>
                    <div className='space-y-2 xl:space-y-5'>
                        <img src={data.image.src} className='w-full rounded-xl h-[200px] xl:h-[350px] object-contain mx-auto' alt="" />
                        <h1 className='text-xl xl:text-2xl font-medium pt-4 text-blue-600'>{data.title}</h1>
                        <p className='xl:text-xl'>{data.description}</p>
                    </div>
                    {
                        index === 0 ?
                            <Button onClick={navigateToLogin} className='text-blue-600 font-bold xl:text-xl xl:px-10'>Employer LogIn</Button>
                            :
                            index === 1 ?
                                <Button onClick={handleLoginClick} className='text-blue-600 font-bold xl:text-xl xl:px-10'>Candidate LogIn</Button>
                                :
                                <Button className='xl:text-xl xl:px-10'>Explore</Button>
                    }
                </div>
            </div>

            {/* Explore Form Modal */}
            {showExploreForm && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white rounded-lg p-8 max-w-md w-[90%] space-y-6'>
                        <h2 className='text-2xl font-bold text-blue-600'>Tell Us About You</h2>
                        
                        <div className='space-y-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    What are you looking for?
                                </label>
                                <select className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'>
                                    <option value=''>Select an option</option>
                                    <option value='candidate'>I'm a Candidate</option>
                                    <option value='employer'>I'm an Employer</option>
                                </select>
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Your Name
                                </label>
                                <input 
                                    type='text' 
                                    placeholder='Enter your name' 
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Email Address
                                </label>
                                <input 
                                    type='email' 
                                    placeholder='Enter your email' 
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
                                />
                            </div>
                        </div>

                        <div className='flex gap-4'>
                            <button 
                                onClick={handleExploreClose}
                                className='flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300'
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleExploreSubmit}
                                className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700'
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Connections