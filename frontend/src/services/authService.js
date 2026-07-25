import api from "./api";

const AUTH = "/auth";

export const register = async (user) => {
  const response = await api.post(`${AUTH}/register`, user);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post(`${AUTH}/login`, credentials);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = async () => {
  const response = await api.get(`${AUTH}/me`);
  return response.data;
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};