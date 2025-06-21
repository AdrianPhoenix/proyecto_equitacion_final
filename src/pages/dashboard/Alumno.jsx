import React from "react";
import { Calendar } from "../../components";

const Alumno = () => {
  // Obtener datos del alumno desde localStorage
  const user = JSON.parse(localStorage.getItem("userLogin")) || {};

  // Datos simulados para enriquecer el dashboard
  const comentarios = [
    { id: 1, texto: "¡Excelente progreso en las últimas clases! Sigue practicando el trote levantado." },
    { id: 2, texto: "Recuerda mantener la postura en los saltos y trabajar en la coordinación." }
  ];
  const temasEvaluar = [
    { id: 1, tema: "Transiciones al galope", puntos: 10 },
    { id: 2, tema: "Trote levantado", puntos: 8 },
    { id: 3, tema: "Control de riendas", puntos: 7 }
  ];
  const nivel = "Intermedio";

  // Nueva sección: Recursos útiles
  const recursos = [
    {
      id: 1,
      nombre: "Guía básica de equitación",
      url: "https://www.federacionecuestre.es/",
      descripcion: "Conceptos y técnicas esenciales para mejorar tu equitación."
    },
    {
      id: 2,
      nombre: "Video: Cómo mejorar el trote levantado",
      url: "https://www.youtube.com/watch?v=Qw8Qw8Qw8Qw",
      descripcion: "Video recomendado para perfeccionar tu técnica."
    }
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Nueva sección de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-900 text-white rounded-xl shadow flex flex-col items-center justify-center p-6">
          <span className="text-3xl mb-2">📅</span>
          <span className="font-bold text-lg">Días de clase</span>
          <span className="mt-1 text-base">{user.dias_horario || "No asignado"}</span>
        </div>
        <div className="bg-blue-700 text-white rounded-xl shadow flex flex-col items-center justify-center p-6">
          <span className="text-3xl mb-2">⏰</span>
          <span className="font-bold text-lg">Horario</span>
          <span className="mt-1 text-base">{user.horario || "No asignado"}</span>
        </div>
        <div className="bg-purple-700 text-white rounded-xl shadow flex flex-col items-center justify-center p-6">
          <span className="text-3xl mb-2">🏅</span>
          <span className="font-bold text-lg">Nivel</span>
          <span className="mt-1 text-base">{nivel}</span>
        </div>
      </div>

      {/* Grid principal */}
      <div className="grid md:grid-cols-1 gap-6">


      <Calendar user={user.user} />


        {/* Comentarios del profesor */}
        <section className="bg-white rounded-xl shadow p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
            Comentarios del profesor
          </h2>
          <ul className="space-y-2 text-gray-700">
            {comentarios.map((c) => (
              <li key={c.id} className="pl-2 border-l-4 border-blue-200">{c.texto}</li>
            ))}
          </ul>
        </section>
      </div>

      


      {/* Sección extra: Recursos útiles */}
      <section className="bg-white rounded-xl shadow p-6 mt-8">
        <h2 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
          Recursos útiles para tu aprendizaje
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

export default Alumno;