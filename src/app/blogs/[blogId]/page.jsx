"use client";

import { blogData } from "@/data";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const BlogPage = () => {
    const { blogId } = useParams();
    const router = useRouter();
    const blog = blogData[blogId-1];

    if (!blog) return <div className="p-10 text-xl">Blog not found</div>;

    return (
        <div className="w-full flex justify-center mt-10 px-4">
            <div className="w-[90%] lg:w-[70%] mx-auto">

                <div className="py-5 flex justify-end">
                    <button
                        onClick={() => router.push("/blogs")}
                        className="text-xs lg:text-sm mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium"
                    >
                        ← Go Back
                    </button>
                </div>

                {/* TITLE */}
                <h1 className="text-blue-600 text-2xl md:text-4xl font-bold leading-tight text-center">
                    {blog.heading}
                </h1>

                <h1 className="text-gray-700 mt-3 leading-relaxed text-[15px] py-3">
                    {blog.intro}
                </h1>

                {/* KEYPOINTS */}
                {blog.points && blog.points.length > 0 && (
                    <div className="mt-10 bg-gray-100 p-5 rounded-xl shadow-sm">
                        <h2 className="text-xl font-semibold mb-3">Key Points</h2>
                        <ul className="list-disc ml-5 space-y-1">
                            {blog.points.map((p, i) => (
                                <li key={i} className="text-gray-700 text-[15px] capitalize">{p}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* MAIN CONTENT */}
                <div className="mt-15 space-y-10">
                    {blog.content.map((section, index) => (
                        <div key={index} className="border-b pb-10">
                            <h2 className="text-2xl font-semibold mb-4">
                                {section.subheading}
                            </h2>

                            {section.points && section.points.length > 0 && (
                                <ul className="list-disc ml-5 space-y-2 text-gray-700 leading-relaxed">
                                    {section.points.map((point, idx) => (
                                        <li key={idx} className="text-[15px]">{point}</li>
                                    ))}
                                </ul>
                            )}

                            {section.text && (
                                <p className="text-gray-700 mt-3 leading-relaxed text-[15px]">
                                    {section.text}
                                </p>
                            )}

                        </div>
                    ))}
                </div>

                {/* CONCLUSION SECTION */}
                {blog.conclusion && (
                    <div className="mt-10 p-6 bg-blue-50 rounded-xl shadow-sm border">
                        <h2 className="text-2xl font-semibold mb-3">Conclusion</h2>
                        <p className="text-gray-700 leading-relaxed text-[15px]">
                            {blog.conclusion}
                        </p>
                    </div>
                )}

                {/* 🔙 GO BACK BUTTON */}


            </div>
        </div>
    );
};

export default BlogPage;
