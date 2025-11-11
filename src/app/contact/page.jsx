"use client";
import React, { useState } from 'react';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import TeamComponent from '../components/TeamComponent';
import HireSmarter from '../components/HireSmarter';

const page = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        message: ''
    });

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        // Add your form submission logic here
        alert('Message sent successfully!');
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    return (
        <>
            <div className="min-h-[80vh] w-[80%] mx-auto py-20">
                <div className="mx-auto">
                    <div className="flex justify-between">
                        {/* Left Column - Contact Information */}
                        <div className="space-y-12">
                            <div>
                                <h1 className="text-5xl font-medium mb-12">
                                    <span className="text-blue-600">Contact </span>
                                    <span className="text-orange-500">Us</span>
                                </h1>

                                {/* Address Section */}
                                <div className="space-y-4 border-b pb-5">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                                        <div className='space-y-4'>
                                            <h2 className="text-xl font-semibold">Address</h2>
                                            <p className="text-gray-700 font-semibold leading-relaxed">
                                                No.7, 1st Floor, Venkata Hanumaiah Building, Jnanabharathi<br />
                                                Main Road, Near Madduramma Temple, Naagarabhaavi,<br />
                                                Bengaluru, Karnataka – 560072
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Send Us a Message Section */}
                            <div className="space-y-6">
                                <h2 className="text-3xl font-medium text-blue-600">Send Us a Message</h2>
                                <p className="text-gray-700 font-semibold">
                                    Reach out to us for inquiries or support, and we'll respond promptly to assist you
                                </p>

                                {/* Contact Details */}
                                <div className="space-y-4 font-semibold">
                                    <div className="flex items-center gap-3">
                                        <Phone className="text-blue-600" size={24} />
                                        <span className="text-xl text-gray-800">+91 74062 07776</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Mail className="text-blue-600" size={24} />
                                        <span className="text-xl text-gray-800">Sathish@temploymentz.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Contact Form */}
                        <div className="w-1/2 bg-white rounded-lg p-8">
                            <div className="space-y-6">
                                {/* Full Name Field */}
                                <div>
                                    <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Write here..."
                                        rows="6"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    onClick={handleSubmit}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 transition duration-200"
                                >
                                    Send Message
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <TeamComponent />

            <HireSmarter />
        </>
    )
}

export default page