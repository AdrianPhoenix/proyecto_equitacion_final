import React from "react";

const Profesor = () => {
  // Obtener datos del profesor desde localStorage
  const user = JSON.parse(localStorage.getItem("userLogin")) || {};

  // Datos simulados para enriquecer el dashboard
  const alumnosAsignados = [
    { id: 1, nombre: "Juan Pérez", dias: "Martes - Jueves", horario: "13:00 - 15:00" },
    { id: 2, nombre: "Lucía Gómez", dias: "Lunes - Viernes", horario: "14:00 - 16:00" },
    { id: 3, nombre: "Carlos Ruiz", dias: "Miércoles", horario: "15:00 - 16:00" },
  ];

  const avisos = [
    { id: 1, texto: "Recuerda actualizar los temas de evaluación para la próxima semana." },
    { id: 2, texto: "Hay una reunión de profesores el viernes a las 18:00." }
  ];

  // Sección de recursos útiles para profesores
  const recursos = [
    {
      id: 1,
      nombre: "Manual de buenas prácticas docentes",
      url: "https://www.educacionyfp.gob.es/",
      descripcion: "Guía oficial para mejorar la enseñanza y el trato con los alumnos."
    },
    {
      id: 2,
      nombre: "Video: Estrategias para motivar a los alumnos",
      url: "https://www.youtube.com/watch?v=abcd1234",
      descripcion: "Recomendaciones para mantener el interés y la motivación en clase."
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Resumen rápido */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-900 text-white rounded-xl shadow flex flex-col items-center justify-center p-6">
          <span className="text-3xl mb-2">📅</span>
          <span className="font-bold text-lg">Días de clase</span>
          <span className="mt-1 text-base">{user.dias_horario || "No asignado"}</span>
        </div>
        <div className="bg-green-700 text-white rounded-xl shadow flex flex-col items-center justify-center p-6">
          <span className="text-3xl mb-2">⏰</span>
          <span className="font-bold text-lg">Horario</span>
          <span className="mt-1 text-base">{user.horario || "No asignado"}</span>
        </div>
        <div className="bg-blue-700 text-white rounded-xl shadow flex flex-col items-center justify-center p-6">
          <span className="text-3xl mb-2">👨‍🏫</span>
          <span className="font-bold text-lg">Nombre</span>
          <span className="mt-1 text-base">{user.nombre || "Profesor"}</span>
        </div>
      </div>

      {/* Alumnos asignados y avisos */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Alumnos asignados */}
        <section className="bg-white rounded-xl shadow p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-700 rounded-full"></span>
            Alumnos asignados
          </h2>
          <ul className="divide-y">
            {alumnosAsignados.map((alumno) => (
              <li
                key={alumno.id}
                className="py-3 flex flex-col md:flex-row md:items-center md:justify-between"
              >
                <span className="font-medium text-green-900">
                  {alumno.nombre}
                </span>
                <span className="text-gray-700 text-sm">
                  <span className="font-semibold">Días:</span> {alumno.dias}{" "}
                  &nbsp;|&nbsp;
                  <span className="font-semibold">Horario:</span> {alumno.horario}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Avisos y recordatorios */}
        <section className="bg-white rounded-xl shadow p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-blue-700 rounded-full"></span>
            Avisos y recordatorios
          </h2>
          <ul className="space-y-2 text-gray-700">
            {avisos.map((a) => (
              <li key={a.id} className="pl-2 border-l-4 border-blue-200">
                {a.texto}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Recursos útiles */}
      <section className="bg-white rounded-xl shadow p-6 mt-8">
        <h2 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
          Recursos útiles para profesores
        </h2>
        <ul className="space-y-3">
          {recursos.map((recurso) => (
            <li key={recurso.id} className="border-l-4 border-green-200 pl-3">
              <a
                href={recurso.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 font-semibold hover:underline"
              >
                {recurso.nombre}
              </a>
              <div className="text-gray-600 text-sm">{recurso.descripcion}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Profesor;