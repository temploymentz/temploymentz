"use client";
import React from "react";
import wp from "@/assets/wp.webp";

const Whatsapp = () => {
    return (
        <a
            href="https://whatsapp.com/channel/0029VbBVmJrIt5rsOGpXZk3D"
            target="_blank"
            rel="noopener noreferrer"
        >
            <img
                src={wp.src}
                alt="whatsapp"
                className="fixed bottom-5 right-5 w-14 h-14 cursor-pointer drop-shadow-xl rounded-full float-animation"
            />
        </a>
    );
};

export default Whatsapp;
