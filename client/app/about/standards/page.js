"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutStandardsPage() {
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

  const standards = [
    {
      icon: "🏅",
      title: "ISO 9001:2015",
      subtitle: "Quality Management System",
      description:
        "International standard for quality management systems that helps organizations ensure they meet customer and regulatory requirements while continually improving their processes.",
      keyPoints: [
        "Customer focus and satisfaction",
        "Leadership and strategic direction",
        "Process approach to management",
        "Continuous improvement culture",
        "Evidence-based decision making",
      ],
    },
    {
      icon: "🏥",
      title: "ISO 15189:2012",
      subtitle: "Medical Laboratories Requirements",
      description:
        "Specifies requirements for quality and competence in medical laboratories, ensuring accurate and reliable test results for patient care.",
      keyPoints: [
        "Technical competence requirements",
        "Quality management system",
        "Personnel qualifications",
        "Equipment validation",
        "Quality control procedures",
      ],
    },
    {
      icon: "🦠",
      title: "WHO IPC Framework",
      subtitle: "Infection Prevention and Control",
      description:
        "World Health Organization's comprehensive framework for implementing infection prevention and control programs in healthcare facilities.",
      keyPoints: [
        "IPC program management",
        "Guidelines and standard precautions",
        "Education and training",
        "Surveillance systems",
        "Multimodal strategies",
      ],
    },
    {
      icon: "🔬",
      title: "CDC Guidelines",
      subtitle: "Centers for Disease Control",
      description:
        "Evidence-based recommendations for infection prevention in healthcare settings, providing scientific guidance for best practices.",
      keyPoints: [
        "Hand hygiene protocols",
        "PPE usage guidelines",
        "Environmental infection control",
        "Disinfection and sterilization",
        "Healthcare-associated infection prevention",
      ],
    },
    {
      icon: "⚕️",
      title: "JCI Standards",
      subtitle: "Joint Commission International",
      description:
        "Global healthcare accreditation standards that focus on patient safety, quality of care, and continuous improvement.",
      keyPoints: [
        "Patient-centered care",
        "Medication management",
        "Infection prevention and control",
        "Governance and leadership",
        "Facility management and safety",
      ],
    },
    {
      icon: "🇪🇬",
      title: "Egyptian MOH Standards",
      subtitle: "Ministry of Health Requirements",
      description:
        "National healthcare standards and regulations specific to Egypt, ensuring compliance with local healthcare requirements.",
      keyPoints: [
        "National accreditation criteria",
        "Healthcare facility licensing",
        "Quality assurance programs",
        "Patient safety protocols",
        "Healthcare workforce standards",
      ],
    },
  ];

  const complianceAreas = [
    {
      icon: "📋",
      title: "Documentation & Records",
      points: [
        "Standard Operating Procedures",
        "Quality control documentation",
        "Audit trails and reports",
        "Training records",
      ],
    },
    {
      icon: "👨‍⚕️",
      title: "Personnel & Training",
      points: [
        "Competency assessments",
        "Continuing education",
        "Certification requirements",
        "Performance evaluations",
      ],
    },
    {
      icon: "🔍",
      title: "Monitoring & Surveillance",
      points: [
        "Regular audits and inspections",
        "Performance indicators tracking",
        "Corrective action processes",
        "Risk management",
      ],
    },
    {
      icon: "✅",
      title: "Continuous Improvement",
      points: [
        "PDCA cycle implementation",
        "Root cause analysis",
        "Best practice adoption",
        "Feedback mechanisms",
      ],
    },
  ];

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
            <div className="mb-8 inline-block">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-green-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300 mx-auto">
                <span className="text-5xl">📜</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Healthcare <span className="text-green-400">Standards</span>
            </h1>
            <p className="text-xl text-teal-100 opacity-90 max-w-3xl mx-auto mb-6">
              Our commitment to excellence through international and national
              healthcare quality standards
            </p>
          </div>

          <div className="fadeUp mb-16">
            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-white border-opacity-20">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-green-400">✓</span>
                Why Standards Matter
              </h2>
              <p className="text-teal-100 text-lg leading-relaxed opacity-90 mb-4">
                Healthcare standards provide a framework for delivering safe,
                effective, and high-quality patient care. By adhering to
                internationally recognized standards and local regulations, we
                ensure:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-2xl">•</span>
                  <span className="text-teal-100 opacity-90">
                    Consistent quality of care across all departments
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-2xl">•</span>
                  <span className="text-teal-100 opacity-90">
                    Patient safety and risk reduction
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-2xl">•</span>
                  <span className="text-teal-100 opacity-90">
                    Regulatory compliance and accreditation
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-2xl">•</span>
                  <span className="text-teal-100 opacity-90">
                    Continuous improvement and operational excellence
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 mb-16">
            {standards.map((standard, index) => (
              <div key={index} className="fadeUp">
                <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-6xl flex-shrink-0">
                      {standard.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {standard.title}
                      </h3>
                      <p className="text-green-400 text-lg font-semibold mb-4">
                        {standard.subtitle}
                      </p>
                      <p className="text-teal-100 opacity-90 leading-relaxed mb-6">
                        {standard.description}
                      </p>
                      <div className="space-y-2">
                        <p className="text-white font-semibold mb-3">
                          Key Components:
                        </p>
                        {standard.keyPoints.map((point, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 text-teal-100"
                          >
                            <span className="text-green-400 mt-1 text-xl">
                              •
                            </span>
                            <span className="opacity-90">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="fadeUp mb-16">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">
              Our Compliance Framework
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {complianceAreas.map((area, index) => (
                <div
                  key={index}
                  className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-25 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">{area.icon}</div>
                    <h3 className="text-xl font-bold text-white">
                      {area.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {area.points.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-teal-100 opacity-90"
                      >
                        <span className="text-green-400 mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="fadeUp text-center">
            <div className="bg-gradient-to-r from-teal-500 to-green-500 rounded-3xl p-8 md:p-12 shadow-2xl">
              <h3 className="text-3xl font-bold text-white mb-4">
                Committed to Excellence
              </h3>
              <p className="text-teal-100 text-lg mb-6 opacity-90">
                Our adherence to these standards ensures the highest level of
                care and safety for our patients
              </p>
              <div className="inline-block px-10 py-5 bg-white text-teal-900 rounded-full text-xl font-bold shadow-xl transform hover:scale-105 transition-all duration-300">
                Standards-Driven Quality Care
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-green-400 to-blue-400"></div>
    </div>
  );
}
