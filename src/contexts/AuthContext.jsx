// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const getUsers = async () => {
  try {
    const { data } = await axios.get("http://localhost:4000/users");
    console.log("Fetched users:", data);
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

const verifyUser = async (username, password) => {
  const users = await getUsers();
  return users.some((user) => {
    if (user.user === username && user.password === password) {
      console.log("User verified:", user);
      localStorage.setItem("userLogin", JSON.stringify(user));
      return true;
    } else {
      console.log("User not verified:", user);
      return false;
    }
  });
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Para manejar el chequeo inicial

  useEffect(() => {
    // Aquí podrías:
    // 1. Verificar un token en localStorage/cookies.
    // 2. Hacer una llamada a una API para verificar la sesión.
    const checkAuth = async () => {
      try {
        // Simulación de verificación asíncrona
        await new Promise((resolve) => setTimeout(resolve, 500));
        const token = localStorage.getItem("authToken"); // O de cookies, etc.
        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error al verificar autenticación:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    // Lógica de login (ej. llamada a API)
    const result = await verifyUser(username, password);
    console.log("Login result:", result);
    if (result) {
      localStorage.setItem("authToken", "my_secret_token");
      setIsAuthenticated(true);
      setLoading(false);
      return true;
    } else {
      setIsAuthenticated(false);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userLogin");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
