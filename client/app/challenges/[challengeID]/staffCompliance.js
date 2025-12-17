"use client";
import React, { useEffect, useRef } from "react";
import { pdf } from "@react-pdf/renderer";
import StaffCompliancePDF from "@/components/StaffCompliancePDF";

export default function StaffComplianceDashboard() {
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
      }, 100 + index * 100);
    });
  }, []);

  const departments = [
    { name: "ICU", compliance: 92, trend: "up", staff: 24 },
    { name: "Emergency", compliance: 85, trend: "up", staff: 18 },
    { name: "Surgery", compliance: 88, trend: "stable", staff: 16 },
    { name: "Pediatrics", compliance: 79, trend: "down", staff: 20 },
    { name: "Maternity", compliance: 91, trend: "up", staff: 15 },
    { name: "General Ward", compliance: 82, trend: "stable", staff: 30 },
  ];

  const recentActivities = [
    {
      time: "10:45 AM",
      user: "Dr. Sarah Ahmed",
      action: "Hand hygiene compliance: 5/5 steps",
      status: "success",
    },
    {
      time: "10:32 AM",
      user: "Nurse John Smith",
      action: "Hand hygiene compliance: 4/5 steps",
      status: "warning",
    },
    {
      time: "10:18 AM",
      user: "Dr. Mona Hassan",
      action: "Hand hygiene compliance: 5/5 steps",
      status: "success",
    },
    {
      time: "10:05 AM",
      user: "Nurse Lisa Brown",
      action: "Hand hygiene compliance: 3/5 steps",
      status: "error",
    },
    {
      time: "09:52 AM",
      user: "Dr. Ahmed Ali",
      action: "Hand hygiene compliance: 5/5 steps",
      status: "success",
    },
  ];

  const handleDownloadPDF = async () => {
    const totalCompliance = departments.reduce(
      (sum, dept) => sum + dept.compliance,
      0
    );
    const overallCompliance = Math.round(totalCompliance / departments.length);

    const blob = await pdf(
      <StaffCompliancePDF
        departments={departments}
        overallCompliance={overallCompliance}
        recentActivities={recentActivities}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "staff_compliance_report.pdf";
    link.click();
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 fadeUp">
            <div className="mb-6 inline-block">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-green-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300 mx-auto">
                <span className="text-5xl">📊</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Staff Compliance{" "}
              <span className="bg-gradient-to-r from-teal-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="text-xl text-white opacity-90">
              Real-time metrics and performance tracking
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 fadeUp">
            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-25 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl">🧼</div>
                <div className="text-green-400 text-xl">↑</div>
              </div>
              <div className="text-white opacity-70 text-sm mb-1">
                Overall Compliance
              </div>
              <div className="text-4xl font-bold text-white">86%</div>
              <div className="text-green-400 text-sm mt-2">
                +3% from last week
              </div>
            </div>

            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-25 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl">👥</div>
                <div className="text-blue-400 text-xl">→</div>
              </div>
              <div className="text-white opacity-70 text-sm mb-1">
                Active Staff
              </div>
              <div className="text-4xl font-bold text-white">123</div>
              <div className="text-white opacity-70 text-sm mt-2">
                Across 6 departments
              </div>
            </div>

            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-25 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl">✓</div>
                <div className="text-green-400 text-xl">↑</div>
              </div>
              <div className="text-white opacity-70 text-sm mb-1">
                Completed Audits
              </div>
              <div className="text-4xl font-bold text-white">842</div>
              <div className="text-green-400 text-sm mt-2">This month</div>
            </div>

            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-25 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl">⚠️</div>
                <div className="text-yellow-400 text-xl">!</div>
              </div>
              <div className="text-white opacity-70 text-sm mb-1">
                Low Performers
              </div>
              <div className="text-4xl font-bold text-white">12</div>
              <div className="text-yellow-400 text-sm mt-2">Need attention</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="fadeUp">
              <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-3xl">🏥</span>
                  Department Performance
                </h2>
                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <div
                      key={index}
                      className="bg-[#096342] border-2 border-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-white font-semibold">
                            {dept.name}
                          </span>
                          <span className="text-xs text-white opacity-70">
                            ({dept.staff} staff)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold">
                            {dept.compliance}%
                          </span>
                          {dept.trend === "up" && (
                            <span className="text-green-400">↑</span>
                          )}
                          {dept.trend === "down" && (
                            <span className="text-red-400">↓</span>
                          )}
                          {dept.trend === "stable" && (
                            <span className="text-yellow-400">→</span>
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            dept.compliance >= 85
                              ? "bg-green-400"
                              : dept.compliance >= 75
                              ? "bg-yellow-400"
                              : "bg-red-400"
                          }`}
                          style={{ width: `${dept.compliance}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="fadeUp">
              <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-3xl">⏱️</span>
                  Recent Activity
                </h2>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="bg-[#096342] border-2 border-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 hover:bg-opacity-15 transition-all"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-white font-semibold text-sm">
                          {activity.user}
                        </span>
                        <span className="text-white opacity-60 text-xs">
                          {activity.time}
                        </span>
                      </div>
                      <p className="text-white opacity-80 text-sm mb-2">
                        {activity.action}
                      </p>
                      <div className="flex items-center gap-2">
                        {activity.status === "success" && (
                          <span className="px-3 py-1 bg-green-500 bg-opacity-20 text-white text-xs rounded-full border border-green-400 border-opacity-30">
                            ✓ Compliant
                          </span>
                        )}
                        {activity.status === "warning" && (
                          <span className="px-3 py-1 bg-yellow-500 bg-opacity-20 text-white text-xs rounded-full border border-yellow-400 border-opacity-30">
                            ⚠ Needs Review
                          </span>
                        )}
                        {activity.status === "error" && (
                          <span className="px-3 py-1 bg-red-500 bg-opacity-20 text-white text-xs rounded-full border border-red-400 border-opacity-30">
                            ✗ Non-Compliant
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="fadeUp text-center">
            <div className="bg-gradient-to-r from-teal-500 to-green-500 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-4">
                Export Reports & Analytics
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleDownloadPDF}
                  className="px-8 py-4 bg-white text-teal-900 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  Download PDF Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
