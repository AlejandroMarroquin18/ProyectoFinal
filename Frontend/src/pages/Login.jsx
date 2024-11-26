import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí podrías hacer la validación con el backend, por ahora solo mostramos un error si los campos están vacíos
    if (!email || !password) {
      setError("Por favor, ingresa tu correo y contraseña.");
      return;
    }

    // Limpiar el error si la validación es exitosa
    setError("");

    // Enviar al usuario a la página principal si los datos son correctos
    navigate("/home");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* Card */}
      <div
        style={{
          width: "400px",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          textAlign: "center",
          border: "0.5px solid #007bff",
        }}
      >
        {/* Título */}
        <h1 style={{ marginBottom: "2rem" }}>Iniciar Sesión</h1>

        {/* Formulario */}
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Correo electrónico */}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "1.5rem", padding: "0.75rem", width: "80%" }}
            required
          />

          {/* Contraseña */}
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "1.5rem", padding: "0.75rem", width: "80%" }}
            required
          />

          {/* Mensaje de error */}
          {error && <p style={{ color: "red", marginBottom: "1.5rem" }}>{error}</p>}

          {/* Botón Iniciar Sesión */}
          <button
            type="submit"
            style={{
              padding: "0.5em 1em",
              width: "50%",
              backgroundColor: "#007bff",
              color: "#ffffff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1em",
            }}
          >
            Iniciar Sesión
          </button>
        </form>

        {/* ¿Olvidaste tu contraseña? */}
        <button
          type="button"
          style={{
            background: "none",
            color: "#007bff",
            fontSize: "0.9em",
            fontWeight: "400",
            margin: "1.5em 0",
            textDecoration: "underline",
            border: "none",
            cursor: "pointer",
          }}
        >
          ¿Olvidaste tu contraseña?
        </button>

        {/* Registrarse */}
        <div style={{ marginTop: "1.5rem" }}>
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
    </div>
  );
}

export default Login;
