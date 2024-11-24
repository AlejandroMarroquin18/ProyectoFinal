import React from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      {/* Título */}
      <h1 style={{ marginBottom: "3rem" }}>Regístrate Gratis</h1>

      {/* Formulario */}
      <form className="register-form">
        {/* Nombre Completo */}
        <input
          type="text"
          placeholder="Nombre Completo"
          style={{ marginBottom: "2rem" }}
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Correo electrónico"
          style={{ marginBottom: "2rem" }} 
          required
        />

        {/* Contraseña */}
        <input
          type="password"
          placeholder="Contraseña"
          style={{ marginBottom: "2rem" }}
          required
        />

        {/* Confirmar Contraseña */}
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          style={{ marginBottom: "2rem" }}
          required
        />

        {/* Botón Registrar */}
        <button type="submit" style={{ marginBottom: "2rem" }}>
          Registrar
        </button>
      </form>

      {/* Iniciar sesión */}
      <div style={{ marginTop: "1.5rem" }}>
        <p style={{ display: "inline", marginRight: "0.5rem" }}>
          ¿Ya tienes cuenta?
        </p>
        <button
          type="button"
          onClick={() => navigate("/")}
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
          Inicia sesión
        </button>
      </div>
    </div>
  );
}

export default Register;
