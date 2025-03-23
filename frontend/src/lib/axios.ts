import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request/response interceptors for debugging
instance.interceptors.request.use(
  (config) => {
    console.log(
      `API Request: ${config.method?.toUpperCase()} ${config.url}`,
      config.data
    );
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status}`, response.data);
    return response;
  },
  (error) => {
    console.error("Response error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;
