"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "./globals.css";
import { apiCall } from "@/lib/api";

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await apiCall("/api/user/get-logged-in");

        if (data.success) {
          setUser(data.data);
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Failed to get user:", error);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  const isAuthPage = pathname === "/login" || pathname === "/register";

  const getNavLinks = () => {
    if (!user) {
      return [
        { href: "/", label: "Home" },
        { href: "/standard-operating-procedures", label: "SOPs" },
        { href: "/challenges", label: "Challenges" },
        { href: "/about", label: "About" },
      ];
    }

    const commonLinks = [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/standard-operating-procedures", label: "SOPs" },
      { href: "/challenges", label: "Challenges" },
      { href: "/about", label: "About" },
    ];

    if (user.role === "Doctor" || user.role === "Nurse") {
      return [
        ...commonLinks,
        { href: "/dashboard/reports", label: "Report Infection" },
      ];
    }

    return commonLinks;
  };

  const navLinks = getNavLinks();

  return (
    <html lang="en">
      <body className="bg-gray-50">
        {loading && !isAuthPage ? (
          <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-green-900 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white text-xl">Loading...</p>
            </div>
          </div>
        ) : isAuthPage ? (
          children
        ) : (
          <div className="min-h-screen">
            <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🏥</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-lg font-bold text-gray-800">
                    Infection Control
                  </div>
                  <div className="text-xs text-gray-500">
                    Quality Management System
                  </div>
                </div>
              </Link>

              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-teal-600 ${
                      pathname === link.href ? "text-teal-600" : "text-gray-700"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {user && (
                  <div className="flex items-center gap-4">
                    <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-full border border-gray-200">
                      <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {user.firstname[0]}
                        {user.lastname[0]}
                      </div>
                      <div className="text-xs">
                        <div className="font-semibold text-gray-800">
                          {user.firstname} {user.lastname}
                        </div>
                        <div className="text-gray-500">{user.role}</div>
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="px-6 py-2 bg-red-500 hover:bg-red-600 transition text-white rounded-full text-sm font-medium"
                    >
                      Logout
                    </button>
                  </div>
                )}

                {!user && (
                  <Link
                    href="/login"
                    className="px-8 py-2 bg-teal-500 hover:bg-teal-600 transition text-white rounded-full text-sm font-medium"
                  >
                    Login
                  </Link>
                )}
              </div>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
                className="md:hidden"
              >
                <svg
                  width="21"
                  height="15"
                  viewBox="0 0 21 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="21" height="1.5" rx=".75" fill="#426287" />
                  <rect
                    x="8"
                    y="6"
                    width="13"
                    height="1.5"
                    rx=".75"
                    fill="#426287"
                  />
                  <rect
                    x="6"
                    y="13"
                    width="15"
                    height="1.5"
                    rx=".75"
                    fill="#426287"
                  />
                </svg>
              </button>

              <div
                className={`${
                  mobileOpen ? "flex" : "hidden"
                } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-6 text-sm md:hidden z-50 border-t border-gray-200`}
              >
                {user && (
                  <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-200 w-full">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      {user.firstname[0]}
                      {user.lastname[0]}
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold text-gray-800">
                        {user.firstname} {user.lastname}
                      </div>
                      <div className="text-xs text-gray-500">
                        {user.role} • {user.department}
                      </div>
                    </div>
                  </div>
                )}

                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-2 w-full transition-colors hover:text-teal-600 ${
                      pathname === link.href
                        ? "text-teal-600 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {user && (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="w-full mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 transition text-white rounded-full text-sm font-medium"
                  >
                    Logout
                  </button>
                )}

                {!user && (
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="w-full mt-4 px-6 py-2 bg-teal-500 hover:bg-teal-600 transition text-white rounded-full text-sm font-medium text-center block"
                  >
                    Login
                  </Link>
                )}
              </div>
            </nav>

            <main className="bg-gray-50">{children}</main>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

            <footer className="flex flex-col items-center justify-center w-full py-10 bg-gradient-to-b from-blue-900 via-teal-900 to-green-900  text-white/70">
              <p className="mt-4 text-center">
                Copyright © {new Date().getFullYear()}{" "}
                <a>Infection Control 🏥</a>. All rights reservered.
              </p>
              <div className="flex items-center gap-4 mt-5">
                <a
                  href="#"
                  className="hover:-translate-y-0.5 transition-all duration-300"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                      stroke="#fff"
                      strokeOpacity=".5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="hover:-translate-y-0.5 transition-all duration-300"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5"
                      stroke="#fff"
                      strokeOpacity=".5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 11.37a4 4 0 1 1-7.914 1.173A4 4 0 0 1 16 11.37m1.5-4.87h.01"
                      stroke="#fff"
                      strokeOpacity=".5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="hover:-translate-y-0.5 transition-all duration-300"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6M6 9H2v12h4zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
                      stroke="#fff"
                      strokeOpacity=".5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="hover:-translate-y-0.5 transition-all duration-300"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2"
                      stroke="#fff"
                      strokeOpacity=".5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="hover:-translate-y-0.5 transition-all duration-300"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"
                      stroke="#fff"
                      strokeOpacity=".5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 18c-4.51 2-5-2-7-2"
                      stroke="#fff"
                      strokeOpacity=".5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </footer>
          </div>
        )}
      </body>
    </html>
  );
}
