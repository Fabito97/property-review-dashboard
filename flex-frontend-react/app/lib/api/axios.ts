import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // You can add authentication tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global error responses here
    if (error.response) {
      console.error("API Error:", error.response.data);
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

export const apiRequest = async <T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: any,
  config?: any
): Promise<T> => {
  try {
    console.log("Running axios")
    const response = await axiosInstance[method]<T>(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default axiosInstance;
