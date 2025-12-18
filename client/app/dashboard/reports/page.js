"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { apiCall } from "@/lib/api";

export default function InfectionReportsPage() {
  const router = useRouter();
  const contentRef = useRef(null);
  const [reports, setReports] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    infectionType: "",
    department: "",
    severity: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [filterStatus, setFilterStatus] = useState("All");

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
  }, [router]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const userData = await apiCall("/api/user/get-logged-in");
      if (userData.success) {
        setUser(userData.data);

        if (userData.data.role === "Admin") {
          const reportsData = await apiCall("/api/infection/get-all");
          if (reportsData.success) {
            setReports(reportsData.data);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.infectionType || !formData.department || !formData.severity) {
      setMessage({ text: "Please fill in all fields", type: "error" });
      return;
    }

    try {
      const data = await apiCall("/api/infection/create", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (data.success) {
        setMessage({ text: "Report submitted successfully!", type: "success" });
        setShowCreateForm(false);
        setFormData({ infectionType: "", department: "", severity: "" });
        if (user.role === "Admin") {
          fetchData();
        }
      } else {
        setMessage({ text: data.message, type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Error submitting report", type: "error" });
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High":
        return "text-white bg-red-500";
      case "Medium":
        return "text-white bg-yellow-500";
      case "Low":
        return "text-white bg-green-500";
      default:
        return "text-white bg-gray-500";
    }
  };

  const getStatusColor = (status) => {
    return status === "Open"
      ? "bg-orange-500 text-white"
      : "bg-green-500 text-white";
  };

  const filteredReports = reports.filter((report) =>
    filterStatus === "All" ? true : report.status === filterStatus
  );

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
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                    <span className="text-4xl">🦠</span>
                  </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  Infection{" "}
                  <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                    Reports
                  </span>
                </h1>
                <p className="text-xl text-white opacity-90">
                  Report and track hospital-acquired infections
                </p>
              </div>
              {(user?.role === "Doctor" || user?.role === "Nurse") && (
                <button
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold text-lg hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  {showCreateForm ? "Cancel" : "+ Report Infection"}
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

          {showCreateForm &&
            (user?.role === "Doctor" || user?.role === "Nurse") && (
              <div className="fadeUp bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20 mb-12">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-orange-400">+</span> Report New
                  Infection
                </h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white mb-2 font-medium">
                        Infection Type
                      </label>
                      <select
                        name="infectionType"
                        value={formData.infectionType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#3d9071] bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white focus:outline-none focus:border-orange-400"
                      >
                        <option value="">Select Type</option>
                        <option value="CLABSI">CLABSI (Central Line)</option>
                        <option value="CAUTI">
                          CAUTI (Catheter-Associated UTI)
                        </option>
                        <option value="VAP">VAP (Ventilator Pneumonia)</option>
                        <option value="SSI">SSI (Surgical Site)</option>
                        <option value="C. diff">C. diff</option>
                        <option value="MRSA">MRSA</option>
                        <option value="Other">Other</option>
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
                        className="w-full px-4 py-3 bg-[#3d9071] bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white focus:outline-none focus:border-orange-400"
                      >
                        <option value="">Select Department</option>
                        <option value="ICU">ICU</option>
                        <option value="Emergency">Emergency</option>
                        <option value="Surgery">Surgery</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Maternity">Maternity</option>
                        <option value="General Ward">General Ward</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white mb-2 font-medium">
                        Severity
                      </label>
                      <select
                        name="severity"
                        value={formData.severity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#3d9071] bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white focus:outline-none focus:border-orange-400"
                      >
                        <option value="">Select Severity</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold text-lg hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
                  >
                    Submit Report
                  </button>
                </div>
              </div>
            )}

          {user?.role === "Admin" && (
            <>
              <div className="fadeUp mb-8">
                <div className="flex gap-4 justify-center">
                  {["All", "Open", "Closed"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-6 py-3 rounded-full font-semibold transition-all ${
                        filterStatus === status
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                          : "bg-white bg-opacity-10 text-black hover:bg-opacity-20"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="fadeUp">
                <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20">
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-orange-400">📊</span> All Reports (
                    {filteredReports.length})
                  </h2>

                  {filteredReports.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📭</div>
                      <p className="text-white text-xl">No reports found</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredReports.map((report) => (
                        <div
                          key={report._id}
                          className="bg-[#3d9071] bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-10 hover:bg-opacity-20 transition-all"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-2xl">
                                🦠
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-white mb-1">
                                  {report.infectionType}
                                </h3>
                                <p className="text-sm text-white opacity-70">
                                  {report.department} • Reported by{" "}
                                  {report.reportedBy?.firstname}{" "}
                                  {report.reportedBy?.lastname} (
                                  {report.reportedBy?.role})
                                </p>
                                <p className="text-xs text-white opacity-50 mt-1">
                                  {new Date(
                                    report.createdAt
                                  ).toLocaleDateString()}{" "}
                                  at{" "}
                                  {new Date(
                                    report.createdAt
                                  ).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 text-white">
                              <span
                                className={`px-3 py-1 text-xs ${getSeverityColor(
                                  report.severity
                                )} bg-opacity-20 rounded-full border border-opacity-30 font-semibold`}
                              >
                                {report.severity} Severity
                              </span>
                              <span
                                className={`px-3 py-1 text-xs ${getStatusColor(
                                  report.status
                                )} bg-opacity-20 rounded-full border border-opacity-30 font-semibold`}
                              >
                                {report.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {(user?.role === "Doctor" || user?.role === "Nurse") &&
            !showCreateForm && (
              <div className="fadeUp">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 shadow-2xl text-center">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Report Submitted!
                  </h3>
                  <p className="text-white text-lg opacity-90 mb-6">
                    Your infection report has been submitted to the ICD team.
                    They will review and take necessary action.
                  </p>
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="px-8 py-4 bg-white text-orange-900 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all"
                  >
                    Submit Another Report
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
