export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://hospital-infection-control-production.up.railway.app";

export const apiCall = async (endpoint, options = {}) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const config = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...(options.body && { body: options.body }),
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  return response.json();
};
