import React, { useState } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  const [videoError, setVideoError] = useState(false);

  return (
    <section
      id="banner"
      className="relative w-full min-h-[80vh] flex flex-col justify-center items-center text-center px-6 py-24 md:py-40 text-white overflow-hidden"
    >
      {/* Overlay para un contraste más dramático y moderno */}
      <div className="absolute inset-0 w-full h-full bg-black/80 z-10 pointer-events-none"></div>

      {/* Video de fondo o imagen fallback */}
      {!videoError ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10 opacity-50"
          poster="/images/caballo1.jpeg"
          onError={() => {
            setVideoError(true);
            console.error("Error cargando el video");
          }}
        >
          <source src="/videos/banner.mp4" type="video/mp4" />
          Tu navegador no soporta el video.
        </video>
      ) : (
        <img
          src="/images/caballo1.jpeg"
          alt="Banner fallback"
          className="absolute inset-0 w-full h-full object-cover -z-10 opacity-50"
        />
      )}
      {/* Contenido */}
      <div className="relative z-20 max-w-3xl mx-auto flex flex-col items-center animate-fade-in-up">
        <img
          src="/images/logo.png"
          alt="Logo Sociedad Negro Primero"
          className="h-24 mb-6 drop-shadow-lg"
        />
        <h1 className="font-display text-4xl sm:text-xl md:text-2xl lg:text-4xl mb-4 text-white drop-shadow-2xl font-extrabold tracking-tight leading-tight animate-slide-in-right">
          Escuela de Equitación del Ejército Bolivariano Negro Primero
        </h1>
        <p className="font-body text-sm sm:text-xl md:text-xl mb-6 drop-shadow-lg max-w-2xl animate-slide-in-left">
          Vive la{" "}
          <span className="bg-primary font-bold">pasión ecuestre</span> en
          Caracas.
          <br />
          Clases, equinoterapia y torneos en un entorno natural y seguro.
        </p>
        <ul className="flex flex-wrap justify-center gap-4 mb-10">
          <li className="bg-white/20 px-5 py-2 rounded-full text-lg font-semibold shadow">
            🏇 Clases para todas las edades
          </li>
          <li className="bg-white/20 px-5 py-2 rounded-full text-lg font-semibold shadow">
            💚 Equinoterapia profesional
          </li>
          <li className="bg-white/20 px-5 py-2 rounded-full text-lg font-semibold shadow">
            🏆 Torneos y comunidad
          </li>
        </ul>
        <Link
          to="/equitacion"
          className="inline-block py-4 px-12 bg-gradient-to-r from-primary to-emerald-600 text-white text-xl rounded-full shadow-xl font-bold transition-all duration-300 ease-in-out hover:scale-105 hover:from-teal-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-teal-500/50 uppercase tracking-wide"
        >
          Explorar Más sobre la equitación
        </Link>
      </div>
    </section>
  );
};

export default Banner;
