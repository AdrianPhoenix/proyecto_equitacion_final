// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

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
        await new Promise(resolve => setTimeout(resolve, 500));
        const token = localStorage.getItem('authToken'); // O de cookies, etc.
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
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulación
    if (username === 'user@user.com' && password === '1234') {
      localStorage.setItem('authToken', 'my_secret_token');
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
    localStorage.removeItem('authToken');
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