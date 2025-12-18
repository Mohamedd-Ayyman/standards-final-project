"use client";
import React, { useState, useEffect, useRef } from "react";
import { apiCall } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function AuditPage() {
  const router = useRouter();
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [policies, setPolicies] = useState([]);
  const [user, setUser] = useState(null);
  const contentRef = useRef(null);
  const createFormRef = useRef(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [formData, setFormData] = useState({
    auditType: "",
    department: "",
    complianceScore: "",
    policy: "",
  });

  const [stats, setStats] = useState({
    totalAudits: 0,
    avgCompliance: 0,
    highCompliance: 0,
    lowCompliance: 0,
  });

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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (showCreateForm && createFormRef.current) {
      createFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showCreateForm]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      setLoading(true);

      const [userData, auditsData, policiesData] = await Promise.all([
        apiCall("/api/user/get-logged-in"),
        apiCall("/api/audit/get-all"),
        apiCall("/api/policy/get-all"),
      ]);

      if (userData.success) {
        setUser(userData.data);
      }

      if (auditsData.success) {
        setAudits(auditsData.data);
        calculateStats(auditsData.data);
      }

      if (policiesData.success) {
        setPolicies(policiesData.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (auditData) => {
    const total = auditData.length;
    const avgCompliance =
      total > 0
        ? (
            auditData.reduce((sum, audit) => sum + audit.complianceScore, 0) /
            total
          ).toFixed(1)
        : 0;
    const highCompliance = auditData.filter(
      (a) => a.complianceScore >= 80
    ).length;
    const lowCompliance = auditData.filter(
      (a) => a.complianceScore < 60
    ).length;

    setStats({
      totalAudits: total,
      avgCompliance,
      highCompliance,
      lowCompliance,
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const data = await apiCall("/api/audit/create", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (data.success) {
        setMessage({
          text: "Audit created successfully!",
          type: "success",
        });
        setShowCreateForm(false);
        setFormData({
          auditType: "",
          department: "",
          complianceScore: "",
          policy: "",
        });
        fetchData();
      } else {
        setMessage({
          text: data.message || "Failed to create audit",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error creating audit:", error);
      setMessage("Error creating audit");
    }
  };

  const getComplianceColor = (score) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getComplianceBarColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getComplianceBadge = (score) => {
    if (score >= 80) return { text: "Excellent", color: "bg-green-500" };
    if (score >= 60) return { text: "Good", color: "bg-yellow-500" };
    return { text: "Needs Improvement", color: "bg-red-500" };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-green-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-green-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-150"></div>
      </div>

      <div className="relative z-10 px-4 py-16" ref={contentRef}>
        <div className="max-w-7xl mx-auto">
          <div className="fadeUp mb-12">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-green-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                    <span className="text-4xl">📋</span>
                  </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  Audit{" "}
                  <span className="bg-gradient-to-r from-teal-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
                    Management
                  </span>
                </h1>
                <p className="text-xl text-white opacity-90">
                  Track compliance, monitor performance, and drive continuous
                  improvement
                </p>
              </div>
              {user?.role === "Admin" && (
                <button
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className="px-8 py-4 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-full font-semibold text-lg hover:from-teal-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  {showCreateForm ? "Cancel" : "+ New Audit"}
                </button>
              )}
            </div>
          </div>
          {message.text && (
            <div className="fadeUp mb-8">
              <div
                className={`${
                  message.type === "success"
                    ? "bg-green-500 border-green-400"
                    : "bg-red-500 border-red-400"
                } bg-opacity-20 backdrop-blur-lg rounded-2xl p-4 border-2 border-opacity-30`}
              >
                <p className="text-white text-center font-medium">
                  {message.text}
                </p>
              </div>
            </div>
          )}

          {showCreateForm && user?.role === "Admin" && (
            <div
              ref={createFormRef}
              className="fadeUp bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20 mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-green-400">+</span> Create New Audit
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white mb-2 font-medium">
                      Audit Type
                    </label>
                    <select
                      name="auditType"
                      value={formData.auditType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#3d9071] bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-teal-400"
                    >
                      <option value="" disabled hidden>
                        Select Audit Type
                      </option>
                      <option value="Hand Hygiene">Hand Hygiene</option>
                      <option value="Environmental Cleaning">
                        Environmental Cleaning
                      </option>
                      <option value="Sterilization">Sterilization</option>
                      <option value="PPE Compliance">PPE Compliance</option>
                      <option value="Waste Management">Waste Management</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white mb-2 font-medium">
                      Department
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#3d9071] bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-teal-400"
                    >
                      <option value="" disabled hidden>
                        Select Department
                      </option>
                      <option value="ICU">ICU</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Surgery">Surgery</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="General Ward">General Ward</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-white mb-3 font-medium">
                      Compliance Score:{" "}
                      <span
                        className={`text-2xl font-bold ${getComplianceColor(
                          formData.complianceScore || 0
                        )}`}
                      >
                        {formData.complianceScore || 0}%
                      </span>
                    </label>
                    <div className="space-y-4">
                      <input
                        type="range"
                        name="complianceScore"
                        value={formData.complianceScore || 0}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, 
                            ${
                              formData.complianceScore >= 80
                                ? "#10b981"
                                : formData.complianceScore >= 60
                                ? "#eab308"
                                : "#ef4444"
                            } 0%, 
                            ${
                              formData.complianceScore >= 80
                                ? "#10b981"
                                : formData.complianceScore >= 60
                                ? "#eab308"
                                : "#ef4444"
                            } ${formData.complianceScore}%, 
                            rgba(255,255,255,0.1) ${formData.complianceScore}%, 
                            rgba(255,255,255,0.1) 100%)`,
                        }}
                      />
                      <div className="w-full h-4 bg-white bg-opacity-10 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getComplianceBarColor(
                            formData.complianceScore || 0
                          )} transition-all duration-300 rounded-full flex items-center justify-end pr-2`}
                          style={{ width: `${formData.complianceScore || 0}%` }}
                        >
                          {formData.complianceScore > 10 && (
                            <span className="text-xs text-white font-bold">
                              {formData.complianceScore}%
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, complianceScore: 25 })
                          }
                          className="px-4 py-2 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-40 text-white rounded-lg text-sm hover:bg-opacity-30 transition-all"
                        >
                          Poor (25%)
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, complianceScore: 50 })
                          }
                          className="px-4 py-2 bg-orange-500 bg-opacity-20 border border-orange-500 border-opacity-40 text-white rounded-lg text-sm hover:bg-opacity-30 transition-all"
                        >
                          Fair (50%)
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, complianceScore: 70 })
                          }
                          className="px-4 py-2 bg-yellow-500 bg-opacity-20 border border-yellow-500 border-opacity-40 text-white rounded-lg text-sm hover:bg-opacity-30 transition-all"
                        >
                          Good (70%)
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, complianceScore: 85 })
                          }
                          className="px-4 py-2 bg-green-500 bg-opacity-20 border border-green-500 border-opacity-40 text-white rounded-lg text-sm hover:bg-opacity-30 transition-all"
                        >
                          Very Good (85%)
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, complianceScore: 100 })
                          }
                          className="px-4 py-2 bg-emerald-500 bg-opacity-20 border border-emerald-500 border-opacity-40 text-white rounded-lg text-sm hover:bg-opacity-30 transition-all"
                        >
                          Excellent (100%)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-white mb-2 font-medium">
                      Related Policy
                    </label>
                    <select
                      name="policy"
                      value={formData.policy}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#3d9071] bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-teal-400"
                    >
                      <option value="" disabled hidden>
                        Select Policy
                      </option>
                      {policies.map((policy) => (
                        <option key={policy._id} value={policy._id}>
                          {policy.title} (v{policy.version})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="px-8 py-4 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-full font-semibold text-lg hover:from-teal-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  Create Audit
                </button>
              </div>
            </div>
          )}

          <div className="fadeUp grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-2xl">
                  📊
                </div>
                <div>
                  <p className="text-sm text-white opacity-70">Total Audits</p>
                  <p className="text-3xl font-bold text-white">
                    {stats.totalAudits}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center text-2xl">
                  📈
                </div>
                <div>
                  <p className="text-sm text-white opacity-70">
                    Avg Compliance
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {stats.avgCompliance}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-2xl">
                  ✅
                </div>
                <div>
                  <p className="text-sm text-white opacity-70">
                    High Compliance
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {stats.highCompliance}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center text-2xl">
                  ⚠️
                </div>
                <div>
                  <p className="text-sm text-white opacity-70">
                    Needs Attention
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {stats.lowCompliance}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="fadeUp">
            <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-green-400">📋</span> Audit Records
              </h2>

              {audits.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-white text-xl">No audits found</p>
                  <p className="text-white opacity-70 mt-2">
                    Create your first audit to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {audits.map((audit) => {
                    const badge = getComplianceBadge(audit.complianceScore);
                    return (
                      <div
                        key={audit._id}
                        className="bg-[#3d9071] bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-10 hover:bg-opacity-20 transition-all"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-green-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                              📋
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white mb-1">
                                {audit.auditType}
                              </h3>
                              <p className="text-sm text-white opacity-70">
                                {audit.department} • Conducted by{" "}
                                {audit.conductedBy?.firstname}{" "}
                                {audit.conductedBy?.lastname}
                              </p>
                              <p className="text-xs text-white opacity-50 mt-1">
                                {new Date(audit.createdAt).toLocaleDateString()}{" "}
                                at{" "}
                                {new Date(audit.createdAt).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`px-3 py-1 text-xs ${badge.color} bg-opacity-20 text-white rounded-full whitespace-nowrap`}
                            >
                              {badge.text}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white opacity-70">
                              Compliance Score
                            </span>
                            <span
                              className={`text-lg font-bold ${getComplianceColor(
                                audit.complianceScore
                              )}`}
                            >
                              {audit.complianceScore}%
                            </span>
                          </div>
                          <div className="w-full h-3 bg-white bg-opacity-10 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getComplianceBarColor(
                                audit.complianceScore
                              )} transition-all duration-500 rounded-full`}
                              style={{ width: `${audit.complianceScore}%` }}
                            ></div>
                          </div>
                        </div>

                        {audit.policy && (
                          <div className="mt-4 pt-4 border-t border-white border-opacity-10">
                            <p className="text-sm text-white opacity-70">
                              Related Policy:{" "}
                              <span className="text-teal-300 font-medium">
                                {audit.policy.title} (v{audit.policy.version})
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
