"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";

export default function ChallengesPage() {
  const contentRef = useRef(null);

  useEffect(() => {
    const elements = contentRef.current?.querySelectorAll(".fadeUp");
    if (!elements) return;

    Array.from(elements).forEach((element, index) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(40px)";
      element.style.transition = "opacity 0.8s ease, transform 0.8s ease";

      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, 100 + index * 150);
    });
  }, []);

  const challenges = [
    {
      id: 1,
      challenge: {
        title: "Hand Hygiene Compliance Tracking",
        icon: "🧼",
        iconBg: "from-red-400 to-red-600",
        borderColor: "border-red-400",
        accentColor: "text-red-300",
        description:
          "Despite training, hospitals typically achieve only 65–70% compliance, far below the WHO target. Audits are often inconsistent, incomplete, and done on paper, leaving Infection Control teams unable to identify high-risk units or peak non-compliance times.",
        problems: [
          {
            icon: "👩‍⚕️",
            title: "Staff missing critical hand hygiene steps",
            subtitle: "Average compliance: 65-70%",
          },
          {
            icon: "📋",
            title: "Manual audit forms with errors",
            subtitle: "Delayed feedback loops",
          },
          {
            icon: "❌",
            title: "No real-time tracking",
            subtitle: "Missed opportunities for improvement",
          },
        ],
      },
      solution: {
        title: "Electronic Audit Form",
        icon: "✅",
        iconBg: "from-blue-400 to-blue-600",
        borderColor: "border-blue-400",
        accentColor: "text-blue-300",
        description:
          "A fast, mobile-friendly digital form that captures WHO's 7-step hand hygiene protocol with instant validation and PDF export capabilities.",
        features: [
          {
            icon: "📱",
            title: "Mobile-Friendly Interface",
            subtitle: "Fill forms on any device",
          },
          {
            icon: "✓",
            title: "WHO 7-Step Checklist",
            subtitle: "Guided compliance tracking",
          },
          {
            icon: "📊",
            title: "Real-time Compliance Calculation",
            subtitle: "Instant feedback on performance",
          },
          {
            icon: "📄",
            title: "PDF Report Generation",
            subtitle: "Professional audit documentation",
          },
        ],
        gradient: "from-blue-500 to-teal-500",
      },
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
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center fadeUp">
            <div className="mb-6 inline-block">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-green-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300 mx-auto">
                <span className="text-5xl">🏥</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Hospital Infection Control{" "}
              <span className="bg-gradient-to-r from-teal-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
                Challenges
              </span>
            </h1>
            <p className="text-xl text-white opacity-90 leading-relaxed max-w-3xl mx-auto">
              Modern hospitals face critical operational challenges in infection
              control. Explore the two biggest problems and their innovative
              digital solutions.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto space-y-16">
          {challenges.map((item, index) => (
            <div key={item.id} className="fadeUp">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div
                  className={`bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border-2 ${item.challenge.borderColor} border-opacity-30 shadow-lg`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${item.challenge.iconBg} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}
                    >
                      {item.challenge.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-white">
                      Challenge #{index + 1}
                    </h2>
                  </div>

                  <h3
                    className={`text-2xl font-bold ${item.challenge.accentColor} mb-4`}
                  >
                    {item.challenge.title}
                  </h3>

                  <p className="text-md text-white opacity-90 leading-relaxed mb-6">
                    {item.challenge.description}
                  </p>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white mb-3">
                      Key Problems:
                    </h4>
                    {item.challenge.problems.map((problem, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="text-3xl">{problem.icon}</div>
                        <div>
                          <p className="text-white font-medium">
                            {problem.title}
                          </p>
                          <p className="text-sm text-white opacity-70">
                            {problem.subtitle}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border-2 ${item.solution.borderColor} border-opacity-30 shadow-lg`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${item.solution.iconBg} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}
                    >
                      {item.solution.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-white">Solution</h2>
                  </div>

                  <h3
                    className={`text-2xl font-bold ${item.solution.accentColor} mb-4`}
                  >
                    {item.solution.title}
                  </h3>

                  <p className="text-md text-white opacity-90 leading-relaxed mb-6">
                    {item.solution.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">
                      Key Features:
                    </h4>
                    {item.solution.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="bg-[#3d9071] bg-opacity-10 backdrop-blur-sm rounded-xl p-4 shadow-md hover:bg-opacity-20 transition-all flex items-center gap-3"
                      >
                        <div className="text-2xl">{feature.icon}</div>
                        <div>
                          <p className="font-semibold text-white text-sm">
                            {feature.title}
                          </p>
                          <p className="text-xs text-white opacity-70">
                            {feature.subtitle}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link href="/challenges/electronic-audit">
                    <button
                      className={`w-full bg-gradient-to-r ${item.solution.gradient} text-white rounded-2xl py-4 px-8 font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}
                    >
                      Try Solution →
                    </button>
                  </Link>
                </div>
              </div>

              {index < challenges.length - 1 && (
                <div className="mt-12 mb-8">
                  <div className="bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center justify-center gap-4 text-white flex-wrap">
                      <div className="text-3xl">💡</div>
                      <div className="flex items-center gap-3 text-lg font-semibold">
                        <span>Problem Identified</span>
                        <span className="text-2xl">→</span>
                        <span>Solution Applied</span>
                        <span className="text-2xl">→</span>
                        <span>Compliance Improved</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto mt-20 fadeUp px-4">
          <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 rounded-3xl p-10 shadow-xl">
            <h3 className="text-3xl md:text-4xl font-semibold text-white mb-10 text-center tracking-wide">
              Expected Impact
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="text-4xl mb-4">⚡</div>
                <div className="text-3xl font-bold text-white mb-2">20%</div>
                <p className="text-sm text-white/80">
                  Time Saved on Verification
                </p>
              </div>

              <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="text-4xl mb-4">✓</div>
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <p className="text-sm text-white/80">Digital Documentation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-green-400 to-blue-400"></div>
    </div>
  );
}
