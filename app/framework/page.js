"use client";
import React, { useEffect, useRef } from "react";

export default function ToBeImplementedPage() {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.opacity = "0";
      textRef.current.style.transform = "translateY(50px)";
      textRef.current.style.transition = "opacity 1s ease, transform 1s ease";

      setTimeout(() => {
        textRef.current.style.opacity = "1";
        textRef.current.style.transform = "translateY(0)";
      }, 200);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-green-900 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-150"></div>
      </div>

      <div className="relative z-10 text-center px-4" ref={textRef}>
        <div className="mb-8 inline-block">
          <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-transform duration-300 mx-auto">
            <span className="text-7xl">⏳</span>
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
          To Be{" "}
          <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Implemented
          </span>
        </h1>

        <p className="text-2xl text-white opacity-75 mb-8">
          This tab is coming soon
        </p>

        <div className="inline-block px-6 py-3 bg-yellow-500 bg-opacity-20 text-yellow-300 rounded-full text-lg font-semibold border border-yellow-500 border-opacity-30 backdrop-blur-sm">
          Under Development
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"></div>
    </div>
  );
}
