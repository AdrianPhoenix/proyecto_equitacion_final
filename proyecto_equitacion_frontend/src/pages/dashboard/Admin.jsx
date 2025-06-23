import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const rolesDashboard = [
  { value: "alumno", label: "Alumnos", color: "bg-blue-100 text-blue-800" },
  {
    value: "profesor",
    label: "Profesores",
    color: "bg-green-100 text-green-800",
  },

];

const Admin = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/users");
        setUsuarios(data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };
    fetchUsuarios();
  }, []);

  // Contadores por rol
  const countByRole = (role) => usuarios.filter((u) => u.role === role).length;

  // Últimos usuarios agregados (simulado)
  const ultimosUsuarios = usuarios.slice(-3).reverse();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-blue-900">
        Panel de Administrador
      </h1>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {rolesDashboard.map((rol) => (
          <div
            key={rol.value}
            className={`rounded-xl shadow flex flex-col items-center justify-center p-6 ${rol.color}`}
          >
            <span className="text-4xl font-bold mb-2">
              {countByRole(rol.value)}
            </span>
            <span className="text-lg font-semibold">{rol.label}</span>
          </div>
        ))}
      </div>

      {/* Últimos usuarios agregados */}
      <section className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          Últimos usuarios agregados
        </h2>
        <ul>
          {ultimosUsuarios.map((u) => (
            <li
              key={u.id}
              className="flex items-center justify-between py-2 border-b last:border-b-0"
            >
              <span className="font-medium">{u.nombre}</span>
              <span className="text-gray-500 text-sm">{u.user}</span>
              <span className="capitalize px-2 py-1 rounded text-xs bg-gray-100">
                {u.role}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Acciones rápidas */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2 text-blue-700">
            Registrar nuevo alumno
          </h3>
          <Link
            to={"/admin/alumnos"}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Ir a registro
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2 text-blue-700">
            Registrar nuevo profesor
          </h3>
          <Link
            to={"/admin/profesores"}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Ir a registro
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Admin;
