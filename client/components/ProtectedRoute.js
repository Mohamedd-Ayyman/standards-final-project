"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiCall } from "@/lib/api";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const data = await apiCall("/api/user/get-logged-in");

        if (!data.success) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        setUser(data.data);

        if (allowedRoles.length > 0 && !allowedRoles.includes(data.data.role)) {
          router.push("/unauthorized");
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("token");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, allowedRoles]);

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

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await apiCall("/api/user/get-logged-in");
        if (data.success) {
          setUser(data.data);
        }
      } catch (error) {
        console.error("Failed to get user:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return { user, loading };
}
