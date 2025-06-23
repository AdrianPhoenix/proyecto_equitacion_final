import React from "react";

const Contacto = () => {
  return (
    <section
      id="contacto"
      className="bg-background py-20 px-4 text-center min-h-[40vh] flex flex-col items-center"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-merriweather">
        Contáctanos
      </h2>
      <p className="text-text-light text-lg mb-8 max-w-2xl mx-auto">
        ¿Tienes dudas, quieres reservar una clase o necesitas más información? ¡Escríbenos o contáctanos directamente!
      </p>
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-4xl items-start justify-center">
        {/* Formulario */}
        <form className="flex-1 bg-white/90 p-10 rounded-3xl shadow-2xl flex flex-col gap-6 border-t-4 border-primary">
          <div>
            <label
              htmlFor="nombre"
              className="block font-bold text-primary mb-2 text-left font-merriweather"
            >
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              className="w-full p-3 border border-text-light rounded-lg text-lg bg-background text-custom-text transition-all focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block font-bold text-primary mb-2 text-left font-merriweather"
            >
              Correo electrónico:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-3 border border-text-light rounded-lg text-lg bg-background text-custom-text transition-all focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="mensaje"
              className="block font-bold text-primary mb-2 text-left font-merriweather"
            >
              Mensaje:
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows="4"
              required
              className="w-full p-3 border border-text-light rounded-lg text-lg bg-background text-custom-text transition-all focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-primary to-primary-hover text-white border-none py-4 px-8 rounded-full text-lg cursor-pointer shadow-md transition-transform hover:scale-105 hover:from-primary-hover hover:to-primary font-bold mt-2"
          >
            Enviar mensaje
          </button>
          {/* Mensaje de éxito (puedes implementar lógica luego) */}
          {/* <p className="text-green-600 font-semibold mt-2">¡Mensaje enviado correctamente!</p> */}
        </form>
        {/* Contacto directo */}
        <div className="flex-1 flex flex-col items-center md:items-start gap-6">
          <div className="bg-white/90 rounded-3xl shadow-xl border-4 border-primary/10 p-6 w-full max-w-xs text-left flex flex-col gap-4">
            <h3 className="text-xl font-bold text-primary mb-2 font-merriweather">Contacto directo</h3>
            <a
              href="mailto:info@academiaecuestre.com"
              className="flex items-center gap-3 text-primary font-semibold hover:underline"
            >
              <span role="img" aria-label="Correo">📧</span>
              info@academiaecuestre.com
            </a>
            <a
              href="https://wa.me/584123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-green-600 font-semibold hover:underline"
            >
              <span role="img" aria-label="WhatsApp">💬</span>
              +58 412-3456789
            </a>
            <div>
              <span className="block text-custom-text text-sm mt-2">
                Avenida Principal de Caracas, Sector Ecuestre, Caracas, Venezuela
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;