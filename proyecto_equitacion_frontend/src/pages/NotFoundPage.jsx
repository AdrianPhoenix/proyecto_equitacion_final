import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-background px-4">
      <img
        src="/images/caballo1.jpeg"
        alt="Página no encontrada"
        className="w-40 h-40 object-cover rounded-full shadow-lg mb-8 opacity-70"
      />
      <h1 className="text-6xl font-extrabold text-primary mb-4 font-merriweather">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold text-custom-text mb-4">¡Ups! Página no encontrada</h2>
      <p className="text-lg text-text-light mb-8 max-w-xl text-center">
        La página que buscas no existe o fue movida. Puedes regresar al inicio o explorar otras secciones de la academia.
      </p>
      <Link
        to="/"
        className="py-3 px-8 bg-primary text-white rounded-full font-bold shadow-md text-lg hover:bg-primary-hover transition"
      >
        Volver al inicio
      </Link>
    </section>
  );
};

export default NotFoundPage;