import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <h1 style={{ marginBottom: "12rem" }}>Iniciar Sesión</h1>

      {/* Formulario */}
      <form className="login-form">
        {/* Email */}
        <input style={{ marginBottom: "3rem" }} type="email" placeholder="Correo electrónico" required />

        {/* Contraseña */}
        <input style={{ marginBottom: "3rem" }} type="password" placeholder="Contraseña" required />

        {/* ¿Olvidaste tu contraseña? */}
        <button
          type="button"
          style={{
            background: "none",
            color: "#007bff",
            fontSize: "0.9em",
            fontWeight: "400",
            margin: "0.5em 0",
            marginBottom: "3rem",
            textDecoration: "underline",
            border: "none",
            cursor: "pointer",
          }}
        >
          ¿Olvidaste tu contraseña?
        </button>

        {/* Botón Iniciar Sesión */}
        <button onClick={() => navigate("/home")} type="submit" style={{ marginTop: "1rem" }}>
          Iniciar Sesión
        </button>
      </form>

      {/* Registrarse */}
      <div style={{ marginTop: "1rem" }}>
        <p style={{ display: "inline", marginRight: "0.5rem" }}>
          ¿No tienes cuenta?
        </p>
        <button
          type="button"
          onClick={() => navigate("/register")}
          style={{
            padding: "0.5em 1em",
            fontSize: "1em",
            backgroundColor: "#007bff",
            color: "#ffffff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Regístrate
        </button>
      </div>
    </div>
  );
}

export default Login;
