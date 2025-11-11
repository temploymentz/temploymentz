"use client";
import { Plus, X } from "lucide-react";
import React, { useState } from "react";

const AccordNew = ({ data, index }) => {
  const [showData, setShowData] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center gap-7 w-full border px-7 py-10 rounded-xl shadow-lg transition-all duration-300">
        <span className="text-orange-500 text-3xl">{index + 1}</span>

        <div className="flex-1 text-left">
          <h3 className="text-2xl font-semibold mb-2">{data.title}</h3>
          <p className="text-gray-600 font-medium text-xl pr-8">{data.desc}</p>
        </div>

        <div
          onClick={() => setShowData((prev) => !prev)}
          className="cursor-pointer transition-transform duration-300 ease-in-out"
        >
          <div
            className={`transform transition-all duration-300 ${
              showData ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
            } absolute`}
          >
            <Plus className="text-blue-600 font-bold h-10 w-10" />
          </div>
          <div
            className={`transform transition-all duration-300 ${
              showData ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"
            }`}
          >
            <X className="text-blue-600 font-bold h-10 w-10" />
          </div>
        </div>
      </div>

      {showData && (
        <div className="mx-auto w-[85%] p-5 space-y-10">
          {data?.roles.map((role, idx) => (
            <div
              key={idx}
              className="shadow-lg flex justify-between items-center gap-7 w-full border px-7 py-10 rounded-xl transition-all duration-300"
            >
              <span className="text-blue-600 text-3xl">{idx + 1}</span>
              <div className="flex-1 text-left">
                <h3 className="text-2xl font-semibold mb-2">{role}</h3>
              </div>
              <button className="px-4 py-2 border border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition">
                Get Quote
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AccordNew;
