"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiCall } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const contentRef = useRef(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    if (!formData.email || !formData.password) {
      setMessage({ text: "Please fill in all fields", type: "error" });
      return;
    }

    try {
      setLoading(true);

      const data = await apiCall("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setMessage({ text: data.message, type: "success" });
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-green-900 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-150"></div>
      </div>

      <div className="relative z-10 px-4 py-16 w-full" ref={contentRef}>
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 fadeUp">
            <div className="mb-6 inline-block">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-green-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300 mx-auto">
                <span className="text-4xl">🔐</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Welcome{" "}
              <span className="bg-gradient-to-r from-teal-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
                Back
              </span>
            </h1>
            <p className="text-xl text-white opacity-90">
              Sign in to access your dashboard
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
              <div>
                <label className="block text-white mb-2 font-medium text-sm">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#3d9071] bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-teal-400 transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium text-sm">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#3d9071] bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-teal-400 transition-all"
                  placeholder="Enter your password"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-full py-4 px-8 font-bold text-lg hover:from-teal-600 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </div>

          <div className="fadeUp text-center mt-6">
            <p className="text-white opacity-90">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-teal-300 font-semibold hover:text-teal-200 transition-colors"
              >
                Register here
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
