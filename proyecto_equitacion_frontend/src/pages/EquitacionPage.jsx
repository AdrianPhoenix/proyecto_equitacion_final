import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";

const EquitacionPage = () => {
  const location = useLocation();
  useEffect(() => {
    // Scroll to top when navigating to this page
    if (location.pathname === "/equitacion") {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <main className="bg-background min-h-screen w-full">
      {/* Hero */}
      <section className="w-full bg-gradient-to-br from-primary/90 to-primary-hover/80 py-24 px-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <img
          src="./images/caballo1.jpeg"
          alt="Equitación Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white font-merriweather mb-6 drop-shadow-lg">
            Vive la Experiencia de la Equitación
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-8 font-lora">
            Descubre el mundo ecuestre: clases, torneos, equinoterapia y una
            comunidad apasionada en Caracas, Venezuela.
          </p>
          <a
            href="#contacto"
            className="inline-block py-4 px-10 bg-gradient-to-r from-white/90 to-primary text-primary font-bold rounded-full shadow-lg text-lg transition-transform hover:scale-105 hover:from-primary hover:to-primary-hover hover:text-white"
          >
            ¡Reserva tu clase!
          </a>
        </div>
      </section>
      {/* Beneficios */}
      <section className="py-20 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div className="bg-white/90 rounded-3xl shadow-xl p-8 border-t-4 border-primary flex flex-col items-center">
          <span className="text-5xl mb-4">🏇</span>
          <h3 className="text-xl font-bold text-primary mb-2 font-merriweather">
            Clases para Todos
          </h3>
          <p className="text-custom-text">
            Desde principiantes hasta avanzados, aprende equitación con
            instructores certificados y caballos entrenados.
          </p>
        </div>
        <div className="bg-white/90 rounded-3xl shadow-xl p-8 border-t-4 border-primary flex flex-col items-center">
          <span className="text-5xl mb-4">💚</span>
          <h3 className="text-xl font-bold text-primary mb-2 font-merriweather">
            Equinoterapia
          </h3>
          <p className="text-custom-text">
            Terapia asistida con caballos para el bienestar físico, emocional y
            social. ¡Una experiencia transformadora!
          </p>
        </div>
        <div className="bg-white/90 rounded-3xl shadow-xl p-8 border-t-4 border-primary flex flex-col items-center">
          <span className="text-5xl mb-4">🏆</span>
          <h3 className="text-xl font-bold text-primary mb-2 font-merriweather">
            Torneos y Comunidad
          </h3>
          <p className="text-custom-text">
            Participa en torneos, eventos y vive la pasión ecuestre junto a una
            comunidad vibrante en Caracas.
          </p>
        </div>
      </section>

      {/* Costos y Horarios */}
      <section className="py-20 px-4 bg-white/90 border-y border-primary/10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 font-merriweather text-center">
          Costos y Horarios
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Horarios */}
          <div className="bg-background rounded-3xl shadow-xl p-8 border-t-4 border-primary flex flex-col items-center">
            <h3 className="text-xl font-bold text-primary mb-4 font-merriweather">
              Horarios de Clases
            </h3>
            <ul className="text-custom-text text-lg space-y-2">
              <li>
                <span className="font-semibold text-primary">
                  Lunes a Viernes:
                </span>{" "}
                8:00 am - 12:00 pm / 2:00 pm - 6:00 pm
              </li>
              <li>
                <span className="font-semibold text-primary">Sábados:</span>{" "}
                9:00 am - 1:00 pm
              </li>
              <li>
                <span className="font-semibold text-primary">Domingos:</span>{" "}
                Cerrado
              </li>
            </ul>
          </div>
          {/* Costos */}
          <div className="bg-background rounded-3xl shadow-xl p-8 border-t-4 border-primary flex flex-col items-center">
            <h3 className="text-xl font-bold text-primary mb-4 font-merriweather">
              Tarifas
            </h3>
            <ul className="text-custom-text text-lg space-y-2">
              <li>
                <span className="font-semibold text-primary">
                  Clase individual:
                </span>{" "}
                $20 USD
              </li>
              <li>
                <span className="font-semibold text-primary">
                  Mensualidad (8 clases):
                </span>{" "}
                $140 USD
              </li>
              <li>
                <span className="font-semibold text-primary">
                  Equinoterapia sesión:
                </span>{" "}
                $25 USD
              </li>
              <li>
                <span className="font-semibold text-primary">
                  Consulta por grupos y eventos especiales.
                </span>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-center text-text-light mt-8">
          <span className="font-semibold text-primary">* </span>
          Los precios pueden variar según el tipo de clase o terapia. Para más
          información y reservas,{" "}
          <a
            href="#contacto"
            className="text-primary hover:underline font-semibold"
          >
            contáctanos aquí
          </a>
          .
        </p>
      </section>
      {/* Galería */}
      <section className="py-20 px-4 bg-primary/5">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10 font-merriweather text-center">
          Galería de la Academia
        </h2>
        <div className="w-full max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[180px] md:auto-rows-[220px]">
          {[
            "./images/caballo1.jpeg",
            "./images/caballo2.jpeg",
            "./images/caballo3.jpeg",
            "./images/caballo4.jpeg",
            "./images/caballo5.jpeg",
            "./images/caballo6.jpg",
          ].map((src, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-3xl shadow-xl border-4 border-primary/10 group ${
                i % 3 === 0 ? "row-span-2" : "row-span-1"
              }`}
            >
              <img
                src={src}
                alt={`Galería equitación ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </section>
      {/* Ubicación */}
      <section className="py-20 px-4 text-center border-y border-solid border-primary/10 bg-background">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-merriweather">
          ¿Dónde estamos?
        </h2>
        <p className="text-text-light text-lg mb-8 max-w-2xl mx-auto">
          Nuestra academia se encuentra en{" "}
          <span className="text-primary font-bold">Caracas, Venezuela</span>.
          Ven a vivir la experiencia ecuestre en un entorno natural y seguro.
        </p>
        <div className="w-full max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-white border-4 border-primary/10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62815.07396447941!2d-66.9772222!3d10.4880107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a59a1e1a7b0b7%3A0x8c2a59a1e1a7b0b7!2sCaracas%2C%20Venezuela!5e0!3m2!1ses!2sve!4v1716740000000!5m2!1ses!2sve"
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Caracas"
            className="block w-full h-[220px] md:h-[320px]"
          ></iframe>
        </div>
      </section>
      {/* Call to action */}
      <section className="py-16 px-4 text-center bg-gradient-to-r from-primary to-primary-hover">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-merriweather">
          ¿Listo para comenzar tu aventura ecuestre?
        </h2>
        <p className="text-white/90 text-lg mb-8">
          Reserva tu clase o solicita más información. ¡Te esperamos!
        </p>
        <a
          href="#contacto"
          className="inline-block py-4 px-10 bg-white text-primary font-bold rounded-full shadow-lg text-lg transition-transform hover:scale-105 hover:bg-primary hover:text-white"
        >
          Contáctanos
        </a>
      </section>
    </main>
  );
};

export default EquitacionPage;
