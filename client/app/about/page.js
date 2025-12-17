"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function InfectionControlAboutPage() {
  const contentRef = useRef(null);
  const marqueeRef = useRef(null);
  const messages = [
    "Zero HAI Goal",
    "24/7 Monitoring",
    "Evidence-Based",
    "Proactive Risk Reduction",
    "Data-Driven Prevention",
    "Smart Waste Disposal",
    "Patient-Centered Protection",
    "Infection-Free Future",
  ];
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

    const marquee = marqueeRef.current;
    if (marquee) {
      const speed = 30;
      const width = marquee.scrollWidth / 2;
      gsap.to(marquee, {
        x: -width,
        repeat: -1,
        duration: width / speed,
        ease: "linear",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-green-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-150"></div>
      </div>

      <div className="relative z-10  py-16" ref={contentRef}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fadeUp">
            <div className="mb-8 inline-block">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-green-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300 mx-auto">
                <span className="text-5xl">🏥</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Infection Control &{" "}
              <span className="text-green-400">Prevention</span>
            </h1>
            <p className="text-xl text-teal-100 opacity-90 max-w-3xl mx-auto mb-6">
              Leading the fight against healthcare-associated infections through
              innovation, education, and unwavering commitment to patient safety
            </p>

            <div className="mt-16 py-5 relative overflow-hidden w-screen -mx-[calc((100vw-100%)/2)]">
              <div
                className="flex gap-6 whitespace-nowrap min-w-max"
                ref={marqueeRef}
              >
                {messages.map((text, i) => (
                  <div
                    key={i}
                    className="
          inline-block px-8 py-3 rounded-full 
          bg-white/10 backdrop-blur-xl 
          border border-white/20 
          shadow-[0_0_20px_rgba(255,255,255,0.15)] 
          
          hover:bg-gradient-to-r hover:from-emerald-400/20 hover:to-teal-400/10
          transition-all duration-300
        "
                  >
                    <span className="text-teal-100 font-semibold tracking-wide">
                      {text}
                    </span>
                  </div>
                ))}

                {messages.map((text, i) => (
                  <div
                    key={`dup-${i}`}
                    className="
          inline-block px-8 py-3 rounded-full 
          bg-white/10 backdrop-blur-xl 
          border border-white/20 
          shadow-[0_0_20px_rgba(255,255,255,0.15)] 
          
          hover:bg-gradient-to-r hover:from-emerald-400/20 hover:to-teal-400/10
          transition-all duration-300
        "
                  >
                    <span className="text-teal-100 font-semibold tracking-wide">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="fadeUp mb-8">
            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300">
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="text-6xl">🛡️</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Our Mission
                  </h2>
                </div>
                <p className="text-lg text-teal-100 leading-relaxed max-w-4xl mx-auto opacity-90">
                  To eliminate preventable healthcare-associated infections
                  through comprehensive surveillance, rigorous adherence to
                  evidence-based practices, and fostering a culture where every
                  team member is empowered to be a champion of patient safety.
                  We strive to set the gold standard in infection prevention,
                  ensuring that every patient receives care in the safest
                  possible environment.
                </p>
              </div>
            </div>
          </div>

          <div className="fadeUp mb-8">
            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-6xl flex-shrink-0">📋</div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <span className="text-green-400">✓</span>
                    What We Do
                  </h2>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-teal-100 text-lg">
                    <span className="text-green-400 mt-1 text-2xl flex-shrink-0">
                      •
                    </span>
                    <span className="opacity-90">
                      Conduct comprehensive surveillance of all
                      healthcare-associated infections across hospital units
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-teal-100 text-lg">
                    <span className="text-green-400 mt-1 text-2xl flex-shrink-0">
                      •
                    </span>
                    <span className="opacity-90">
                      Investigate and contain infectious disease outbreaks with
                      rapid response protocols
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-teal-100 text-lg">
                    <span className="text-green-400 mt-1 text-2xl flex-shrink-0">
                      •
                    </span>
                    <span className="opacity-90">
                      Develop and enforce policies based on CDC guidelines and
                      current evidence
                    </span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-teal-100 text-lg">
                    <span className="text-green-400 mt-1 text-2xl flex-shrink-0">
                      •
                    </span>
                    <span className="opacity-90">
                      Provide ongoing education and training to all healthcare
                      personnel
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-teal-100 text-lg">
                    <span className="text-green-400 mt-1 text-2xl flex-shrink-0">
                      •
                    </span>
                    <span className="opacity-90">
                      Monitor hand hygiene compliance and environmental
                      cleanliness standards
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-teal-100 text-lg">
                    <span className="text-green-400 mt-1 text-2xl flex-shrink-0">
                      •
                    </span>
                    <span className="opacity-90">
                      Collaborate with multidisciplinary teams to optimize
                      patient care safety
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="fadeUp mb-8">
            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-6xl flex-shrink-0">🎯</div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <span className="text-green-400">✓</span>
                    Core Focus Areas
                  </h2>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-teal-700 to-teal-900 bg-opacity-5 rounded-xl p-6 border border-white border-opacity-10">
                  <h3 className="font-bold text-xl text-green-400 mb-3">
                    Central Line Infections (CLABSI)
                  </h3>
                  <p className="text-teal-100 opacity-90">
                    Prevention through sterile insertion techniques and
                    maintenance bundles
                  </p>
                </div>
                <div className="bg-gradient-to-r from-teal-700 to-teal-900 bg-opacity-10 rounded-xl p-6 border border-white border-opacity-10">
                  <h3 className="font-bold text-xl text-green-400 mb-3">
                    Surgical Site Infections (SSI)
                  </h3>
                  <p className="text-teal-100 opacity-90">
                    Optimization of perioperative care and antimicrobial
                    prophylaxis
                  </p>
                </div>
                <div className="bg-gradient-to-r from-teal-700 to-teal-900 bg-opacity-10 rounded-xl p-6 border border-white border-opacity-10">
                  <h3 className="font-bold text-xl text-green-400 mb-3">
                    Catheter-Associated UTI (CAUTI)
                  </h3>
                  <p className="text-teal-100 opacity-90">
                    Early catheter removal strategies and appropriate insertion
                    criteria
                  </p>
                </div>
                <div className="bg-gradient-to-r from-teal-700 to-teal-900 bg-opacity-10 rounded-xl p-6 border border-white border-opacity-10">
                  <h3 className="font-bold text-xl text-green-400 mb-3">
                    Ventilator Pneumonia (VAP)
                  </h3>
                  <p className="text-teal-100 opacity-90">
                    Evidence-based ventilator care bundles and oral care
                    protocols
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="fadeUp">
              <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-6 border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300 transform hover:scale-[1.02] h-full">
                <div className="text-center">
                  <div className="text-5xl mb-4">💉</div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Antimicrobial Stewardship
                  </h3>
                  <p className="text-teal-100 text-sm leading-relaxed opacity-90">
                    Optimizing antibiotic use to improve patient outcomes while
                    reducing resistance and unnecessary costs through
                    collaborative clinical review
                  </p>
                </div>
              </div>
            </div>

            <div className="fadeUp">
              <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-6 border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300 transform hover:scale-[1.02] h-full">
                <div className="text-center">
                  <div className="text-5xl mb-4">🧪</div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Environmental Safety
                  </h3>
                  <p className="text-teal-100 text-sm leading-relaxed opacity-90">
                    Rigorous environmental cleaning protocols, terminal
                    disinfection procedures, and validation of cleaning
                    effectiveness in patient care areas
                  </p>
                </div>
              </div>
            </div>

            <div className="fadeUp">
              <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-6 border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300 transform hover:scale-[1.02] h-full">
                <div className="text-center">
                  <div className="text-5xl mb-4">🩺</div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Isolation Protocols
                  </h3>
                  <p className="text-teal-100 text-sm leading-relaxed opacity-90">
                    Transmission-based precautions for infectious patients
                    including contact, droplet, and airborne isolation to
                    protect staff and other patients
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="fadeUp mb-8">
            <div className="bg-gradient-to-r from-teal-500 to-green-500 rounded-3xl p-8 md:p-10 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Our Impact by the Numbers
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    98.5%
                  </div>
                  <p className="text-teal-100 text-sm opacity-90">
                    Hand Hygiene Compliance
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    45%
                  </div>
                  <p className="text-teal-100 text-sm opacity-90">
                    Reduction in HAIs
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    24/7
                  </div>
                  <p className="text-teal-100 text-sm opacity-90">
                    Active Surveillance
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    100%
                  </div>
                  <p className="text-teal-100 text-sm opacity-90">
                    Staff Training Coverage
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="fadeUp mb-8">
            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="text-6xl">👥</div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Our Expert Team
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-green-400 mb-4">
                    Leadership
                  </h3>
                  <p className="text-teal-100 leading-relaxed opacity-90">
                    Our infection prevention program is led by board-certified
                    infection preventionists with advanced degrees in
                    epidemiology, nursing, and public health. Each brings
                    extensive clinical experience and specialized training in
                    healthcare epidemiology.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-400 mb-4">
                    Multidisciplinary Collaboration
                  </h3>
                  <p className="text-teal-100 leading-relaxed opacity-90">
                    We work closely with infectious disease physicians, clinical
                    microbiologists, pharmacy, environmental services, nursing
                    leadership, and quality improvement teams to ensure
                    comprehensive infection prevention across all care settings.
                  </p>
                </div>
              </div>
              <div className="mt-6 p-6 bg-gradient-to-r from-teal-700 to-green-700 bg-opacity-5 rounded-xl border border-white border-opacity-10">
                <p className="text-teal-100 text-center italic opacity-90">
                  "Every member of our healthcare team plays a vital role in
                  preventing infections. Together, we create a culture of safety
                  that protects our most vulnerable patients."
                </p>
              </div>
            </div>
          </div>

          <div className="fadeUp text-center">
            <div className="bg-gradient-to-r from-teal-500 to-green-500 rounded-3xl p-8 md:p-12 shadow-2xl">
              <h3 className="text-3xl font-bold text-white mb-4">
                Our Commitment to Excellence
              </h3>
              <p className="text-teal-100 text-lg mb-6 opacity-90">
                Working together to achieve zero preventable
                healthcare-associated infections
              </p>
              <div className="inline-block px-10 py-5 bg-white text-teal-900 rounded-full text-xl font-bold shadow-xl transform hover:scale-101 transition-all duration-300">
                Committed to Zero Preventable Infections
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-green-400 to-blue-400"></div>
    </div>
  );
}
