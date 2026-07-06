import api from "./axios";

export const getStoredToken = () => {
  return localStorage.getItem("access_token");
};

export const getStoredFarmer = () => {
  const farmer = localStorage.getItem("farmer");
  return farmer ? JSON.parse(farmer) : null;
};

export const restoreFarmerFromBackend = async () => {
  try {
    const res = await api.get("/auth/farmer/me");
    localStorage.setItem("farmer", JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    // Token invalid or expired
    localStorage.removeItem("access_token");
    localStorage.removeItem("farmer");
    return null;
  }
};

export const logoutFarmer = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("farmer");
};
