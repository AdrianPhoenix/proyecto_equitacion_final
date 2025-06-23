// src/App.jsx
import {
  Navbar, // Si Navbar también necesita el contexto de autenticación, debe estar dentro de AuthProvider
} from "./components";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; // Importa AuthProvider

import AppRouter from "./AppRouter";

const App = () => {
  return (
    <>
      <BrowserRouter>
        {/* AuthProvider debe envolver cualquier componente que use el contexto de autenticación */}
        <AuthProvider>
          {/* Si tu Navbar necesita el estado de autenticación (ej. para mostrar login/logout)
              debe estar aquí dentro de AuthProvider */}
          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
