import { Route, Routes } from "react-router-dom";
import { Home, Login, EquitacionPage, EquinoterapiaPage, Dashboard, NotFoundPage } from "./pages"; 
import { GuestLayout, AuthLayout, ProtectedRoute } from "./components";
import { AuthProvider } from "./contexts/AuthContext"; // Asegúrate de que la ruta sea correcta

const AppRouter = () => {
  return (
    // <Routes>
    //   <Route path="/" element={<Home />} />
    //   <Route path="/login" element={<Login />} />
    //   <Route path="/equitacion" element={<EquitacionPage />} />
    //   <Route path="/equinoterapia" element={<EquinoterapiaPage />} />
    // </Routes>
    <AuthProvider> {/* Envuelve tu aplicación con el proveedor de autenticación */}
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
          <Route element={<ProtectedRoute><AuthLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Puedes agregar más rutas protegidas aquí */}
          </Route>

          {/* Rutas de comodín (404) */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
  );
};

export default AppRouter;
