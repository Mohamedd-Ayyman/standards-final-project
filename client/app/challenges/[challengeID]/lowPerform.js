"use client";
import React, { useEffect, useRef, useState } from "react";

export default function LowPerformanceAlerts() {
  const contentRef = useRef(null);
  const [activeTab, setActiveTab] = useState("active");

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
      }, 100 + index * 100);
    });
  }, [activeTab]);

  const activeAlerts = [
    {
      id: 1,
      department: "Pediatrics",
      issue: "Hand Hygiene Compliance Below 80%",
      severity: "high",
      compliance: 79,
      trend: "down",
      staffAffected: 8,
      timeDetected: "2 hours ago",
      description: "Department compliance dropped below target threshold",
    },
    {
      id: 2,
      department: "General Ward",
      issue: "Increased Non-Compliance Events",
      severity: "medium",
      compliance: 82,
      trend: "down",
      staffAffected: 12,
      timeDetected: "5 hours ago",
      description: "5 staff members showing repeated non-compliance",
    },
    {
      id: 3,
      department: "Emergency",
      issue: "PPE Usage Gaps Detected",
      severity: "high",
      compliance: 75,
      trend: "stable",
      staffAffected: 6,
      timeDetected: "1 day ago",
      description: "Incomplete PPE usage during high-risk procedures",
    },
    {
      id: 4,
      department: "Surgery",
      issue: "Late Audit Submissions",
      severity: "low",
      compliance: 88,
      trend: "stable",
      staffAffected: 3,
      timeDetected: "2 days ago",
      description: "Audit forms submitted after deadline",
    },
  ];

  const resolvedAlerts = [
    {
      id: 5,
      department: "ICU",
      issue: "Hand Hygiene Compliance Below 85%",
      resolvedDate: "Dec 5, 2024",
      resolution: "Additional training session conducted",
      finalCompliance: 92,
    },
    {
      id: 6,
      department: "Maternity",
      issue: "Equipment Sterilization Delays",
      resolvedDate: "Dec 3, 2024",
      resolution: "Process workflow optimized",
      finalCompliance: 91,
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 fadeUp">
            <div className="mb-6 inline-block">
              <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300 mx-auto animate-pulse">
                <span className="text-5xl">🔔</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Low Performance{" "}
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Alerts
              </span>
            </h1>
            <p className="text-xl text-white opacity-90">
              Proactive monitoring and immediate notifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 fadeUp">
            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border-2 border-red-400 border-opacity-30 hover:bg-opacity-25 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl">🚨</div>
                <div className="text-red-400 text-xl font-bold">HIGH</div>
              </div>
              <div className="text-white opacity-70 text-sm mb-1">
                Critical Alerts
              </div>
              <div className="text-4xl font-bold text-white">2</div>
              <div className="text-red-400 text-sm mt-2">
                Require immediate action
              </div>
            </div>

            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border-2 border-yellow-400 border-opacity-30 hover:bg-opacity-25 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl">⚠️</div>
                <div className="text-yellow-400 text-xl font-bold">MED</div>
              </div>
              <div className="text-white opacity-70 text-sm mb-1">
                Medium Priority
              </div>
              <div className="text-4xl font-bold text-white">1</div>
              <div className="text-yellow-400 text-sm mt-2">
                Action needed within 24h
              </div>
            </div>

            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border-2 border-blue-400 border-opacity-30 hover:bg-opacity-25 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl">ℹ️</div>
                <div className="text-blue-400 text-xl font-bold">LOW</div>
              </div>
              <div className="text-white opacity-70 text-sm mb-1">
                Low Priority
              </div>
              <div className="text-4xl font-bold text-white">1</div>
              <div className="text-blue-400 text-sm mt-2">
                Monitor and review
              </div>
            </div>

            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border-2 border-green-400 border-opacity-30 hover:bg-opacity-25 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl">✓</div>
                <div className="text-green-400 text-xl">↑</div>
              </div>
              <div className="text-white opacity-70 text-sm mb-1">
                Resolved This Week
              </div>
              <div className="text-4xl font-bold text-white">2</div>
              <div className="text-green-400 text-sm mt-2">
                85% resolution rate
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-8 fadeUp">
            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-full p-2 border border-white border-opacity-20">
              <button
                onClick={() => setActiveTab("active")}
                className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
                  activeTab === "active"
                    ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg"
                    : "text-white hover:bg-white hover:bg-opacity-10"
                }`}
              >
                Active Alerts ({activeAlerts.length})
              </button>
              <button
                onClick={() => setActiveTab("resolved")}
                className={`px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
                  activeTab === "resolved"
                    ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg"
                    : "text-white hover:bg-white hover:bg-opacity-10"
                }`}
              >
                Resolved ({resolvedAlerts.length})
              </button>
            </div>
          </div>

          {activeTab === "active" && (
            <div className="space-y-6 fadeUp">
              {activeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border-2 ${
                    alert.severity === "high"
                      ? "border-red-400"
                      : alert.severity === "medium"
                      ? "border-yellow-400"
                      : "border-blue-400"
                  } border-opacity-30 hover:bg-opacity-25 transition-all`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`text-5xl ${
                          alert.severity === "high" ? "animate-pulse" : ""
                        }`}
                      >
                        {alert.severity === "high"
                          ? "🚨"
                          : alert.severity === "medium"
                          ? "⚠️"
                          : "ℹ️"}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {alert.issue}
                        </h3>
                        <div className="flex items-center gap-4 flex-wrap">
                          <span className="px-3 py-1 bg-white bg-opacity-10 backdrop-blur-sm rounded-full text-white text-sm">
                            🏥 {alert.department}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              alert.severity === "high"
                                ? "bg-red-500 bg-opacity-20 text-red-400 border border-red-400 border-opacity-30"
                                : alert.severity === "medium"
                                ? "bg-yellow-500 bg-opacity-20 text-yellow-400 border border-yellow-400 border-opacity-30"
                                : "bg-blue-500 bg-opacity-20 text-blue-400 border border-blue-400 border-opacity-30"
                            }`}
                          >
                            {alert.severity.toUpperCase()} PRIORITY
                          </span>
                          <span className="text-white opacity-70 text-sm">
                            ⏱️ {alert.timeDetected}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-white">
                        {alert.compliance}%
                      </div>
                      <div
                        className={`text-sm font-semibold ${
                          alert.trend === "down"
                            ? "text-red-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {alert.trend === "down" ? "↓ Declining" : "→ Stable"}
                      </div>
                    </div>
                  </div>

                  <p className="text-white opacity-80 mb-4">
                    {alert.description}
                  </p>

                  <div className="flex items-center gap-6 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-white opacity-70">
                        👥 Staff Affected:
                      </span>
                      <span className="text-white font-semibold">
                        {alert.staffAffected}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all">
                      Take Action
                    </button>
                    <button className="flex-1 bg-white bg-opacity-10 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-opacity-20 transition-all">
                      View Details
                    </button>
                    <button className="px-6 py-3 bg-white bg-opacity-10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-opacity-20 transition-all">
                      Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "resolved" && (
            <div className="space-y-6 fadeUp">
              {resolvedAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border-2 border-green-400 border-opacity-30 hover:bg-opacity-25 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="text-5xl">✓</div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {alert.issue}
                        </h3>
                        <div className="flex items-center gap-4 flex-wrap">
                          <span className="px-3 py-1 bg-white bg-opacity-10 backdrop-blur-sm rounded-full text-white text-sm">
                            🏥 {alert.department}
                          </span>
                          <span className="px-3 py-1 bg-green-500 bg-opacity-20 text-green-400 rounded-full text-sm font-semibold border border-green-400 border-opacity-30">
                            RESOLVED
                          </span>
                          <span className="text-white opacity-70 text-sm">
                            📅 {alert.resolvedDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-400">
                        {alert.finalCompliance}%
                      </div>
                      <div className="text-sm font-semibold text-green-400">
                        ✓ Compliant
                      </div>
                    </div>
                  </div>

                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-white opacity-70 text-sm mb-2">
                      Resolution:
                    </p>
                    <p className="text-white font-medium">{alert.resolution}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 fadeUp">
            <div className="bg-gradient-to-r from-teal-500 to-green-500 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Alert Management Center
              </h3>
              <p className="text-white opacity-90 text-center mb-6">
                Configure alert thresholds and notification settings
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-teal-900 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl">
                  Alert Settings
                </button>
                <button className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-full font-semibold text-lg hover:bg-white hover:text-teal-900 transform hover:scale-105 transition-all duration-300">
                  Notification Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400"></div>
    </div>
  );
}
