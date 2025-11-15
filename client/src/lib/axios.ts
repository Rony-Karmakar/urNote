import { useAuthStore } from "@/store/authStore";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired → logout
            useAuthStore.getState().logout();
            window.location.href = "/signin";
        }
        return Promise.reject(error);
    }
);