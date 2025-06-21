import React from "react";

const beneficios = [
  "Mejora física y motriz",
  "Desarrollo emocional",
  "Fomenta la autoestima",
  "Conexión con la naturaleza",
  "Inclusión social",
  "Reducción del estrés",
];

const EquinoterapiaPage = () => {
  return (
    <main className="bg-background min-h-screen w-full">
      {/* Hero */}
      <section className="w-full bg-gradient-to-br from-primary/90 to-primary-hover/80 py-24 px-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <img
          src="./images/equinoterapia.png"
          alt="Equinoterapia Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white font-merriweather mb-6 drop-shadow-lg">
            Equinoterapia en Caracas
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-8 font-lora">
            Vive una experiencia transformadora que une la nobleza del caballo con el bienestar físico, emocional y social de las personas.
          </p>
          <a
            href="#contacto"
            className="inline-block py-4 px-10 bg-gradient-to-r from-white/90 to-primary text-primary font-bold rounded-full shadow-lg text-lg transition-transform hover:scale-105 hover:from-primary hover:to-primary-hover hover:text-white"
          >
            Solicita información
          </a>
        </div>
      </section>

      {/* ¿Qué es la equinoterapia? */}
      <section className="py-20 px-4 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1">
          <img
            src="./images/caballo1.jpeg"
            alt="Sesión de equinoterapia"
            className="rounded-3xl shadow-2xl border-4 border-primary/20 w-full object-cover h-72 md:h-[24rem] mb-8 md:mb-0"
          />
        </div>
        <div className="flex-1 text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-merriweather">
            ¿Qué es la equinoterapia?
          </h2>
          <p className="text-lg md:text-xl text-text-light mb-6 font-lora">
            La equinoterapia es una terapia asistida con caballos que ayuda a mejorar la calidad de vida de personas con diversas condiciones físicas, emocionales y cognitivas. Es una oportunidad única para crecer, sanar y conectar con la naturaleza a través de la relación con estos animales extraordinarios.
          </p>
          <ul className="flex flex-wrap gap-3 mb-4">
            {beneficios.map((b) => (
              <li
                key={b}
                className="bg-primary/10 text-primary px-4 py-2 rounded-full text-base font-semibold shadow-sm border border-primary/20"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 px-4 bg-primary/5">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10 font-merriweather text-center">
          Testimonios
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white/90 rounded-3xl shadow-xl p-8 border-t-4 border-primary flex flex-col">
            <p className="text-lg text-custom-text mb-4 font-lora">
              “La equinoterapia ha sido fundamental en el desarrollo de mi hijo. Ha mejorado su confianza y motricidad de una manera increíble.”
            </p>
            <span className="font-bold text-primary">María G.</span>
          </div>
          <div className="bg-white/90 rounded-3xl shadow-xl p-8 border-t-4 border-primary flex flex-col">
            <p className="text-lg text-custom-text mb-4 font-lora">
              “Gracias a las sesiones, he logrado reducir mi ansiedad y encontrar un espacio de paz junto a los caballos.”
            </p>
            <span className="font-bold text-primary">Carlos R.</span>
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section className="py-20 px-4 text-center border-y border-solid border-primary/10 bg-background">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-merriweather">
          ¿Dónde estamos?
        </h2>
        <p className="text-text-light text-lg mb-8 max-w-2xl mx-auto">
          Nuestras sesiones de equinoterapia se realizan en <span className="text-primary font-bold">Caracas, Venezuela</span>, en un entorno natural y seguro.
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
          ¿Quieres saber más sobre equinoterapia?
        </h2>
        <p className="text-white/90 text-lg mb-8">
          Contáctanos para reservar una sesión o recibir información personalizada.
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

export default EquinoterapiaPage;