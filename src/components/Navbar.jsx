import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#contacto", label: "Contacto" },
];

const authLinks = [
  {
    to: "/login",
    label: "Login",
    style:
      "border border-primary text-primary bg-white hover:bg-primary hover:text-white",
  },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Cierra el menú al hacer click fuera
  useEffect(() => {
    const handler = (e) => {
      if (open && menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <header className="w-full bg-primary/90 backdrop-blur sticky top-0 z-50 shadow-md">
      <nav className="w-full">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold font-merriweather text-white tracking-tight"
          >
            Escuela de Equitación
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex gap-4">
              <li key="home">
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md text-white hover:bg-white/10 hover:text-white transition-colors font-lor cursor-pointer"
                >
                  Inicio
                </Link>
              </li>
              <li key="equitacion">
                <Link
                  to="/equitacion"
                  className="px-3 py-2 rounded-md text-white hover:bg-white/10 hover:text-white transition-colors font-lor cursor-pointer"
                >
                  Equitación
                </Link>
              </li>
              <li key="equinoterapia">
                <Link
                  to="/equinoterapia"
                  className="px-3 py-2 rounded-md text-white hover:bg-white/10 hover:text-white transition-colors font-lor cursor-pointer"
                >
                  Equinoterapia
                </Link>
              </li>
              {navLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="px-3 py-2 rounded-md text-white hover:bg-white/10  transition-colors font-lora"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex gap-2 ml-6">
              {authLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${item.style}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-3xl text-white focus:outline-none"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <span>&times;</span> : <span>&#9776;</span>}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          ref={menuRef}
          className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-200 ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={!open}
        >
          <nav
            className={`absolute top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-2xl flex flex-col gap-8 p-8 transition-transform duration-300 ${
              open ? "translate-x-0" : "translate-x-[100vw]"
            }`}
            role="menu"
            style={{ overflowX: "hidden" }}
          >
            <button
              className="self-end text-3xl text-primary mb-4"
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
            >
              &times;
            </button>
            <ul className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-primary hover:bg-primary/10 font-lora"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 mt-4">
              {authLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`block px-4 py-2 rounded-md text-center font-semibold transition-colors duration-200 ${item.style} cursor-pointer`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
