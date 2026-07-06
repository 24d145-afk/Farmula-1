// src/api/auth.ts
import API from "./api";

export interface FarmerSignupPayload {
  full_name: string;
  mobile: string;
  email: string;
  location: string;
  password: string;
}

export interface FarmerLoginPayload {
  email: string;
  password: string;
}

// Signup
export const farmerSignup = async (data: FarmerSignupPayload) => {
  const response = await API.post("/auth/farmer/signup", data);
  return response.data;
};

// Login
export const farmerLogin = async (data: FarmerLoginPayload) => {
  const response = await API.post("/auth/farmer/login", data);
  return response.data;
};
