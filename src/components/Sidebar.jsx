import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Asegúrate de que la ruta sea correcta

// Simulación de roles, reemplaza por tu lógica real de usuario
const user = {

  nombre: "Juan Pérez",
  rol: "alumno", // "alumno" | "profesor" | "cuidador"
  avatar: "/images/avatar.png",
};

const menuItems = {
  alumno: [
    { label: "Inicio", to: "/dashboard", icon: "🏠" },
    { label: "Mis Clases", to: "/dashboard/clases", icon: "🏇" },
    { label: "Torneos", to: "/dashboard/torneos", icon: "🏆" },
    { label: "Perfil", to: "/dashboard/perfil", icon: "👤" },
  ],
  profesor: [
    { label: "Inicio", to: "/dashboard", icon: "🏠" },
    { label: "Alumnos", to: "/dashboard/alumnos", icon: "🧑‍🎓" },
    { label: "Clases", to: "/dashboard/clases", icon: "📅" },
    { label: "Perfil", to: "/dashboard/perfil", icon: "👤" },
  ],
  cuidador: [
    { label: "Inicio", to: "/dashboard", icon: "🏠" },
    { label: "Caballos", to: "/dashboard/caballos", icon: "🐴" },
    { label: "Tareas", to: "/dashboard/tareas", icon: "📝" },
    { label: "Perfil", to: "/dashboard/perfil", icon: "👤" },
  ],
};

const Sidebar = () => {
  const location = useLocation();
  const items = menuItems[user.rol] || [];


  const { logout } = useAuth(); // Obtén la función de logout del contexto

  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-primary to-primary-hover text-white flex flex-col shadow-2xl fixed left-0 top-0 z-30">
      {/* Perfil */}
      <div className="flex flex-col items-center py-10 border-b border-white/10">
        <img
          src={user.avatar}
          alt="Avatar"
          className="w-20 h-20 rounded-full border-4 border-white shadow-lg mb-3 object-cover"
        />
        <span className="font-bold text-lg">{user.nombre}</span>
        <span className="text-primary-light text-sm capitalize mt-1 bg-white/10 px-3 py-1 rounded-full">
          {user.rol}
        </span>
      </div>
      {/* Menú */}
      <nav className="flex-1 flex flex-col gap-1 mt-8 px-4">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-base transition-all
              ${
                location.pathname === item.to
                  ? "bg-white/20 shadow text-white"
                  : "hover:bg-white/10 text-white/80"
              }
            `}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      {/* Cerrar sesión */}
      <div className="px-4 pb-8 mt-auto">
        <button
          className="w-full py-3 bg-white/20 hover:bg-red-500 hover:text-white transition rounded-xl font-bold"
          onClick={logout} // Implementa tu lógica de logout aquí
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;