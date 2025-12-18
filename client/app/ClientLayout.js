"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function ClientLayout({ children }) {
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL ||
            "https://hospital-infection-control-production.up.railway.app"
          }/api/user/get-logged-in`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAboutDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  const isAuthPage = pathname === "/login" || pathname === "/register";

  const getNavLinks = () => {
    const baseLinks = [
      { href: user ? "/dashboard" : "/", label: user ? "Dashboard" : "Home" },
      { href: "/standard-operating-procedures", label: "SOPs" },
      { href: "/challenges", label: "Challenges" },
    ];

    if (user && (user.role === "Doctor" || user.role === "Nurse")) {
      return [
        ...baseLinks,
        { href: "/dashboard/reports", label: "Report Infection" },
      ];
    }

    return baseLinks;
  };

  const navLinks = getNavLinks();

  const aboutLinks = [
    { href: "/about", label: "About HIC" },
    { href: "/about/standards", label: "About Standards" },
    { href: "/about/team", label: "About Us" },
  ];

  if (loading && !isAuthPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-green-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthPage) {
    return children;
  }

  return (
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

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
              className={`text-sm font-medium transition-colors hover:text-teal-600 flex items-center gap-1 ${
                pathname.startsWith("/about")
                  ? "text-teal-600"
                  : "text-gray-700"
              }`}
            >
              About
              <svg
                className={`w-4 h-4 transition-transform ${
                  aboutDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {aboutDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {aboutLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setAboutDropdownOpen(false)}
                    className={`block px-4 py-3 text-sm transition-colors hover:bg-teal-50 hover:text-teal-600 ${
                      pathname === link.href
                        ? "text-teal-600 bg-teal-50"
                        : "text-gray-700"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

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
            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
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

          <div className="w-full border-t border-gray-200 pt-2 mt-2">
            <p className="text-xs text-gray-500 uppercase font-semibold mb-2">
              About
            </p>
            {aboutLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-2 pl-4 w-full transition-colors hover:text-teal-600 ${
                  pathname === link.href
                    ? "text-teal-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

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

      <footer className="flex flex-col items-center justify-center w-full py-10 bg-gradient-to-b from-blue-900 via-teal-900 to-green-900 text-white/70">
        <p className="mt-4 text-center">
          Copyright © {new Date().getFullYear()} Team 5. All rights reserved.
        </p>
        <div className="flex items-center gap-4 mt-5">
          {/* <a
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
          Add other social icons similarly */}
        </div>
      </footer>
    </div>
  );
}
