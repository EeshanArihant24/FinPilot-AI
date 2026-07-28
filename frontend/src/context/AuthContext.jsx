import { createContext, useEffect, useState } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {

      const response = await authService.getCurrentUser();

      setUser(response.data);

    } catch (err) {

      console.error(err);

      localStorage.removeItem("token");

      setUser(null);

    } finally {

      setLoading(false);

    }

  };

  const login = async (email, password) => {

    const response = await authService.login({
      email,
      password,
    });

    localStorage.setItem(
      "token",
      response.data.token
    );

    const currentUser = await authService.getCurrentUser();

    setUser(currentUser.data);

    return currentUser.data;
  };

  const register = async (data) => {

    return await authService.register(data);

  };

  const logout = () => {

    localStorage.removeItem("token");

    setUser(null);

  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        setUser,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

}