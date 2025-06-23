// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const getUsers = async () => {
  try {
    const { data } = await axios.get("http://localhost:4000/users");
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

const verifyUser = async (username, password) => {
  const users = await getUsers();
  const foundUser = users.find(
    (user) => user.user === username && user.password === password
  );

  if (foundUser) {
    localStorage.setItem("userLogin", JSON.stringify(foundUser));
    return foundUser;
  } else {
    return null;
  }
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // Nuevo estado para el rol
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100)); // Pequeño delay
        const token = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("userLogin");

        if (token && storedUser) {
          setIsAuthenticated(true);
          setUserRole(JSON.parse(storedUser).role); // Cargar el rol al inicio
        } else {
          setIsAuthenticated(false);
          setUserRole(null);
        }
      } catch (error) {
        console.error("Error al verificar autenticación:", error);
        setIsAuthenticated(false);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Elimina el listener de 'storage' de aquí, ya no es necesario para el rol
    // en este contexto, ya que el estado es la fuente de verdad.
  }, []); // El efecto solo se ejecuta una vez al montar

  const login = async (username, password) => {
    setLoading(true);
    const userResult = await verifyUser(username, password);

    if (userResult) {
      localStorage.setItem("authToken", "my_secret_token");
      setIsAuthenticated(true);
      setUserRole(userResult.role); // ¡Aquí se actualiza el rol!
      console.log("AuthContext: Rol actualizado a:", userResult.role); // <-- AÑADIR ESTO
      setLoading(false);
      return userResult;
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
      setLoading(false);
      console.log("AuthContext: Login fallido."); // <-- AÑADIR ESTO
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userLogin");
    setIsAuthenticated(false);
    setUserRole(null); // Limpiar el rol al cerrar sesión
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userRole, login, logout, loading }} // Exportar userRole
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
