import React, { useState, useEffect } from "react";
import axios from "axios";

// Suponiendo que ya tienes estos arrays definidos en tu archivo:
const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const timeSlots = Array.from(
  { length: 17 },
  (_, i) => `${i + 7}:00 - ${i + 8}:00`
); // Horas de 7:00 a 23:00

const profesoresDisponibles = [
  { id: 1, nombre: "Juan Pérez" },
  { id: 2, nombre: "Ana Gómez" },
  { id: 3, nombre: "Carlos Ruiz" },
];

const FormularioAlumno = () => {
  const [profesoresDisponibles, setProfesoresDisponibles] = useState([]);
  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        let { data } = await axios.get("http://localhost:4000/users");
        // Filtra solo los usuarios con role "profesor"
        const profesores = data.filter((u) => u.role === "profesor");
        setProfesoresDisponibles(profesores);
      } catch (error) {
        console.error("Error al cargar profesores:", error);
      }
    };
    fetchProfesores();
  }, []);

  // Estado para todos los campos del formulario
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    profesor: "",
    // ...otros campos...
    hora: {}, // aquí se guarda el horario
    diaSeleccionado: "",
    horaSeleccionada: "",
  });

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Agregar franja horaria al objeto hora
  const agregarFranja = (e) => {
    e.preventDefault();
    const { diaSeleccionado, horaSeleccionada, hora } = form;
    if (!diaSeleccionado || !horaSeleccionada) return;
    setForm({
      ...form,
      hora: {
        ...hora,
        [diaSeleccionado]: [...(hora[diaSeleccionado] || []), horaSeleccionada],
      },
      horaSeleccionada: "",
    });
  };

  // Eliminar franja horaria
  const eliminarFranja = (dia, franja) => {
    setForm((prev) => {
      const nuevasFranjas = prev.hora[dia].filter((h) => h !== franja);
      const nuevoHora = { ...prev.hora };
      if (nuevasFranjas.length > 0) {
        nuevoHora[dia] = nuevasFranjas;
      } else {
        delete nuevoHora[dia];
      }
      return { ...prev, hora: nuevoHora };
    });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes enviar form.hora como horario
    await axios.post("http://localhost:4000/users", {
      user: form.email,
      password: "123456",
      role: "alumno",
      nombre: form.nombre,
      horario: form.hora,
      profesor: form.profesor,
    });
    alert("Alumno registrado correctamente");
    setForm({
      nombre: "",
      email: "",
      profesor: "",
      // ...otros campos...
      hora: {},
      diaSeleccionado: "",
      horaSeleccionada: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Registrar Alumno</h2>

      {/* Ejemplo de otros campos */}
      <label className="block mb-4 font-semibold text-gray-700">
        Nombre:
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          className="block w-full mt-1 border border-gray-300 rounded-md p-2"
        />
      </label>
      <label className="block mb-4 font-semibold text-gray-700">
        Email:
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="block w-full mt-1 border border-gray-300 rounded-md p-2"
        />
      </label>

      {/* Selección de profesor */}
      <label className="block mb-4 font-semibold text-gray-700">
        Profesor asignado:
        <select
          name="profesor"
          value={form.profesor}
          onChange={handleChange}
          className="block w-full mt-1 border border-gray-300 rounded-md p-2"
        >
          <option value="">Sin asignar</option>
          {profesoresDisponibles.map((prof) => (
            <option key={prof.id} value={prof.nombre}>
              {prof.nombre}
            </option>
          ))}
        </select>
      </label>

      {/* Selección de día y hora y botón para agregar franja */}
      <div className="flex gap-2 mb-4">
        <select
          name="diaSeleccionado"
          value={form.diaSeleccionado}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="">Selecciona un día</option>
          {daysOfWeek.map((dia) => (
            <option key={dia} value={dia}>
              {dia}
            </option>
          ))}
        </select>
        <select
          name="horaSeleccionada"
          value={form.horaSeleccionada}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="">Selecciona una hora</option>
          {timeSlots.map((hora) => (
            <option key={hora} value={hora}>
              {hora}
            </option>
          ))}
        </select>
        <button
          onClick={agregarFranja}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          type="button"
        >
          Agregar franja
        </button>
      </div>

      {/* Mostrar horario seleccionado */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Horario asignado:</h3>
        {Object.keys(form.hora).length === 0 ? (
          <p className="text-gray-500">No hay franjas asignadas.</p>
        ) : (
          <ul>
            {Object.entries(form.hora).map(([dia, franjas]) =>
              franjas.map((franja) => (
                <li key={dia + franja} className="mb-1 flex items-center">
                  <span className="mr-2">
                    {dia}: {franja}
                  </span>
                  <button
                    type="button"
                    onClick={() => eliminarFranja(dia, franja)}
                    className="text-red-500 hover:underline ml-2"
                  >
                    Quitar
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Registrar alumno
      </button>
    </form>
  );
};

export default FormularioAlumno;
