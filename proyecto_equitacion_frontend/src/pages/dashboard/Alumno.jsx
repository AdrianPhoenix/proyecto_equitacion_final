import React from "react";
import { Calendar } from "../../components";

const Alumno = () => {
  // Obtener datos del alumno desde localStorage
  const user = JSON.parse(localStorage.getItem("userLogin")) || {};

  // Datos simulados para enriquecer el dashboard

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Nueva sección de resumen */}

      {/* Grid principal */}
      <div className="grid md:grid-cols-1 gap-6">
        <Calendar user={user.user} />
      </div>
    </div>
  );
};

export default Alumno;
