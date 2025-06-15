// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
// Supongamos que tienes un contexto o un hook para manejar la autenticación
import { useAuth } from '../contexts/AuthContext'; // Ajusta la ruta a tu contexto de autenticación

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth(); // Obtén el estado de autenticación

  if (loading) {
    // Puedes mostrar un spinner o un mensaje de carga mientras verificas la autenticación
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    // Si el usuario no está autenticado, redirige al login
    return <Navigate to="/login" replace />;
  }

  return children; // Si está autenticado, renderiza las rutas hijas
};

export default ProtectedRoute;