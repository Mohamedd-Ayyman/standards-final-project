"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiCall } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const contentRef = useRef(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setMessage({ text: "", type: "" });
  };

  const handleSubmit = async () => {
    // Validation
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.role
    ) {
      setMessage({ text: "Please fill in all required fields", type: "error" });
      return;
    }

    if (formData.role !== "Admin" && !formData.department) {
      setMessage({ text: "Please select a department", type: "error" });
      return;
    }

    if (formData.password.length < 8) {
      setMessage({
        text: "Password must be at least 8 characters long",
        type: "error",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: "Passwords do not match", type: "error" });
      return;
    }

    try {
      setLoading(true);

      // ✅ FIXED: Added method and body
      const data = await apiCall("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (data.success) {
        setMessage({ text: data.message, type: "success" });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setMessage({ text: data.message, type: "error" });
      }
    } catch (error) {
      setMessage({
        text: "An error occurred. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-green-900 relative overflow-hidden flex items-center justify-center py-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-150"></div>
      </div>

      <div className="relative z-10 px-4 w-full" ref={contentRef}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 fadeUp">
            <div className="mb-6 inline-block">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-green-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300 mx-auto">
                <span className="text-4xl">📝</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Create{" "}
              <span className="bg-gradient-to-r from-teal-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
                Account
              </span>
            </h1>
            <p className="text-xl text-white opacity-90">
              Join our hospital infection control system
            </p>
          </div>

          {message.text && (
            <div className="fadeUp mb-6">
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

          <div className="fadeUp bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20 shadow-2xl">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white mb-2 font-medium text-sm">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#3d9071] bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-teal-400 transition-all"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 font-medium text-sm">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#3d9071] bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-teal-400 transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white mb-2 font-medium text-sm">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#3d9071] bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-teal-400 transition-all"
                  placeholder="john.doe@hospital.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white mb-2 font-medium text-sm">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#3d9071] bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-teal-400 transition-all"
                    placeholder="Min 8 characters"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 font-medium text-sm">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#3d9071] bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-teal-400 transition-all"
                    placeholder="Re-enter password"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white mb-2 font-medium text-sm">
                    Role *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#3d9071] bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white focus:outline-none focus:border-teal-400 transition-all"
                  >
                    <option value="">Select Role</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white mb-2 font-medium text-sm">
                    Department {formData.role !== "Admin" && "*"}
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    disabled={!formData.role || formData.role === "Admin"}
                    className="w-full px-4 py-3 bg-[#3d9071] bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white focus:outline-none focus:border-teal-400 transition-all disabled:opacity-50"
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
              </div>

              <div className="bg-blue-500 bg-opacity-10 border border-blue-400 border-opacity-30 rounded-xl p-4">
                <p className="text-sm text-white opacity-90">
                  <span className="font-semibold">Note:</span> Your account will
                  require admin approval before you can access the system.
                </p>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-full py-4 px-8 font-bold text-lg hover:from-teal-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </div>

          <div className="fadeUp text-center mt-6">
            <p className="text-white opacity-90">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-teal-300 font-semibold hover:text-teal-200 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>

          <div className="fadeUp text-center mt-4">
            <Link
              href="/"
              className="text-white opacity-70 hover:opacity-100 transition-opacity text-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-green-400 to-blue-400"></div>
    </div>
  );
}
