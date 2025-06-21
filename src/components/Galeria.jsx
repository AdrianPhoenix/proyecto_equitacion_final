import React from "react";

const images = [
  {
    src: "./images/caballo1.jpeg",
    alt: "Jinete y caballo saltando un obstáculo",
  },
  {
    src: "./images/caballo2.png",
    alt: "Retrato de un caballo marrón con brida",
  },
  {
    src: "./images/caballo3.jpg",
    alt: "Grupo de caballos pastando en un campo verde",
  },
  {
    src: "./images/caballo4.jpg",
    alt: "Detalle de las herraduras de un caballo",
  },
  {
    src: "./images/caballo5.jpg",
    alt: "Niña acariciando la nariz de un caballo",
  },
  {
    src: "./images/caballo6.jpg",
    alt: "Entrenamiento de doma clásica",
  },
  // Puedes agregar más imágenes aquí
];

const heights = [
  "row-span-2", // más alta
  "row-span-1",
  "row-span-1",
  "row-span-2", // más alta
  "row-span-1",
  "row-span-1",
];

const Galeria = () => {
  return (
    <section
      id="galeria"
      className="bg-background py-20 px-4 text-center min-h-[50vh] flex flex-col items-center"
    >
      <h3 className="text-4xl md:text-5xl font-bold text-custom-text mb-14 font-merriweather">
        Galería
      </h3>
      <div
        className="
          w-full max-w-6xl
          grid grid-cols-2 md:grid-cols-4 gap-6
          auto-rows-[180px] md:auto-rows-[220px]
        "
        style={{ display: "grid" }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className={`
              relative overflow-hidden rounded-3xl shadow-xl border-4 border-primary/10 group
              ${heights[i % heights.length]}
            `}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl"
              draggable={false}
            />
            <span className="absolute bottom-2 left-2 bg-white/80 text-primary text-xs px-3 py-1 rounded-full shadow font-semibold pointer-events-none">
              {img.alt}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Galeria;