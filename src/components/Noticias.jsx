import React from "react";

const noticias = [
  {
    img: "./images/torneo1.png",
    alt: "Torneo Nacional de Salto",
    fecha: "18 Mayo 2025",
    titulo: "Gran Torneo Nacional de Salto en Buenos Aires",
    resumen: "Jinetes de todo el país se dieron cita en el Club Hípico Argentino para disputar el Torneo Nacional de Salto, destacando el alto nivel de competencia y la camaradería entre los equipos.",
    link: "https://ejemplo.com/torneo-nacional-salto-2025"
  },
  {
    img: "./images/torneo2.png",
    alt: "Copa Federal de Equitación",
    fecha: "3 Abril 2025",
    titulo: "Copa Federal de Equitación: Resultados y Galería",
    resumen: "La Copa Federal reunió a los mejores exponentes de la equitación en una jornada llena de emoción y destrezas ecuestres. Consulta los resultados y revive los mejores momentos.",
    link: "https://ejemplo.com/copa-federal-equitacion-2025"
  },
  {
    img: "./images/torneo3.png",
    alt: "Torneo Juvenil",
    fecha: "22 Marzo 2025",
    titulo: "Torneo Juvenil de Equitación: Nuevos Talentos",
    resumen: "El Torneo Juvenil fue escenario para que jóvenes promesas demostraran su talento y pasión por la equitación, sorprendiendo al público y jueces con su desempeño.",
    link: "https://ejemplo.com/torneo-juvenil-equitacion-2025"
  }
];

const Noticias = () => {
  return (
    <section
      id="noticias"
      className="py-24 px-4 bg-background text-center min-h-[60vh] flex flex-col items-center"
    >
      <h2 className="text-5xl md:text-6xl font-extrabold text-primary mb-4 font-merriweather relative inline-block">
        Noticias de Torneos de Equitación
        <span className="block h-2 w-2/3 mx-auto bg-primary/30 rounded-full mt-2"></span>
      </h2>
      <p className="text-lg md:text-xl text-custom-text max-w-3xl mx-auto mb-14 font-lora">
        Descubre los resultados, momentos destacados y próximos eventos de los torneos de equitación más importantes del país.
      </p>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10">
        {noticias.map((n, i) => (
          <div
            key={i}
            className="bg-white/90 rounded-3xl shadow-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-3 hover:shadow-[0_8px_40px_0_rgba(0,0,0,0.18)] flex flex-col border-t-4 border-primary group"
          >
            <div className="relative overflow-hidden">
              <img
                src={n.img}
                alt={n.alt}
                className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 bg-primary/90 text-white text-xs px-4 py-1 rounded-full shadow font-semibold tracking-wide">
                {n.fecha}
              </span>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-lg md:text-xl font-bold text-custom-text my-4 font-merriweather">
                {n.titulo}
              </h3>
              <p className="text-base text-text-light mb-auto leading-relaxed">
                {n.resumen}
              </p>
              <a
                href={n.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 py-2 px-6 bg-primary text-white rounded-full shadow-md hover:bg-primary-hover transition-colors font-bold"
              >
                Leer más
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Noticias;