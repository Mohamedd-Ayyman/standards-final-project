"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroTextRef = useRef(null);

  useEffect(() => {
    gsap.to(".section", {
      backgroundColor: "#000",
      scrollTrigger: {
        trigger: ".section",
        start: "top center",
        scrub: true,
      },
    });
  }, []);
  useEffect(() => {
    gsap.utils.toArray(".fadeUp").forEach((elem) => {
      gsap.from(elem, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elem,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      });
    });
  }, []);

  return (
    <div className="section min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-green-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-150"></div>
      </div>

      <div className="relative z-10 px-4 py-16">
        <div className="max-w-6xl mx-auto text-center mb-20" ref={heroTextRef}>
          <div className="mb-8 inline-block">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-green-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300 mx-auto">
              <span className="text-5xl">🏥</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Building a Safer Hospital Environment Through{" "}
            <span className="bg-gradient-to-r from-teal-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
              Effective Infection Control
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
            Preventing infections • Protecting patients • Improving healthcare
            quality
          </p>
        </div>

        <div className="fadeUp max-w-6xl mx-auto mb-16">
          <div className="bg-[#2B624E] bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white border-opacity-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-green-400">✓</span> Introduction
            </h2>
            <p className="text-[#CCFBF1] text-lg mb-6 leading-relaxed">
              Hospital-acquired infections (HAIs) remain one of the biggest
              threats to patient safety. This Quality Management System (QMS)
              Website presents a full implementation of Infection Control
              Standards based on:
            </p>
            <ul className="text-white text-lg space-y-3 mb-6 pl-6">
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>
                  WHO Infection Prevention and Control (IPC) Framework
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>CDC Guidelines</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>ISO 9001:2015 QMS principles</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>Egyptian Ministry of Health standards</span>
              </li>
            </ul>
            <p className="text-[#CCFBF1] text-lg font-semibold mb-4">
              The website provides:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span className="text-[#CCFBF1]">
                  Full documentation of procedures
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span className="text-[#CCFBF1]">
                  Visual dashboards for infection surveillance
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span className="text-[#CCFBF1]">Monitoring tools</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span className="text-[#CCFBF1]">
                  Audit & reporting structure
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span className="text-[#CCFBF1]">Risk-based approaches</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span className="text-[#CCFBF1]">
                  A real challenge scenario + its resolution
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="fadeUp max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#2B624E] bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400">✓</span> Mission
            </h3>
            <p className="text-[#CCFBF1] leading-relaxed">
              To ensure a safe and infection-free hospital environment through
              standardized quality processes, efficient monitoring, and
              continuous improvement.
            </p>
          </div>

          <div className="fadeUp bg-[#2B624E] bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
            <div className="text-5xl mb-4">👁️</div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400">✓</span> Vision
            </h3>
            <p className="text-[#CCFBF1] leading-relaxed">
              A hospital system where preventable infections are eliminated,
              patient care is safer, and healthcare workers follow modern
              infection control protocols.
            </p>
          </div>

          <div className="fadeUp bg-[#2B624E] bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-green-400">✓</span> Objectives
            </h3>
            <ul className="text-[#CCFBF1] space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1 font-bold">•</span>
                <span className="opacity-90">
                  Reduce HAIs by systematic monitoring
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1 font-bold">•</span>
                <span className="opacity-90">
                  Improve staff compliance with hand hygiene
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1 font-bold">•</span>
                <span className="opacity-90">
                  Standardize cleaning and disinfection
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1 font-bold">•</span>
                <span className="opacity-90">
                  Strengthen reporting and audit culture
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1 font-bold">•</span>
                <span className="opacity-90">
                  Apply QMS tools: PDCA, Root Cause Analysis
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-full font-semibold text-lg hover:from-teal-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
              Explore Documentation
            </button>
            <button className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-full font-semibold text-lg hover:bg-white hover:text-teal-900 transform hover:scale-105 transition-all duration-300">
              View Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-green-400 to-blue-400"></div>
    </div>
  );
}
