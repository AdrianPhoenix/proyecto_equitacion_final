import React from "react";

const Ubicacion = () => {
  return (
    <section
      id="ubicacion"
      className="bg-background py-20 px-4 text-center border-y border-solid border-text-light min-h-[40vh] flex flex-col items-center"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-merriweather">
        ¿Dónde estamos?
      </h2>
      <p className="text-text-light text-lg mb-6 max-w-2xl mx-auto">
        Nuestra academia se encuentra en un entorno natural privilegiado en <span className="text-primary font-bold">Caracas, Venezuela</span>. Ven a visitarnos y vive la experiencia ecuestre en un ambiente seguro y rodeado de naturaleza.
      </p>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl items-center justify-center">
        <div className="flex-1 flex flex-col items-center md:items-start mb-6 md:mb-0">
          <div className="bg-white/90 rounded-3xl shadow-xl border-4 border-primary/10 p-6 w-full max-w-md text-left">
            <h3 className="text-2xl font-bold text-primary mb-2 font-merriweather">Dirección</h3>
            <p className="text-custom-text mb-4">
              Avenida Principal de Caracas,<br />
              Sector Ecuestre,<br />
              Caracas, Venezuela
            </p>
            <h4 className="text-lg font-semibold text-primary mb-1">Contacto</h4>
            <p className="text-custom-text">
              Tel: <a href="tel:+582123456789" className="text-primary hover:underline">+58 212-3456789</a><br />
              Email: <a href="mailto:info@academiaecuestre.com" className="text-primary hover:underline">info@academiaecuestre.com</a>
            </p>
          </div>
        </div>
        <div className="flex-1 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl bg-white border-4 border-primary/10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62815.07396447941!2d-66.9772222!3d10.4880107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a59a1e1a7b0b7%3A0x8c2a59a1e1a7b0b7!2sCaracas%2C%20Venezuela!5e0!3m2!1ses!2sve!4v1716740000000!5m2!1ses!2sve"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Caracas"
            className="block w-full h-[220px] md:h-[350px]"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Ubicacion;