import React, { useEffect, useState } from "react";
import axios from "axios"; // Asegúrate de tener axios instalado: npm install axios

// Niveles permitidos, puedes ajustar estos según tus necesidades
const NIVELES_PERMITIDOS = ["Principiante", "Intermedio", "Avanzado", "Experto"];

const AlumnosAsignados = ({ nombreProfesor }) => {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avisarAlumno, setAvisarAlumno] = useState(null); // { alumno, horarios }
  const [editandoAlumnoId, setEditandoAlumnoId] = useState(null); // ID del alumno que se está editando
  const [nuevoNivel, setNuevoNivel] = useState(""); // Nivel temporal para el alumno en edición

  useEffect(() => {
    const fetchAlumnos = async () => {
      setLoading(true);
      try {
        let { data } = await axios.get("http://localhost:4000/users");
        const alumnosAsignados = data
          .filter((u) => u.profesor_asignado === nombreProfesor)
          .map((alumno) => ({
            ...alumno,
            horario:
              typeof alumno.horario === "string"
                ? JSON.parse(alumno.horario)
                : alumno.horario,
          }));
        setAlumnos(alumnosAsignados);
      } catch (error) {
        console.error("Error al cargar alumnos:", error);
        setAlumnos([]);
      } finally {
        setLoading(false);
      }
    };
    if (nombreProfesor) {
      fetchAlumnos();
    } else {
      setLoading(false);
    }
  }, [nombreProfesor]);

  // Función para formatear el horario
  const renderHorario = (horario) => {
    if (!horario || Object.keys(horario).length === 0)
      return <span className="text-gray-400">Sin horario</span>;

    return (
      <ul className="text-left text-xs space-y-1">
        {Object.entries(horario).map(([dia, horas]) => (
          <li key={dia}>
            <span className="font-semibold text-blue-700">{dia}:</span>{" "}
            <span className="text-gray-700">
              {Array.isArray(horas) ? horas.join(", ") : String(horas)}
            </span>{" "}
          </li>
        ))}
      </ul>
    );
  };

  // --- Lógica para la edición de nivel ---

  const handleEditarNivel = (alumno) => {
    setEditandoAlumnoId(alumno.id);
    setNuevoNivel(alumno.nivel); // Carga el nivel actual al iniciar la edición
  };

  const handleGuardarNivel = async (alumnoId) => {
    // Buscar el alumno específico para obtener su 'user' o 'id' para la API
    const alumnoAActualizar = alumnos.find(a => a.id === alumnoId);
    if (!alumnoAActualizar) return;

    try {
      // Endpoint de ejemplo para actualizar el usuario (alumno)
      // Asumimos que tu backend tiene una ruta PUT /users/:id o /users/:userId
      // Y que acepta un objeto JSON con los campos a actualizar, como { nivel: "Nuevo Nivel" }
      await axios.put(`http://localhost:4000/users/alumno/${alumnoAActualizar.id}`, {
        nivel: nuevoNivel,
      });

      // Actualizar el estado de los alumnos en el frontend
      setAlumnos((prevAlumnos) =>
        prevAlumnos.map((a) =>
          a.id === alumnoId ? { ...a, nivel: nuevoNivel } : a
        )
      );
      setEditandoAlumnoId(null); // Sale del modo edición
      alert("Nivel actualizado correctamente."); // Retroalimentación simple
    } catch (error) {
      console.error("Error al actualizar el nivel del alumno:", error);
      alert(
        "Error al actualizar el nivel. Por favor, inténtalo de nuevo. Asegúrate de que el backend esté listo para aceptar la actualización."
      );
    }
  };

  const handleCancelarEdicion = () => {
    setEditandoAlumnoId(null);
    setNuevoNivel("");
  };

  // --- Modal para seleccionar y enviar aviso de horario (sin cambios relevantes en esta versión) ---
  const AvisarModal = ({ alumno, onClose }) => {
    const [enviando, setEnviando] = useState(false);
    const [mensaje, setMensaje] = useState("");

    let horarios = [];
    if (alumno.horario && Object.keys(alumno.horario).length > 0) {
      horarios = Object.entries(alumno.horario).flatMap(([dia, horas]) =>
        (Array.isArray(horas) ? horas : [horas]).map((h) => ({
          dia,
          hora: h,
        }))
      );
    }

    const handleEnviarAviso = async (dia, hora) => {
      setEnviando(true);
      setMensaje("");
      try {
        const response = await axios.post(
          "http://localhost:4000/enviar-aviso",
          {
            to: alumno.user, // Usar alumno.email si el campo 'user' no es un email
            subject: `Aviso de clase - ${dia} ${hora}`,
            text: `Hola ${alumno.nombre},\n\nTe informo que no podré asistir a la clase del ${dia} (${hora}). Por favor, revisa el horario para reprogramar.\n\nSaludos,\n${nombreProfesor}`,
          }
        );

        if (response.data.ok) {
          setMensaje("¡Correo enviado correctamente!");
          setTimeout(() => onClose(), 1500);
        } else {
          setMensaje("Error al enviar el correo. Inténtalo de nuevo.");
        }
      } catch (error) {
        console.error("Error al enviar el aviso:", error);
        setMensaje("Error de conexión al servidor. Inténtalo de nuevo.");
      } finally {
        setEnviando(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs">
          <h3 className="text-lg font-bold mb-4 text-blue-700 text-center">
            Selecciona el horario a avisar
          </h3>
          {horarios.length > 0 ? (
            <ul className="space-y-2 mb-4">
              {horarios.map((h, idx) => (
                <li key={`${h.dia}-${h.hora}-${idx}`}>
                  <button
                    onClick={() => handleEnviarAviso(h.dia, h.hora)}
                    className="block w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium text-center disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={enviando}
                  >
                    {enviando ? "Enviando..." : `${h.dia}: ${h.hora}`}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm mb-4 text-center">
              No hay horarios definidos para este alumno.
            </p>
          )}

          {mensaje && (
            <p
              className={`text-center text-sm mb-4 ${
                mensaje.includes("Error") ? "text-red-600" : "text-blue-600"
              }`}
            >
              {mensaje}
            </p>
          )}

          <button
            onClick={onClose}
            className="w-full py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold mt-2"
            disabled={enviando}
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-gray-600 font-medium">
          Cargando alumnos...
        </span>
      </div>
    );

  return (
    <div className="w-full  mx-auto px-4">
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">
          Alumnos asignados
        </h2>
        <p className="text-gray-500 text-center mb-4">
          Lista actualizada de alumnos bajo tu supervisión.
        </p>
        {alumnos.length === 0 ? (
          <div className="flex flex-col items-center py-10">
            <svg
              className="w-16 h-16 text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0l-3-3m3 3l3-3"
              />
            </svg>
            <p className="text-gray-600 text-lg">No hay alumnos asignados.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
              <thead>
                <tr>
                  <th className="px-4 py-3 bg-blue-50 text-blue-700 font-semibold text-sm uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 bg-blue-50 text-blue-700 font-semibold text-sm uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-4 py-3 bg-blue-50 text-blue-700 font-semibold text-sm uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-4 py-3 bg-blue-50 text-blue-700 font-semibold text-sm uppercase tracking-wider">
                    Nivel
                  </th>
                  <th className="px-4 py-3 bg-blue-50 text-blue-700 font-semibold text-sm uppercase tracking-wider">
                    Horario
                  </th>
                  <th className="px-4 py-3 bg-blue-50 text-blue-700 font-semibold text-sm uppercase tracking-wider">
                    Acciones
                  </th>{" "}
                  {/* Cambiado de "Avisar" a "Acciones" */}
                </tr>
              </thead>
              <tbody>
                {alumnos.map((alumno, idx) => (
                  <tr
                    key={alumno.id}
                    className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-2 text-center text-gray-700">
                      {alumno.id}
                    </td>
                    <td className="px-4 py-2 text-center text-gray-700">
                      {alumno.user}
                    </td>
                    <td className="px-4 py-2 text-center text-gray-700">
                      {alumno.nombre}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {editandoAlumnoId === alumno.id ? (
                        // Modo edición
                        <select
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          value={nuevoNivel}
                          onChange={(e) => setNuevoNivel(e.target.value)}
                        >
                          {NIVELES_PERMITIDOS.map((nivelOpt) => (
                            <option key={nivelOpt} value={nivelOpt}>
                              {nivelOpt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        // Modo visualización
                        <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                          {alumno.nivel}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {renderHorario(alumno.horario)}
                    </td>
                    <td className="px-4 py-2 text-center space-x-2 flex items-center justify-center">
                      {editandoAlumnoId === alumno.id ? (
                        <>
                          <button
                            onClick={() => handleGuardarNivel(alumno.id)}
                            className="inline-flex items-center px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium shadow"
                            title="Guardar Nivel"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={handleCancelarEdicion}
                            className="inline-flex items-center px-2 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition text-xs font-medium shadow"
                            title="Cancelar Edición"
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          {alumno.user ? (
                            <button
                              onClick={() => setAvisarAlumno(alumno)}
                              className="inline-flex items-center px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium shadow"
                              title="Avisar por correo"
                            >
                              <svg
                                className="w-3 h-3 mr-1"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16 12H8m8 0l-4-4m4 4l-4 4"
                                />
                              </svg>
                              Avisar
                            </button>
                          ) : (
                            <span className="text-gray-400 text-xs">
                              Sin email
                            </span>
                          )}
                          <button
                            onClick={() => handleEditarNivel(alumno)}
                            className="inline-flex items-center px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition text-xs font-medium shadow"
                            title="Editar Nivel"
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {avisarAlumno && (
        <AvisarModal
          alumno={avisarAlumno}
          onClose={() => setAvisarAlumno(null)}
        />
      )}
    </div>
  );
};

export default AlumnosAsignados;