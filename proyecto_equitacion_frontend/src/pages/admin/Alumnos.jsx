import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiTrash2, FiPlus, FiUser, FiMail, FiClock, FiCalendar } from "react-icons/fi";

const daysOfWeek = [
  "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo",
];

const timeSlots = Array.from(
  { length: 17 },
  (_, i) => `${i + 7}:00 - ${i + 8}:00`
);

const FormularioAlumno = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  
  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        let { data } = await axios.get("http://localhost:4000/users");
        const alumnosAsignados = data
          .filter((u) => u.role === "alumno")
          .map((alumno) => {
            let horario = alumno.horario;
            if (typeof horario === "string") {
              try {
                horario = JSON.parse(horario);
              } catch (e) {
                console.warn("Horario malformado para alumno:", alumno.nombre, horario);
                horario = {};
              }
            }
            return { ...alumno, horario };
          });
        setAlumnos(alumnosAsignados);
      } catch (error) {
        console.error("Error al cargar alumnos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlumnos();
  }, []);

  const renderHorario = (horario) => {
    if (!horario || Object.keys(horario).length === 0)
      return <span className="text-gray-400 italic">Sin horario</span>;
    
    return (
      <div className="grid grid-cols-2 gap-1">
        {Object.entries(horario).map(([dia, horas]) => (
          <div key={dia} className="flex items-start">
            <span className="font-medium text-blue-600 mr-1">{dia.substring(0, 3)}:</span>
            <span className="text-gray-700 text-sm">
              {Array.isArray(horas) ? horas.map(h => h.split(' - ')[0]).join(', ') : String(horas)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const [profesoresDisponibles, setProfesoresDisponibles] = useState([]);
  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        let { data } = await axios.get("http://localhost:4000/users");
        const profesores = data.filter((u) => u.role === "profesor");
        setProfesoresDisponibles(profesores);
      } catch (error) {
        console.error("Error al cargar profesores:", error);
      }
    };
    fetchProfesores();
  }, []);

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    profesor: "",
    hora: {},
    diaSeleccionado: "",
    horaSeleccionada: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const agregarFranja = (e) => {
    e.preventDefault();
    const { diaSeleccionado, horaSeleccionada, hora } = form;
    if (!diaSeleccionado || !horaSeleccionada) return;
    
    // Verificar si la franja ya existe
    const franjaExistente = hora[diaSeleccionado]?.includes(horaSeleccionada);
    if (franjaExistente) {
      alert("Esta franja horaria ya está asignada para este día");
      return;
    }
    
    setForm({
      ...form,
      hora: {
        ...hora,
        [diaSeleccionado]: [...(hora[diaSeleccionado] || []), horaSeleccionada],
      },
      horaSeleccionada: "",
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/users", {
        user: form.email,
        password: "123456",
        role: "alumno",
        nombre: form.nombre,
        horario: form.hora,
        profesor: form.profesor,
      });
      
      setSuccessMessage("Alumno registrado correctamente");
      setTimeout(() => setSuccessMessage(null), 3000);
      
      // Actualizar la lista de alumnos
      const { data } = await axios.get("http://localhost:4000/users");
      const alumnosActualizados = data
        .filter((u) => u.role === "alumno")
        .map(alumno => ({
          ...alumno,
          horario: typeof alumno.horario === 'string' ? JSON.parse(alumno.horario) : alumno.horario
        }));
      setAlumnos(alumnosActualizados);
      
      setForm({
        nombre: "",
        email: "",
        profesor: "",
        hora: {},
        diaSeleccionado: "",
        horaSeleccionada: "",
      });
    } catch (error) {
      console.error("Error al registrar alumno:", error);
      alert("Ocurrió un error al registrar el alumno");
    }
  };

  return (
    <div className="min-h-[150vh] bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestión de Alumnos</h1>
        <p className="text-gray-600 mb-8">Registro y administración de estudiantes</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Formulario de registro */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-2 rounded-lg mr-4">
                <FiUser className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Registrar Nuevo Alumno</h2>
            </div>
            
            {successMessage && (
              <div className="mb-6 p-3 bg-green-100 text-green-700 rounded-lg">
                {successMessage}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      className="pl-10 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      placeholder="Nombre completo"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="pl-10 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profesor asignado</label>
                <select
                  name="profesor"
                  value={form.profesor}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecciona un profesor</option>
                  {profesoresDisponibles.map((prof) => (
                    <option key={prof.id} value={prof.nombre}>
                      {prof.nombre}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                  <FiClock className="mr-2 text-blue-500" />
                  Asignar Horario
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Día</label>
                    <select
                      name="diaSeleccionado"
                      value={form.diaSeleccionado}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecciona día</option>
                      {daysOfWeek.map((dia) => (
                        <option key={dia} value={dia}>
                          {dia}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Hora</label>
                    <select
                      name="horaSeleccionada"
                      value={form.horaSeleccionada}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecciona hora</option>
                      {timeSlots.map((hora) => (
                        <option key={hora} value={hora}>
                          {hora}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="self-end">
                    <button
                      onClick={agregarFranja}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                      type="button"
                    >
                      <FiPlus size={16} />
                      Agregar
                    </button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Horario asignado:</h4>
                  {Object.keys(form.hora).length === 0 ? (
                    <p className="text-gray-500 text-sm italic">No hay franjas horarias asignadas</p>
                  ) : (
                    <div className="space-y-2">
                      {Object.entries(form.hora).map(([dia, franjas]) =>
                        franjas.map((franja) => (
                          <div key={dia + franja} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                            <div className="flex items-center">
                              <FiCalendar className="text-blue-500 mr-2" />
                              <span className="font-medium text-gray-700">{dia}:</span>
                              <span className="ml-1 text-gray-600">{franja}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => eliminarFranja(dia, franja)}
                              className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                              title="Quitar franja"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition mt-6"
              >
                Registrar Alumno
              </button>
            </form>
          </div>
          
          {/* Lista de alumnos */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                <FiUser className="text-indigo-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Lista de Alumnos</h2>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-lg border border-gray-200">
                {alumnos.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No hay alumnos registrados
                  </div>
                ) : (
                  <div className="overflow-auto" style={{ maxHeight: "500px" }}>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horario</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {alumnos.map((alumno) => (
                          <tr key={alumno.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                              {alumno.nombre}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                              {alumno.user}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {renderHorario(alumno.horario)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioAlumno;