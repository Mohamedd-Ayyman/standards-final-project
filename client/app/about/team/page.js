"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutTeamPage() {
  const contentRef = useRef(null);

  useEffect(() => {
    const elements = gsap.utils.toArray(".fadeUp");

    elements.forEach((elem) => {
      gsap.fromTo(
        elem,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            toggleActions: "play none none reset",
          },
        }
      );
    });
  }, []);

  const teamMembers = [
    {
      name: "Farah Ahmed",
      id: "4230162",
      emoji: "🕵️‍♂️",
    },
    {
      name: "Mohamed Galal",
      id: "1200246",
      emoji: "🫣",
    },
    {
      name: "Menna Hesham",
      id: "1220321",
      emoji: "🎨",
    },
    {
      name: "Mohamed Ayman",
      id: "1200245",
      emoji: "😜",
    },
    {
      name: "Salma Mohamed",
      id: "4230195",
      emoji: "✍️",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-150"></div>
      </div>

      <div className="relative z-10 px-4 py-16" ref={contentRef}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fadeUp">
            <div className="mb-8 inline-block">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 hover:rotate-12 transition-all duration-300 mx-auto">
                <span className="text-5xl">🖐️</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              We Are{" "}
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Team 5
              </span>
            </h1>
            <p className="text-xl text-purple-100 opacity-90 max-w-3xl mx-auto mb-6">
              Just five engineers trying to graduate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 justify-center">
            {teamMembers.map((member, index) => (
              <div key={index} className="fadeUp">
                <div className="bg-[#6B2E9F] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300 transform hover:scale-105 hover:-rotate-1 h-full flex flex-col justify-between text-center group">
                  <div>
                    <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300 inline-block">
                      {member.emoji}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <div className="inline-block bg-white bg-opacity-10 rounded-full px-3 py-1 mb-3 border border-white border-opacity-10">
                      <p className="text-black text-xs tracking-widest">
                        {member.id}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="fadeUp text-center">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
              <h3 className="text-3xl font-bold text-white mb-4 relative z-10">
                Liked our work?
              </h3>

              <div className="inline-block px-10 py-5 bg-white text-purple-900 rounded-full text-xl font-bold shadow-xl transform hover:scale-105 transition-all duration-300">
                Give Us an A+ 🎓
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400"></div>
    </div>
  );
}
