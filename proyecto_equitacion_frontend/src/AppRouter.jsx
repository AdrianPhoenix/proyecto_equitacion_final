import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { AuthProvider } from "./contexts/AuthContext"; // Asegúrate de que la ruta sea correcta

const AppRouter = () => {
  const [userLogin, setUserLogin] = useState();

  useEffect(() => {
    const getUserRole = () => {
      const storedUser = localStorage.getItem("userLogin");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserLogin(user.role);
      } else {
        setUserLogin(undefined);
      }
    };

    getUserRole();

    // Escucha cambios en localStorage (por ejemplo, logout/login en otra pestaña)
    window.addEventListener("storage", getUserRole);

    return () => {
      window.removeEventListener("storage", getUserRole);
    };
  }, []);



  let dashboardElement;
  switch (userLogin) {
    case "alumno":
      dashboardElement = <Alumno />;
      break;
    case "profesor":
      dashboardElement = <Profesor />;
      break;
    case "admin":
      dashboardElement = <Admin />;
      break;
    case "Cuidador":
      dashboardElement = <Alumno />;
      break;
    default:
      dashboardElement = <Dashboard />;
  }

  return (
    // <Routes>
    //   <Route path="/" element={<Home />} />
    //   <Route path="/login" element={<Login />} />
    //   <Route path="/equitacion" element={<EquitacionPage />} />
    //   <Route path="/equinoterapia" element={<EquinoterapiaPage />} />
    // </Routes>
    <AuthProvider>
      {" "}
      {/* Envuelve tu aplicación con el proveedor de autenticación */}
      <Routes>
        {/* Rutas para usuarios NO AUTENTICADOS (GuestLayout) */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/equitacion" element={<EquitacionPage />} />
          <Route path="/equinoterapia" element={<EquinoterapiaPage />} />
          <Route path="/login" element={<Login />} />
          {/* Puedes agregar más rutas públicas aquí */}
        </Route>

        {/* Rutas para usuarios AUTENTICADOS (AuthLayout) */}
        {/* Todas las rutas dentro de este grupo requerirán autenticación */}
        <Route
          element={
            <ProtectedRoute>
              <AuthLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={dashboardElement} />
          <Route path="/admin/alumnos" element={<Alumnos />} />
          <Route path="/admin/profesores" element={<Profesores />} />

          {/* Puedes agregar más rutas protegidas aquí */}
        </Route>

        {/* Rutas de comodín (404) */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRouter;
