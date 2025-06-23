import React, { useState, useEffect } from "react";
import axios from "axios";

const Profesores = () => {
  const [alumnos, setAlumnos] = useState([
    {
      id: 1,
      nombre: "Juan Pérez",
      email: "juan@email.com",
      dia: "Martes",
      hora: "17:00 - 18:00",
    },
    {
      id: 2,
      nombre: "Lucía Gómez",
      email: "lucia@email.com",
      dia: "Lunes",
      hora: "16:00 - 17:00",
    },
  ]);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        let { data } = await axios.get("http://localhost:4000/users");
        // Filtra solo los usuarios con role "alumno"
        const soloAlumnos = data.filter((u) => u.role === "profesor");
        setAlumnos(soloAlumnos);
      } catch (error) {
        console.error("Error al cargar alumnos:", error);
      }
    };
    fetchAlumnos();
  }, []);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    dias_horario: "",
    hora: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.dia || !form.hora) return;

    try {
      // Cambia la URL por la de tu backend
      await axios.post("http://localhost:4000/users", {
        user: form.email,
        password: "123456",
        nombre: form.nombre,
        role: "profesor",
        dias_horario: form.dia,
        horario: form.hora,
      });

      // Si el POST fue exitoso, actualiza el estado local
      setAlumnos([...alumnos, { id: Date.now(), ...form }]);
      setForm({ nombre: "", email: "", dia: "", hora: "" });
    } catch (error) {
      // Maneja el error como prefieras
      console.error("Error al agregar alumno:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">
        Alumnos registrados
      </h1>

      {/* Formulario para agregar alumno */}
      <section className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-blue-700">
          Agregar Profesor
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              className="border rounded px-3 py-2 flex-1"
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
            <input
              className="border rounded px-3 py-2 flex-1"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              className="border rounded px-3 py-2 flex-1"
              type="text"
              name="dia"
              placeholder="Días: ej. Lunes - Jueves - Viernes"
              value={form.dia}
              onChange={handleChange}
              required
            />
            <input
              className="border rounded px-3 py-2 flex-1"
              type="text"
              name="hora"
              placeholder="Hora:  ej. 13:00 - 15:00"
              value={form.hora}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Agregar alumno
          </button>
        </form>
      </section>

      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4 text-blue-700">
          Lista de Profesores
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-4">Nombre</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Día</th>
                <th className="py-2 px-4">Hora</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno) => (
                <tr key={alumno.id} className="border-t">
                  <td className="py-2 px-4">{alumno.nombre}</td>
                  <td className="py-2 px-4">{alumno.user}</td>
                  <td className="py-2 px-4">{alumno.dias_horario}</td>
                  <td className="py-2 px-4">{alumno.horario}</td>
                </tr>
              ))}
              {alumnos.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No hay alumnos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Profesores;
