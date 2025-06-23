// src/AppRouter.jsx
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Login,
  EquitacionPage,
  EquinoterapiaPage,
  Admin,
  Alumno,
  Profesor,
  NotFoundPage,
  Dashboard,
  Alumnos,
  Profesores,
} from "./pages";
import { GuestLayout, AuthLayout, ProtectedRoute } from "./components";
import { useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";

const AppRouter = () => {
  const { userRole, loading } = useAuth();

  // AÑADIR ESTE useEffect PARA FORZAR UN RE-RENDER DESPUÉS DE LA CARGA INICIAL
  useEffect(() => {
    // Este efecto se ejecutará cuando 'loading' cambie de true a false
    // Forzando una re-evaluación de getDashboardElement
  }, [loading]); // Dependencia en 'loading'

  const getDashboardElement = () => {
    console.log("AppRouter.getDashboardElement: Evaluando dashboard. loading:", loading, " userRole:", userRole);

    if (loading) {
      return <div>Cargando dashboard...</div>;
    }

    if (!userRole) return <Dashboard />;

    switch (userRole.toLowerCase()) {
      case "alumno":
        return <Alumno />;
      case "profesor":
        return <Profesor />;
      case "admin":
        return <Admin />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<GuestLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/equitacion" element={<EquitacionPage />} />
        <Route path="/equinoterapia" element={<EquinoterapiaPage />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Rutas protegidas */}
      <Route
        element={
          <ProtectedRoute>
            <AuthLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={getDashboardElement()} />
        <Route path="/admin/alumnos" element={<Alumnos />} />
        <Route path="/admin/profesores" element={<Profesores />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;