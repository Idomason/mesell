import { api } from "../../lib/api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  token: string;
  data?: any;
}

export const authApi = {
  login: async (credentials: LoginPayload) => {
    const response = await api.post<AuthResponse>(
      "/users/sign-in",
      credentials,
    );
    return response.data;
  },

  signup: async (payload: SignupPayload) => {
    const response = await api.post<AuthResponse>("/users/sign-up", payload);
    return response.data;
  },
};
