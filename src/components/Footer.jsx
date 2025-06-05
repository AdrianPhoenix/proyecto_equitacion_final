import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary-hover text-white pt-14 pb-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        {/* Logo y descripción */}
        <div className="flex flex-col items-center md:items-start">
          <a
            href="#"
            className="text-3xl font-bold mb-2 block no-underline font-merriweather tracking-tight"
          >
            Equitación
          </a>
          <p className="text-base mt-3 text-secondary max-w-xs">
            Vive la pasión ecuestre en Caracas. Clases, torneos y experiencias únicas en contacto con la naturaleza.
          </p>
          {/* Redes sociales */}
          <div className="flex gap-4 mt-5">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="18" height="18" x="3" y="3" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17" cy="7" r="1.5" />
              </svg>
            </a>
            <a
              href="https://wa.me/584123456789"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.13 1.6 5.93L0 24l6.22-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.63-.5-5.18-1.44l-.37-.22-3.69.96.99-3.59-.24-.38A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.25-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.43 0 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.62.69.22 1.32.19 1.82.12.56-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/>
              </svg>
            </a>
            <a
              href="mailto:info@academiaecuestre.com"
              aria-label="Email"
              className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="20" height="16" x="2" y="4" rx="3" />
                <path d="M22 6 12 13 2 6" />
              </svg>
            </a>
          </div>
        </div>
        {/* Enlaces rápidos */}
        <div>
          <h3 className="text-xl font-bold mb-5 font-merriweather">
            Enlaces Rápidos
          </h3>
          <ul className="list-none p-0 space-y-2">
            <li>
              <a
                href="#inicio"
                className="text-base text-white no-underline hover:text-secondary transition-colors"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#horarios"
                className="text-base text-white no-underline hover:text-secondary transition-colors"
              >
                Clases
              </a>
            </li>
            <li>
              <a
                href="#galeria"
                className="text-base text-white no-underline hover:text-secondary transition-colors"
              >
                Galería
              </a>
            </li>
            <li>
              <a
                href="#equinoterapia"
                className="text-base text-white no-underline hover:text-secondary transition-colors"
              >
                Equinoterapia
              </a>
            </li>
            <li>
              <a
                href="#noticias"
                className="text-base text-white no-underline hover:text-secondary transition-colors"
              >
                Noticias
              </a>
            </li>
            <li>
              <a
                href="#ubicacion"
                className="text-base text-white no-underline hover:text-secondary transition-colors"
              >
                Ubicación
              </a>
            </li>
            <li>
              <a
                href="#contacto"
                className="text-base text-white no-underline hover:text-secondary transition-colors"
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>
        {/* Contacto */}
        <div className="flex flex-col gap-3 items-center md:items-start">
          <h3 className="text-xl font-bold mb-5 font-merriweather">Contacto</h3>
          <p className="text-base flex items-center gap-2">
            <span role="img" aria-label="Ubicación">📍</span>
            Caracas, Venezuela
          </p>
          <a
            href="mailto:info@academiaecuestre.com"
            className="text-base flex items-center gap-2 hover:underline"
          >
            <span role="img" aria-label="Correo">📧</span>
            info@academiaecuestre.com
          </a>
          <a
            href="https://wa.me/584123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base flex items-center gap-2 text-green-400 hover:underline"
          >
            <span role="img" aria-label="WhatsApp">💬</span>
            +58 412-3456789
          </a>
        </div>
      </div>
      <div className="border-t border-white/20 mt-12 pt-6 text-center text-secondary text-sm">
        <p>© 2025 Equitación. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;