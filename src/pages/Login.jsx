import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Importa el hook de autenticación

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Para el estado de carga del botón

  const { login } = useAuth(); // Obtiene la función de login del contexto
  const navigate = useNavigate(); // Hook para la navegación

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    // 1. Validación básica del formulario
    if (!username.trim() || !password.trim()) {
      setError("Por favor, ingresa tu nombre de usuario y contraseña.");
      return;
    }

    setError(""); // Limpia cualquier error previo
    setLoading(true); // Activa el estado de carga

    try {
      // 2. Intenta iniciar sesión usando la función del contexto
      const success = await login(username, password);

      if (success) {
        // 3. Si el login es exitoso, redirige al dashboard
        navigate("/dashboard", { replace: true }); // 'replace: true' evita volver al login con el botón de atrás
      } else {
        // Si la función de login devuelve false (credenciales incorrectas)
        setError("Nombre de usuario o contraseña incorrectos.");
      }
    } catch (err) {
      // Manejo de errores de la API o de la red
      console.error("Error durante el login:", err);
      setError(
        "Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo."
      );
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
  };

  return (
    <section className="h-[90vh] flex items-center justify-center bg-gradient-to-br from-primary/10 to-background px-4">
      <div className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl p-8 md:p-12 border-t-4 border-primary flex flex-col items-center">
        <img
          src="./images/logo.png"
          alt="Logo Equitación"
          className="h-20 mb-6"
        />
        <h2 className="text-3xl font-bold text-primary font-merriweather mb-2">
          Iniciar Sesión
        </h2>
        <p className="text-text-light mb-8 text-center">
          Accede a tu cuenta para reservar clases, ver tus horarios y más.
        </p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div>
            <label
              htmlFor="email"
              className="block text-primary font-bold mb-2 font-merriweather"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-3 border border-text-light rounded-lg text-lg bg-background text-custom-text transition-all focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
              placeholder="tucorreo@email.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-primary font-bold mb-2 font-merriweather"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full p-3 border border-text-light rounded-lg text-lg bg-background text-custom-text transition-all focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          {loading ? (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-primary to-primary-hover text-white rounded-full font-bold text-lg shadow-md transition-transform hover:scale-105 hover:from-primary-hover hover:to-primary focus:outline-none focus:ring-4 focus:ring-primary/40"
            >
              Ingresar
            </button>
          )}
        </form>
        <div className="w-full flex flex-col md:flex-row justify-between items-center mt-6 gap-2">
          <a href="#" className="text-primary hover:underline text-sm">
            ¿Olvidaste tu contraseña?
          </a>
          <a
            href="/register.html"
            className="text-primary font-bold hover:underline text-sm"
          >
            ¿No tienes cuenta? Regístrate
          </a>
        </div>
      </div>
    </section>
  );
};

export default Login;
