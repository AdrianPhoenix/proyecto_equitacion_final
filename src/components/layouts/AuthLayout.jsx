// src/layouts/AuthLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';

const AuthLayout = () => {
  return (
    <div className="h-screen grid grid-cols-[20%_1fr] bg-gray-100 text-black relative">

        <Sidebar />

        <Outlet />

    </div>
  );
};

export default AuthLayout;