import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Limpiar el error si las contraseñas coinciden
    setError("");

    // Aquí se enviaría el formulario a un servidor (actualmente solo lo mostramos en consola)
    console.log(formData);
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
        <h1 style={{ marginBottom: "2rem" }}>Regístrate Gratis</h1>

        {/* Formulario */}
        <form className="register-form" onSubmit={handleSubmit}>
          {/* Nombre Completo */}
          <input
            type="text"
            placeholder="Nombre Completo"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            style={{ marginBottom: "1.5rem", padding: "0.75rem", width: "80%" }}
            required
          />

          {/* Correo electrónico */}
          <input
            type="email"
            placeholder="Correo electrónico"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ marginBottom: "1.5rem", padding: "0.75rem", width: "80%" }}
            required
          />

          {/* Contraseña */}
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ marginBottom: "1.5rem", padding: "0.75rem", width: "80%" }}
            required
          />

          {/* Confirmar Contraseña */}
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={{ marginBottom: "1.5rem", padding: "0.75rem", width: "80%" }}
            required
          />

          {/* Mensaje de error */}
          {error && (
            <p style={{ color: "red", marginBottom: "1.5rem" }}>{error}</p>
          )}

          {/* Botón de Registrar */}
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
            Registrar
          </button>
        </form>

        {/* Botón de Iniciar sesión */}
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
    </div>
  );
}

export default Register;
