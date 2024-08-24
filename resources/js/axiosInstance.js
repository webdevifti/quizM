// axiosInstance.js
import axios from "axios";
import { SITE_API_URL } from "./constant"; 

const axiosInstance = axios.create({
  baseURL: SITE_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
