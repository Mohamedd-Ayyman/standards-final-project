"use client";
import React, { useEffect, useRef, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import AuditPDF from "@/components/AuditPDF";

export default function ElectronicAuditForm() {
  const contentRef = useRef(null);
  const [formData, setFormData] = useState({
    department: "",
    auditorName: "",
    staffMember: "",
    handHygieneSteps: {
      palmToPalm: false,
      backOfHands: false,
      betweenFingers: false,
      backOfFingers: false,
      thumbs: false,
      fingertips: false,
      wrists: false,
    },
    ppeUsed: [],
    observations: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
    }

    if (!formData.auditorName.trim()) {
      newErrors.auditorName = "Auditor name is required";
    }

    if (!formData.staffMember.trim()) {
      newErrors.staffMember = "Staff member name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStepChange = (step) => {
    setFormData((prev) => ({
      ...prev,
      handHygieneSteps: {
        ...prev.handHygieneSteps,
        [step]: !prev.handHygieneSteps[step],
      },
    }));
  };

  const handleDownload = async () => {
    if (!validateForm()) {
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        const element = document.getElementById(firstError);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.focus();
        }
      }
      return;
    }

    try {
      const completedSteps = Object.values(formData.handHygieneSteps).filter(
        Boolean
      ).length;
      const complianceRate = Math.round((completedSteps / 7) * 100);

      const blob = await pdf(
        <AuditPDF data={formData} complianceRate={complianceRate} />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `audit_report_${formData.department}_${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setErrors({ general: "Failed to generate PDF. Please try again." });
    } finally {
    }
  };

  const handleReset = () => {
    setFormData({
      department: "",
      auditorName: "",
      staffMember: "",
      handHygieneSteps: {
        palmToPalm: false,
        backOfHands: false,
        betweenFingers: false,
        backOfFingers: false,
        thumbs: false,
        fingertips: false,
        wrists: false,
      },
      ppeUsed: [],
      observations: "",
    });
    setErrors({});
  };

  const handlePPEChange = (item) => {
    setFormData((prev) => ({
      ...prev,
      ppeUsed: prev.ppeUsed.includes(item)
        ? prev.ppeUsed.filter((i) => i !== item)
        : [...prev.ppeUsed, item],
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const completedSteps = Object.values(formData.handHygieneSteps).filter(
    Boolean
  ).length;
  const complianceRate = Math.round((completedSteps / 7) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-green-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-150"></div>
      </div>

      <div className="relative z-10 px-4 py-16" ref={contentRef}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 fadeUp">
            <div className="mb-6 inline-block">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-green-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300 mx-auto">
                <span className="text-5xl">✅</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Electronic Audit{" "}
              <span className="bg-gradient-to-r from-teal-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
                Form
              </span>
            </h1>
            <p className="text-xl text-white opacity-90">
              Simple & fast compliance tracking
            </p>
          </div>

          {errors.general && (
            <div className="fadeUp mb-8">
              <div className="bg-red-500 bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border-2 border-red-400 border-opacity-30">
                <div className="flex items-center gap-3 text-white">
                  <span className="text-4xl">⚠️</span>
                  <div>
                    <p className="font-bold text-lg">{errors.general}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {submitted && (
            <div className="fadeUp mb-8">
              <div className="bg-green-500 bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border-2 border-green-400 border-opacity-30">
                <div className="flex items-center gap-3 text-white">
                  <span className="text-4xl">✓</span>
                  <div>
                    <p className="font-bold text-lg">
                      PDF Report Generated Successfully!
                    </p>
                    <p className="text-sm opacity-80">
                      Your audit report has been downloaded.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="fadeUp">
              <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-3xl">📋</span>
                  Basic Information <span className="text-red-400">*</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div id="department">
                    <label className="block text-white font-semibold mb-2">
                      Department <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) =>
                        handleInputChange("department", e.target.value)
                      }
                      className={`w-full bg-[#2B624E] bg-opacity-10 backdrop-blur-sm border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-400 transition-all ${
                        errors.department
                          ? "border-red-500"
                          : "border-white border-opacity-20"
                      }`}
                    >
                      <option value="" disabled hidden>
                        Select Department
                      </option>
                      <option value="ICU">ICU</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Surgery">Surgery</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Maternity">Maternity</option>
                      <option value="General Ward">General Ward</option>
                    </select>
                    {errors.department && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                        <span>⚠</span> {errors.department}
                      </p>
                    )}
                  </div>

                  <div id="auditorName">
                    <label className="block text-white font-semibold mb-2">
                      Auditor Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.auditorName}
                      onChange={(e) =>
                        handleInputChange("auditorName", e.target.value)
                      }
                      className={`w-full bg-[#2B624E] bg-opacity-10 backdrop-blur-sm border rounded-xl px-4 py-3 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-teal-400 transition-all ${
                        errors.auditorName
                          ? "border-red-500"
                          : "border-white border-opacity-20"
                      }`}
                      placeholder="Your name"
                    />
                    {errors.auditorName && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                        <span>⚠</span> {errors.auditorName}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2" id="staffMember">
                    <label className="block text-white font-semibold mb-2">
                      Staff Member Being Audited{" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.staffMember}
                      onChange={(e) =>
                        handleInputChange("staffMember", e.target.value)
                      }
                      className={`w-full bg-[#2B624E] bg-opacity-10 backdrop-blur-sm border rounded-xl px-4 py-3 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-teal-400 transition-all ${
                        errors.staffMember
                          ? "border-red-500"
                          : "border-white border-opacity-20"
                      }`}
                      placeholder="Staff member name"
                    />
                    {errors.staffMember && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                        <span>⚠</span> {errors.staffMember}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="fadeUp">
              <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="text-3xl">🧼</span>
                    Hand Hygiene Steps (WHO 7 Steps)
                  </h2>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">
                      {completedSteps}/7
                    </div>
                    <div
                      className={`text-sm font-semibold ${
                        complianceRate >= 85
                          ? "text-green-400"
                          : complianceRate >= 70
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {complianceRate}% Compliance
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      key: "palmToPalm",
                      label: "1. Palm to palm",
                      icon: "🤲",
                    },
                    {
                      key: "backOfHands",
                      label: "2. Back of hands",
                      icon: "✋",
                    },
                    {
                      key: "betweenFingers",
                      label: "3. Between fingers",
                      icon: "🖐️",
                    },
                    {
                      key: "backOfFingers",
                      label: "4. Back of fingers",
                      icon: "👐",
                    },
                    { key: "thumbs", label: "5. Thumbs", icon: "👍" },
                    { key: "fingertips", label: "6. Fingertips", icon: "☝️" },
                    { key: "wrists", label: "7. Wrists", icon: "💪" },
                  ].map((step) => (
                    <div
                      key={step.key}
                      onClick={() => handleStepChange(step.key)}
                      className="flex items-center gap-3 border-2 border-white shadow-2xl bg-[#2B624E] bg-opacity-10 backdrop-blur-sm rounded-xl p-4 cursor-pointer hover:bg-opacity-15 transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={formData.handHygieneSteps[step.key]}
                        onChange={() => {}}
                        className="w-5 h-5 accent-teal-500 pointer-events-none"
                      />
                      <span className="text-2xl">{step.icon}</span>
                      <span className="text-white font-medium">
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="fadeUp">
              <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-3xl">🥽</span>
                  PPE Usage
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { value: "mask", label: "Mask", icon: "😷" },
                    { value: "gloves", label: "Gloves", icon: "🧤" },
                    { value: "gown", label: "Gown", icon: "🥼" },
                    {
                      value: "eyeProtection",
                      label: "Eye Protection",
                      icon: "🥽",
                    },
                  ].map((item) => (
                    <div
                      key={item.value}
                      onClick={() => handlePPEChange(item.value)}
                      className="flex flex-col items-center gap-2 border-2 border-white bg-[#2B624E] bg-opacity-10 backdrop-blur-sm rounded-xl p-4 cursor-pointer hover:bg-opacity-15 transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={formData.ppeUsed.includes(item.value)}
                        onChange={() => {}}
                        className="w-5 h-5 accent-teal-500 pointer-events-none"
                      />
                      <span className="text-3xl">{item.icon}</span>
                      <span className="text-white font-medium text-sm text-center">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="fadeUp">
              <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-3xl">📝</span>
                  Additional Observations
                </h2>
                <textarea
                  value={formData.observations}
                  onChange={(e) =>
                    setFormData({ ...formData, observations: e.target.value })
                  }
                  className="w-full bg-[#2B624E] bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-xl px-4 py-3 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-teal-400 transition-all"
                  rows="4"
                  placeholder="Any additional notes or observations..."
                ></textarea>
              </div>
            </div>

            <div className="fadeUp flex justify-center gap-4">
              <button
                onClick={handleDownload}
                className="bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-2xl py-4 px-8 font-bold text-xl hover:from-teal-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Download Audit Report
              </button>
              <button
                onClick={handleReset}
                className="bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-2xl py-4 px-8 font-bold text-xl hover:from-teal-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Clear Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
