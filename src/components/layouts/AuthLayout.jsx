// src/layouts/AuthLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

        <Sidebar />

        <Outlet />

    </div>
  );
};

export default AuthLayout;