import axios from "axios";
import { getFrontendEnv } from "@/lib/env";

const env = getFrontendEnv();

export const api = axios.create({
  baseURL: `${env.BACKEND_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios interceptors
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("accessToken");
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMjJiYTRlYTAxZTQ1ZWQzYWU3MGE0OCIsImlhdCI6MTc4MDY2MTcxNSwiZXhwIjoxNzg4NDM3NzE1fQ.0Hzoz8YLxTfPRp97ViDPTHY-GRRJE6yQCPplyzqNBzA";

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (err) => Promise.reject(err),
);
