import React, { useState, useEffect } from "react";
import axios from "axios";

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

const Calendar = ({ user }) => {
  const [selectedSlots, setSelectedSlots] = useState({});

  // Cargar horario del usuario desde el backend al montar el componente
  useEffect(() => {
    const fetchHorario = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/${user}`);
        // Suponiendo que el backend responde con { horario: ... }
        const data = response.data;
        const horarioRecibido =
          typeof data.horario === "string"
            ? JSON.parse(data.horario)
            : data.horario;
        setSelectedSlots(horarioRecibido || {});
      } catch (error) {
        console.error("Error al cargar el horario:", error);
      }
    };
    fetchHorario();
  }, [user]);

  const handleSlotClick = (day, time) => {
    setSelectedSlots((prevSelectedSlots) => {
      const newSelectedSlots = { ...prevSelectedSlots };
      if (!newSelectedSlots[day]) {
        newSelectedSlots[day] = [];
      }
      if (newSelectedSlots[day].includes(time)) {
        newSelectedSlots[day] = newSelectedSlots[day].filter((t) => t !== time);
      } else {
        newSelectedSlots[day] = [...newSelectedSlots[day], time];
      }
      return { ...newSelectedSlots };
    });
  };

  const limpiarHorario = (selectedSlots) => {
    const limpio = {};
    daysOfWeek.forEach((dia) => {
      if (Array.isArray(selectedSlots[dia]) && selectedSlots[dia].length > 0) {
        limpio[dia] = selectedSlots[dia];
      }
    });
    return limpio;
  };

  const actualizarHorario = async () => {
    console.log("Horario a enviar:", selectedSlots);
    const horarioParaEnviar = limpiarHorario(selectedSlots);
    console.log("Horario limpio:", horarioParaEnviar);
    // Guardar el horario actualizado en la bd
    const response = await axios.put("http://localhost:4000/users", {
      user: user,
      horario: horarioParaEnviar,
    });
    alert("Horario actualizado correctamente");
    return response;
  };

  return (
    <div className="font-sans p-5 max-w-5xl mx-auto border border-gray-300 rounded-lg shadow-md bg-white mt-5">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
        Horario Semanal
      </h2>

      <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-300">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Tu Horario Seleccionado:
        </h3>
        {Object.keys(selectedSlots).length === 0 ||
        Object.values(selectedSlots).every((arr) => arr.length === 0) ? (
          <p className="text-gray-500">
            No has seleccionado ninguna franja horaria.
          </p>
        ) : (
          <ul className="list-none p-0">
            {daysOfWeek.map(
              (day) =>
                selectedSlots[day] &&
                selectedSlots[day].length > 0 && (
                  <li
                    key={day}
                    className="mb-2 pb-1 border-b border-dashed border-gray-200 last:border-b-0"
                  >
                    <strong className="text-gray-800">{day}:</strong>
                    <span className="text-gray-600">
                      {" "}
                      {selectedSlots[day].sort().join(", ")}
                    </span>
                  </li>
                )
            )}
            <button
              className="bg-primary text-white px-5 py-2 rounded-md cursor-pointer"
              onClick={actualizarHorario}
            >
              Actualizar Horario
            </button>
          </ul>
        )}
      </div>
      <div
        className="grid border border-gray-200 rounded-md overflow-hidden"
        style={{
          gridTemplateColumns: `100px repeat(${timeSlots.length}, 1fr)`,
        }}
      >
        <div className="bg-gray-100 border-b border-r border-gray-300"></div>
        {timeSlots.map((time) => (
          <div
            key={time}
            className="bg-gray-100 font-semibold p-2 text-center border-b border-r border-gray-300
                       flex items-end justify-center text-xs h-28 transform rotate-180 [writing-mode:vertical-lr]"
          >
            {time}
          </div>
        ))}
        {daysOfWeek.map((day) => (
          <React.Fragment key={day}>
            <div className="bg-gray-100 font-semibold pl-4 py-2 border-r border-gray-300 flex items-center">
              {day}
            </div>
            {timeSlots.map((time) => (
              <div
                key={`${day}-${time}`}
                className={`w-full h-10 bg-gray-50 border border-gray-200 cursor-pointer
                            transition duration-200 ease-in-out hover:bg-gray-200
                            ${
                              selectedSlots[day]?.includes(time)
                                ? "bg-green-500 border-green-500 text-white"
                                : ""
                            }`}
                onClick={() => handleSlotClick(day, time)}
              ></div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
