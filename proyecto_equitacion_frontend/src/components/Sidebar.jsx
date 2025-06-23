import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Asegúrate de que la ruta sea correcta

// Simulación de roles, reemplaza por tu lógica real de usuario

const menuItems = {
  alumno: [
    { label: "Inicio", to: "/dashboard", icon: "🏠" },
    { label: "Clases", to: "#", icon: "👤" },
    { label: "Temario", to: "#", icon: "👤" },
  ],
  profesor: [{ label: "Inicio", to: "/dashboard", icon: "🏠" }],
  cuidador: [{ label: "Inicio", to: "/dashboard", icon: "🏠" }],
  admin: [
    { label: "Inicio", to: "/dashboard", icon: "🏠" },
    { label: "Agregar Alumnos", to: "/admin/alumnos", icon: "👤" },
    { label: "Agregar Profesor", to: "/admin/profesores", icon: "👤" },
  ],
};

const Sidebar = () => {
  let user = JSON.parse(localStorage.getItem("userLogin"));

  user = { ...user, avatar: "/images/avatar.png" };

  const location = useLocation();
  const items = menuItems[user.role] || [];

  const { logout } = useAuth(); // Obtén la función de logout del contexto

  return (
    <aside className=" bg-gradient-to-b from-primary to-primary-hover text-white flex flex-col shadow-2xl z-30">
      {/* Perfil */}
      <div className="flex flex-col items-center py-10 border-b border-white/10">
        <img
          src={user.avatar}
          alt="Avatar"
          className="w-20 h-20 rounded-full border-4 border-white shadow-lg mb-3 object-cover"
        />
        <span className="font-bold text-3xl">{user.nombre}</span>
        <span className="text-primary-light text-sm capitalize mt-1 bg-white/10 px-3 py-1 rounded-full">
          {user.role}
        </span>
        <span className="font-bold text-lg">{user.user}</span>
      </div>
      <div className="mt-8 px-6 text-center text-white/80 italic text-sm">
        ¡Bienvenido, {user.nombre?.split(" ")[0] || "alumno"}! <br />
        ¡Sigue esforzándote en tus clases!
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
