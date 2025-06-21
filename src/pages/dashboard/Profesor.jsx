import React, { useState } from "react";
// import axios from "axios"; // Descomenta si necesitas hacer llamadas a la API aquí
import AlumnosAsignados from "../../components/AlumnosAsignados";

const Profesor = () => {
  // Obtener datos del profesor desde localStorage
  const user = JSON.parse(localStorage.getItem("userLogin")) || {};

  // --- Datos Simulados para los Caballos ---
  // NOTA: Para un dashboard real, estos datos deberían venir de una API

  const caballosDisponibles = [
    {
      id: 1,
      nombre: "Max",
      edad: "2 años",
      establo: "Establo 1",
    },
    {
      id: 2,
      nombre: "Luna",
      edad: "1 año",
      establo: "Establo 2",
    },
    {
      id: 3,
      nombre: "Paramacay",
      edad: "3 años",
      establo: "Establo 3",
    },
    {
      id: 4,
      nombre: "Moro",
      edad: "2 años",
      establo: "Establo 4",
    },
    {
      id: 5,
      nombre: "Mini Max",
      edad: "9 meses",
      establo: "Establo 5",
    },
  ];

  // Nuevo estado para almacenar los IDs de los caballos seleccionados
  const [selectedHorses, setSelectedHorses] = useState([]);

  // Función para manejar el cambio en el checkbox
  const handleHorseSelection = (horseId) => {
    setSelectedHorses((prevSelectedHorses) => {
      if (prevSelectedHorses.includes(horseId)) {
        // Si ya está seleccionado, lo quitamos
        return prevSelectedHorses.filter((id) => id !== horseId);
      } else {
        // Si no está seleccionado, lo añadimos
        return [...prevSelectedHorses, horseId];
      }
    });
  };

  // Obtener los objetos completos de los caballos seleccionados para mostrarlos
  const horsesForClass = caballosDisponibles.filter((horse) =>
    selectedHorses.includes(horse.id)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-8 overflow-hidden">
      <div className="max-w-full grid grid-rows-[20%_40%_1fr] mx-auto space-y-8">
        {/* Encabezado del Dashboard */}
        <header className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Bienvenido,{" "}
            <span className="text-blue-700">{user.nombre || "Profesor"}</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Panel de control para gestionar tus alumnos y recursos.
          </p>
        </header>

        {/* --- */}

        {/* Contenido principal: Alumnos Asignados y Caballos Disponibles */}
        <div className="w-full h-full overflow-auto  grid grid-cols-1">
          {/* Alumnos Asignados */}
          <AlumnosAsignados nombreProfesor={user.nombre} />
        </div>
        <div className="w-full h-full grid grid-cols-2 gap-1 overflow-y-scroll">
          {/* Sección de Caballos Disponibles */}
          <section className="w-full h-full overflow-auto bg-white rounded-xl shadow-lg p-2 flex flex-col">
            <h2 className="text-2xl font-bold text-blue-800 mb-5 flex items-center">
              <svg
                className="w-7 h-7 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 18l-4 4H5a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v6m0 0l-4-4m4 4l-4-4"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4c.667 0 1.295.275 1.765.75L16 8l-3.235 3.25C12.91 12.395 12.45 12 12 12c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V7.5M10 9l2-2"
                />
              </svg>
              Caballos Disponibles
            </h2>
            {caballosDisponibles.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="px-4 py-3 text-left text-blue-700 font-semibold text-sm uppercase tracking-wider">
                        Elegir
                      </th>
                      <th className="px-4 py-3 text-left text-blue-700 font-semibold text-sm uppercase tracking-wider">
                        <span className="sr-only">Imagen</span>
                      </th>
                      <th className="px-4 py-3 text-left text-blue-700 font-semibold text-sm uppercase tracking-wider">
                        Establo
                      </th>
                      <th className="px-4 py-3 text-left text-blue-700 font-semibold text-sm uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-4 py-3 text-left text-blue-700 font-semibold text-sm uppercase tracking-wider">
                        Edad
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {caballosDisponibles.map((caballo, idx) => (
                      <tr
                        key={caballo.id}
                        className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                            checked={selectedHorses.includes(caballo.id)}
                            onChange={() => handleHorseSelection(caballo.id)}
                          />
                        </td>
                        <td className="px-4 py-3">
                          <img
                            src={"/images/icon_caballo.png"} // Asegúrate de que esta ruta sea correcta para tu `public` folder
                            alt={`Icono de ${caballo.nombre}`}
                            className="h-8 w-8 object-contain"
                          />
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-medium">
                          {caballo.establo}
                        </td>
                        <td className="px-4 py-3 text-blue-700 font-bold">
                          {caballo.nombre}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {caballo.edad}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500 italic">
                No hay caballos disponibles en este momento.
              </div>
            )}
          </section>
          {/* Nueva Sección: Caballos Seleccionados para la Clase */}
          <div className="w-full h-full overflow-y-scroll">
            {horsesForClass.length > 0 && (
              <section className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-blue-800 mb-5 flex items-center">
                  <svg
                    className="w-7 h-7 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Caballos Seleccionados para la Clase
                </h2>
                <ul className="space-y-3">
                  {horsesForClass.map((horse) => (
                    <li
                      key={horse.id}
                      className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-lg flex items-center gap-3"
                    >
                      <img
                        src={"/images/icon_caballo.png"} // Misma ruta de icono
                        alt={`Icono de ${horse.nombre}`}
                        className="h-6 w-6 object-contain"
                      />
                      <div className="text-gray-800">
                        <span className="font-bold text-blue-700">
                          {horse.nombre}
                        </span>{" "}
                        (Establo: {horse.establo}, Edad: {horse.edad})
                      </div>
                    </li>
                  ))}
                </ul>
                {/* Opcional: Un botón para "Confirmar" o "Guardar" la selección */}
                <div className="mt-6 text-center">
                  <button className="px-6 py-2 bg-blue-700 text-white font-semibold rounded-lg shadow hover:bg-blue-800 transition duration-300">
                    Confirmar Selección de Caballos
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profesor;
