import React from "react";

const AcademiaSection = () => {
  return (
    <section className="w-full flex flex-col-reverse md:flex-row items-center justify-center gap-0 md:gap-8 py-16 md:py-24 bg-background">
      {/* Info */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start bg-white/90 text-custom-text p-8 md:p-12 rounded-t-3xl md:rounded-r-3xl md:rounded-t-none shadow-xl border-l-4 border-primary/20 gap-6">
        <img
          className="h-24 mb-2"
          src="./images/logo.png"
          alt="Logo de la Academia"
        />
        <h1 className="text-3xl md:text-5xl text-center md:text-left font-bold font-merriweather mb-4 text-primary">
          Escuela de Equitación del Ejército Negro Primero
        </h1>
        <p className="text-lg md:text-xl text-center md:text-left text-text-light">
          Somos una academia dedicada a la formación ecuestre con valores,
          disciplina y pasión por los caballos. Ofrecemos clases para todas las
          edades y niveles, en un entorno seguro y natural, guiados por
          instructores certificados y con amplia experiencia.
        </p>
        <a
          href="#"
          className="mt-4 inline-block py-3 px-8 bg-gradient-to-r from-primary to-primary-hover text-white rounded-full shadow-md font-bold transition-transform hover:scale-105 hover:from-primary-hover hover:to-primary focus:outline-none focus:ring-4 focus:ring-primary/40"
        >
          ¡Conoce más!
        </a>
      </div>
      {/* Imagen principal */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img
          src="./images/caballo1.jpeg"
          alt="Academia de Equitación"
          className="w-full h-72 md:h-[28rem] object-contain bg-white rounded-b-3xl md:rounded-l-3xl md:rounded-b-none shadow-lg border-4 border-primary/20 transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
        />
      </div>
    </section>
  );
};

export default AcademiaSection;
