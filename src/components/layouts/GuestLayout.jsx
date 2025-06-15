// src/layouts/GuestLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const GuestLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* Aquí se renderizarán las rutas hijas */}
    </>
  );
};

export default GuestLayout;
