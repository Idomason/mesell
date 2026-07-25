import axios from "axios";
import { getFrontendEnv } from "@/lib/env";

const env = getFrontendEnv();

export const api = axios.create({
  baseURL: `${env.BACKEND_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
