"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SOPPage() {
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

  const sops = [
    {
      icon: "🧼",
      title: "SOP 1: Hand Hygiene",
      subtitle: "Steps (WHO 7 steps)",
      items: [
        "Palm to palm",
        "Back of hands",
        "Between fingers",
        "Back of fingers",
        "Thumbs",
        "Fingertips",
        "Wrists",
      ],
      note: "Compliance target: ≥ 85%",
    },
    {
      icon: "🥽",
      title: "SOP 2: PPE Usage",
      items: [
        "When to use mask, gloves, gowns, eye protection",
        "Correct donning & doffing sequence",
        "Disposal guidelines",
      ],
    },
    {
      icon: "🧪",
      title: "SOP 3: Sterilization & Disinfection",
      items: [
        "Cleaning → Disinfection → Sterilization",
        "Autoclave procedures",
        "Chemical disinfectants (concentrations & contact time)",
        "Validation: biological + chemical indicators",
      ],
    },
    {
      icon: "🗑️",
      title: "SOP 4: Waste Management",
      subtitle: "Color-coded waste segregation:",
      colorItems: [
        { color: "bg-yellow-500", text: "Yellow: Infectious waste" },
        { color: "bg-red-500", text: "Red: Sharps" },
        { color: "bg-gray-800", text: "Black: General waste" },
        { color: "bg-blue-500", text: "Blue: Pharmaceutical" },
      ],
    },
    {
      icon: "✨",
      title: "SOP 5: Environmental Cleaning",
      items: [
        "High-touch surfaces cleaning every 4 hours",
        "Terminal cleaning after patient discharge",
        "Use of HEPA filters in ICU",
      ],
    },
    {
      icon: "📊",
      title: "SOP 6: Surveillance System",
      items: [
        "Daily monitoring of HAI indicators",
        "Reporting method: online form → IC committee",
        "Investigation if threshold exceeded",
      ],
    },
    {
      icon: "🚨",
      title: "SOP 7: Outbreak Management",
      items: [
        "Immediate isolation",
        "Activate outbreak control team",
        "Root cause analysis",
        "Full disinfection protocol",
      ],
    },
  ];

  const handleDownload = () => {
    if (typeof window === "undefined") return;

    let content = sops
      .map((sop, index) => {
        let itemsText = sop.items
          ? sop.items.map((i) => `  - ${i}`).join("\n")
          : "";
        let colorItemsText = sop.colorItems
          ? sop.colorItems.map((c) => `  - ${c.text}`).join("\n")
          : "";
        let noteText = sop.note ? `Note: ${sop.note}` : "";
        return `${sop.title}\n${
          sop.subtitle ? sop.subtitle + "\n" : ""
        }${itemsText}${
          colorItemsText ? "\n" + colorItemsText : ""
        }\n${noteText}\n\n`;
      })
      .join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "SOPs.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-green-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-150"></div>
      </div>

      <div className="relative z-10 px-4 py-16" ref={contentRef}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fadeUp">
            <div className="mb-8 inline-block fadeUp">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-green-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300 mx-auto">
                <span className="text-5xl">📋</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight fadeUp">
              Standard Operating Procedures
            </h1>
            <p className="text-xl text-teal-100 fadeUp opacity-90">
              Comprehensive infection control protocols for healthcare safety
            </p>
          </div>

          <div className="space-y-8">
            {sops.map((sop, index) => (
              <div key={index} className="fadeUp">
                <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-6xl flex-shrink-0">{sop.icon}</div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <span className="text-green-400">✓</span>
                        {sop.title}
                      </h2>
                      {sop.subtitle && (
                        <p className="text-teal-100 text-lg font-semibold mt-2">
                          {sop.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {sop.items && (
                    <ul className="space-y-3 mb-4">
                      {sop.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-teal-100 text-lg"
                        >
                          <span className="text-green-400 mt-1 text-2xl flex-shrink-0">
                            •
                          </span>
                          <span className="opacity-90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {sop.colorItems && (
                    <div className="space-y-3 mb-4">
                      {sop.colorItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div
                            className={`w-6 h-6 rounded-full ${item.color} flex-shrink-0`}
                          ></div>
                          <span className="text-teal-100 text-lg opacity-90">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {sop.note && (
                    <div className="mt-6 pt-6 border-t border-white border-opacity-20">
                      <p className="text-green-400 font-semibold text-lg">
                        {sop.note}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center fadeUp">
            <div className="bg-gradient-to-r from-teal-500 to-green-500 rounded-3xl p-8 md:p-12 shadow-2xl">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Implement These SOPs?
              </h3>
              <p className="text-teal-100 text-lg mb-6 opacity-90">
                Download the complete documentation and training materials
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleDownload}
                  className="px-8 py-4 bg-white text-teal-900 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  Download SOPs
                </button>
                <button className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-full font-semibold text-lg hover:bg-white hover:text-teal-900 transform hover:scale-105 transition-all duration-300">
                  View Training
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-green-400 to-blue-400"></div>
    </div>
  );
}
