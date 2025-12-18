"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiCall } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const contentRef = useRef(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAudits: 0,
    totalReports: 0,
    pendingUsers: 0,
    totalPolicies: 0,
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
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const data = await apiCall("/api/user/get-logged-in");
        if (data.success) {
          setUser(data.data);
          if (data.data.role === "Admin") {
            await fetchAdminStats();
          }
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const fetchAdminStats = async () => {
    try {
      // Updated to use apiCall instead of fetch
      const [audits, reports, users, policies] = await Promise.all([
        apiCall("/api/audit/get-all"),
        apiCall("/api/infection/get-all"),
        apiCall("/api/user/pending-users"),
        apiCall("/api/policy/get-all"),
      ]);

      setStats({
        totalAudits: audits.data?.length || 0,
        totalReports: reports.data?.length || 0,
        pendingUsers: users.data?.length || 0,
        totalPolicies: policies.data?.length || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
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

  const adminQuickLinks = [
    {
      icon: "👥",
      title: "User Management",
      href: "/dashboard/users",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: "📋",
      title: "Audits",
      href: "/dashboard/audits",
      color: "from-teal-400 to-teal-600",
    },
    {
      icon: "📄",
      title: "Policies",
      href: "/dashboard/policies",
      color: "from-green-400 to-green-600",
    },
    {
      icon: "🦠",
      title: "Infection Reports",
      href: "/dashboard/reports",
      color: "from-orange-400 to-orange-600",
    },
  ];

  const staffQuickLinks = [
    {
      icon: "🦠",
      title: "Report Infection",
      href: "/dashboard/reports/create",
      color: "from-red-400 to-red-600",
    },
    {
      icon: "📊",
      title: "View Reports",
      href: "/dashboard/reports",
      color: "from-orange-400 to-orange-600",
    },
    {
      icon: "📄",
      title: "View Policies",
      href: "/dashboard/policies",
      color: "from-green-400 to-green-600",
    },
    {
      icon: "📚",
      title: "SOPs",
      href: "/standard-operating-procedures",
      color: "from-blue-400 to-blue-600",
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
          <div className="fadeUp mb-12">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  Welcome Back,{" "}
                  <span className="bg-gradient-to-r from-teal-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
                    {user?.firstname}
                  </span>
                </h1>
                <p className="text-xl text-white opacity-90">
                  {user?.role} • {user?.department || "Administration"}
                </p>
              </div>
            </div>
          </div>

          {user?.role === "Admin" && (
            <div className="fadeUp grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-2xl">
                    📋
                  </div>
                  <div>
                    <p className="text-sm text-white opacity-70">
                      Total Audits
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {stats.totalAudits}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-2xl">
                    🦠
                  </div>
                  <div>
                    <p className="text-sm text-white opacity-70">
                      Total Reports
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {stats.totalReports}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-2xl">
                    ⏳
                  </div>
                  <div>
                    <p className="text-sm text-white opacity-70">
                      Pending Users
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {stats.pendingUsers}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-2xl">
                    📄
                  </div>
                  <div>
                    <p className="text-sm text-white opacity-70">Policies</p>
                    <p className="text-3xl font-bold text-white">
                      {stats.totalPolicies}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="fadeUp mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(user?.role === "Admin" ? adminQuickLinks : staffQuickLinks).map(
                (link, index) => (
                  <Link key={index} href={link.href}>
                    <div className="bg-[#2B624E] bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-30 transition-all transform hover:scale-105 cursor-pointer">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${link.color} rounded-xl flex items-center justify-center text-3xl mb-4 shadow-lg`}
                      >
                        {link.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {link.title}
                      </h3>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>

          <div className="fadeUp">
            <div className="bg-gradient-to-r from-teal-500 to-green-500 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">💡</span>
                <div>
                  <h3 className="text-2xl font-bold text-white">Need Help?</h3>
                  <p className="text-white opacity-90">
                    Check out our resources and documentation
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/standard-operating-procedures">
                  <button className="px-6 py-3 bg-white text-teal-900 rounded-full font-semibold hover:bg-gray-100 transition-all">
                    View SOPs
                  </button>
                </Link>
                <Link href="/about/standards">
                  <button className="px-6 py-3 bg-white text-teal-900 rounded-full font-semibold hover:bg-gray-100 transition-all">
                    View Standards
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
