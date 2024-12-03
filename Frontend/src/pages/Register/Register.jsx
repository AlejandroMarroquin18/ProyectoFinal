/**
 * @file Register.jsx
 * @description Componente que gestiona la lógica del registro de usuarios.
 * Este componente maneja el estado del formulario, la validación y la comunicación con el backend.
 * Utiliza el componente `RegisterUI` para renderizar la interfaz gráfica.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterUI from "./RegisterUI";

/**
 * Componente funcional Register
 * @description Gestiona la lógica del formulario de registro, incluyendo la validación y el envío de datos al servidor.
 * @returns {JSX.Element} - El JSX que representa el componente de registro con la lógica aplicada.
 */
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Limpiar el error si las contraseñas coinciden
    setError("");

    const requestBody = {
      displayName: formData.fullName,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch("http://localhost:3000/auth/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Error al comunicarse con el servidor.");
      }

    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <RegisterUI
      formData={formData}
      error={error}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      navigate={navigate}
    />
  );
}

export default Register;