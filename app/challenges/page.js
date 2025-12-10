"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-green-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-150"></div>
      </div>

      <div className="relative z-10 px-4 py-16" ref={contentRef}>
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center fadeUp">
            <div>
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-green-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl">🏥</span>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Hospital Infection Control{" "}
                <span className="bg-gradient-to-r from-teal-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
                  Systems
                </span>
              </h1>
              <p className="text-xl text-white opacity-90 leading-relaxed">
                In modern hospitals, Infection Control teams face increasing
                pressure to reduce HAIs while managing large volumes of data.
                This page outlines the two biggest operational challenges — and
                how our system solves them.
              </p>
            </div>

            <div className="fadeUp">
              <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white border-opacity-20 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#3d9071] bg-opacity-10 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-2xl">
                        🧼
                      </div>
                      <div>
                        <div className="text-xs text-white opacity-70 font-medium">
                          Hand Hygiene Status
                        </div>
                        <div className="text-sm font-semibold text-white">
                          Needs Improvement
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 text-xs bg-red-500 bg-opacity-20 text-white rounded-full">
                      High Priority
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#3d9071] bg-opacity-10 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center text-2xl">
                        📊
                      </div>
                      <div>
                        <div className="text-xs text-white opacity-70 font-medium">
                          HAI Reporting Workflow
                        </div>
                        <div className="text-sm font-semibold text-white">
                          Delayed Noticing
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 text-xs bg-yellow-500 bg-opacity-20 text-white rounded-full">
                      Medium Priority
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#3d9071] bg-opacity-10 rounded-lg p-3 text-center backdrop-blur-sm">
                      <div className="text-2xl mb-1">🏥</div>
                      <div className="text-xs text-white opacity-70">ICU</div>
                      <div className="text-[10px] text-red-300">
                        High Risk Area
                      </div>
                    </div>
                    <div className="bg-[#3d9071] bg-opacity-10 rounded-lg p-3 text-center backdrop-blur-sm">
                      <div className="text-2xl mb-1">🛏️</div>
                      <div className="text-xs text-white opacity-70">Ward</div>
                      <div className="text-[10px] text-yellow-300">
                        Needs Monitoring
                      </div>
                    </div>
                    <div className="bg-[#3d9071] bg-opacity-10 rounded-lg p-3 text-center backdrop-blur-sm">
                      <div className="text-2xl mb-1">🚑</div>
                      <div className="text-xs text-white opacity-70">ER</div>
                      <div className="text-[10px] text-green-300">Stable</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 fadeUp">
            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border-2 border-red-400 border-opacity-30 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  ⚠️
                </div>
                <h2 className="text-3xl font-bold text-white">The Challenge</h2>
              </div>
              <h3 className="text-2xl font-bold text-red-300 mb-4">
                Hand Hygiene Compliance
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-4xl">👩‍⚕️</div>
                  <div>
                    <p className="text-white font-medium">
                      Staff missing critical hand hygiene steps
                    </p>
                    <p className="text-sm text-white opacity-70">
                      Average compliance: 65-70%
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-4xl">📋</div>
                  <div>
                    <p className="text-white font-medium">
                      Manual audit forms with errors
                    </p>
                    <p className="text-sm text-white opacity-70">
                      Delayed feedback loops
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-4xl">❌</div>
                  <div>
                    <p className="text-white font-medium">
                      No real-time tracking
                    </p>
                    <p className="text-sm text-white opacity-70">
                      Missed opportunities for improvement
                    </p>
                  </div>
                </div>
                <h3 className="text-md text-white opacity-90 leading-relaxed">
                  Despite training, hospitals typically achieve only 65–70%
                  compliance, far below the WHO target. Audits are often
                  inconsistent, incomplete, and done on paper, leaving Infection
                  Control teams unable to identify high-risk units or peak
                  non-compliance times.
                </h3>
              </div>
            </div>

            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border-2 border-blue-400 border-opacity-30 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  ✓
                </div>
                <h2 className="text-3xl font-bold text-white">The Solution</h2>
              </div>
              <h3 className="text-2xl font-bold text-blue-300 mb-6">
                Hand Hygiene Monitoring System
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* <Link href="/challenges/solutions?tab=staff"> */}
                <div className="bg-[#3d9071] bg-opacity-10 backdrop-blur-sm rounded-xl p-4 shadow-md hover:bg-opacity-20 transition-all">
                  <div className="text-3xl mb-2">📊</div>
                  <p className="font-semibold text-white text-sm">
                    Staff Compliance Dashboard
                  </p>
                  <p className="text-xs text-white opacity-70 mt-1">
                    Real-time metrics
                  </p>
                </div>
                {/* </Link>
                <Link href="/challenges/solutions?tab=audit"> */}
                <div className="bg-[#3d9071] bg-opacity-10 backdrop-blur-sm rounded-xl p-4 shadow-md hover:bg-opacity-20 transition-all">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="font-semibold text-white text-sm">
                    Electronic Audit Form
                  </p>
                  <p className="text-xs text-white opacity-70 mt-1">
                    Simple & fast
                  </p>
                </div>
                {/* </Link>
                <Link href="/challenges/solutions?tab=reports"> */}
                <div className="bg-[#3d9071] bg-opacity-10 backdrop-blur-sm rounded-xl p-4 shadow-md hover:bg-opacity-20 transition-all">
                  <div className="text-3xl mb-2">📈</div>
                  <p className="font-semibold text-white text-sm">
                    Auto-Generated Reports
                  </p>
                  <p className="text-xs text-white opacity-70 mt-1">
                    Instant insights
                  </p>
                </div>
                {/* </Link>
                <Link href="/challenges/solutions?tab=alerts"> */}
                <div className="bg-[#3d9071] bg-opacity-10 backdrop-blur-sm rounded-xl p-4 shadow-md hover:bg-opacity-20 transition-all">
                  <div className="text-3xl mb-2">🔔</div>
                  <p className="font-semibold text-white text-sm">
                    Low Performance Alerts
                  </p>
                  <p className="text-xs text-white opacity-70 mt-1">
                    Proactive monitoring
                  </p>
                </div>
                {/* </Link> */}
              </div>
            </div>
          </div>

          <div className="mt-8 fadeUp">
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-center gap-4 text-white flex-wrap">
                <div className="text-3xl">💡</div>
                <div className="flex items-center gap-3 text-lg font-semibold">
                  <span>Data Collection</span>
                  <span className="text-2xl">→</span>
                  <span>Visualization</span>
                  <span className="text-2xl">→</span>
                  <span>Compliance Boost</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-20 fadeUp">
          <div className="relative">
            <div className="absolute top-1/2 left-2 right-2 h-1 bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 transform -translate-y-1/2"></div>
            <div className="relative flex justify-between items-center">
              <div className="bg-[#2B624E] bg-opacity-30 backdrop-blur-lg rounded-full p-4 shadow-lg border border-white border-opacity-20">
                <div className="text-3xl">📊</div>
              </div>
              <div className="bg-[#2B624E] bg-opacity-30 backdrop-blur-lg rounded-full p-4 shadow-lg border border-white border-opacity-20">
                <div className="text-3xl">🖥️</div>
              </div>
              <div className="bg-[#2B624E] bg-opacity-30 backdrop-blur-lg rounded-full p-4 shadow-lg border border-white border-opacity-20">
                <div className="text-3xl">💡</div>
              </div>
              <div className="bg-[#2B624E] bg-opacity-30 backdrop-blur-lg rounded-full p-4 shadow-lg border border-white border-opacity-20">
                <div className="text-3xl">⚡</div>
              </div>
            </div>
            <div className="flex justify-between mt-4 text-center text-sm font-semibold text-white">
              <span>Data</span>
              <span>Dashboard</span>
              <span>Insights</span>
              <span>Action</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 fadeUp">
            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border-2 border-teal-400 border-opacity-30 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  ⚠️
                </div>
                <h2 className="text-3xl font-bold text-white">The Challenge</h2>
              </div>
              <h3 className="text-2xl font-bold text-orange-300 mb-4">
                HAI Reporting Delays
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-4xl">👩‍⚕️</div>
                  <div>
                    <p className="text-white font-medium">
                      Nurses delaying paperwork
                    </p>
                    <p className="text-sm text-white opacity-70">
                      Busy schedules lead to late reports
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-4xl">📅</div>
                  <div>
                    <p className="text-white font-medium">
                      Late HAI notifications
                    </p>
                    <p className="text-sm text-white opacity-70">
                      48-72 hour delays common
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-4xl">🐌</div>
                  <div>
                    <p className="text-white font-medium">
                      Slow outbreak response
                    </p>
                    <p className="text-sm text-white opacity-70">
                      Delayed intervention opportunities
                    </p>
                  </div>
                </div>
                <h3 className="text-md text-white opacity-90 leading-relaxed">
                  Delayed HAI reporting is one of the leading causes of late
                  outbreak detection. Nurses often postpone filling forms due to
                  workload or shift pressure, leading to delays of 48–72 hours
                  in notifying the ICD team. These delays can turn a single
                  infection into a cluster, especially in high-risk units like
                  ICU and NICU.
                </h3>
              </div>
            </div>

            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border-2 border-orange-400 border-opacity-30 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  ✓
                </div>
                <h2 className="text-3xl font-bold text-white">The Solution</h2>
              </div>
              <h3 className="text-2xl font-bold text-teal-300 mb-6">
                HAI Rapid Reporting Portal
              </h3>

              <div className="space-y-3">
                <div className="bg-[#3d9071] bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 shadow-md hover:bg-opacity-20 transition-all flex items-center gap-3">
                  <div className="text-3xl">📝</div>
                  <div>
                    <p className="font-semibold text-white">
                      Quick Digital Form
                    </p>
                    <p className="text-xs text-white opacity-70">
                      Submit in under 2 minutes
                    </p>
                  </div>
                </div>
                <div className="bg-[#3d9071] bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 shadow-md hover:bg-opacity-20 transition-all flex items-center gap-3">
                  <div className="text-3xl">📩</div>
                  <div>
                    <p className="font-semibold text-white">
                      Auto-Notification
                    </p>
                    <p className="text-xs text-white opacity-70">
                      Instant alerts to ICD team
                    </p>
                  </div>
                </div>
                <div className="bg-[#3d9071] bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 shadow-md hover:bg-opacity-20 transition-all flex items-center gap-3">
                  <div className="text-3xl">📊</div>
                  <div>
                    <p className="font-semibold text-white">Tracking Table</p>
                    <p className="text-xs text-white opacity-70">
                      Monitor all submissions
                    </p>
                  </div>
                </div>
                <div className="bg-[#3d9071] bg-opacity-10 backdrop-blur-sm rounded-2xl p-4 shadow-md hover:bg-opacity-20 transition-all flex items-center gap-3">
                  <div className="text-3xl">🔍</div>
                  <div>
                    <p className="font-semibold text-white">Audit Log</p>
                    <p className="text-xs text-white opacity-70">
                      Complete timeliness tracking
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 fadeUp">
            <div className="bg-gradient-to-r from-teal-500 to-green-500 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-center gap-4 text-white flex-wrap mb-6">
                <div className="text-4xl">⚡</div>
                <p className="text-2xl font-bold text-center">
                  Fast Reporting + Automatic Alerts = Improved Outbreak Response
                </p>
              </div>
              <div className="flex justify-center gap-8 text-white flex-wrap">
                <div className="text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <p className="text-sm font-medium">Lightning Fast</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📲</div>
                  <p className="text-sm font-medium">Auto Alerts</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">👥</div>
                  <p className="text-sm font-medium">Team Notified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
