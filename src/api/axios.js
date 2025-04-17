// src/api/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:5000/api", // Replace with your base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // if you are using cookies for auth
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or use context/state if preferred
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle common error logic here
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirect to login...");
      // Optionally redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
