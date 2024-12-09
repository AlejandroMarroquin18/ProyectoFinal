/**
 * @file Register.jsx
 * @description Componente que gestiona la lógica del registro de usuarios.
 * Este componente maneja el estado del formulario, la validación y la comunicación con el backend.
 * Utiliza el componente `RegisterUI` para renderizar la interfaz gráfica.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterUI from "./RegisterUI";
import request from "../../services/api";
import { useTranslation } from "react-i18next";

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

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [fieldErrors, setFieldErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    // Verificar si las contraseñas coinciden
    if (formData.password !== formData.confirmPassword) {
      setError(t("register.passwordMismatch"));
      return;
    }

    if (!formData.fullName.trim()) {
      setError(t("register.nameRequired"));
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError(t("register.invalidEmail"));
      return;
    }

    if (formData.password.length < 8) {
      setError(t("register.passwordLength"));
      return;
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;
    // Limpiar el error si las contraseñas coinciden
    setError("");
    setFieldErrors({});

    const requestBody = {
      displayName: formData.fullName,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await request(
        "/auth/create-user",
        "POST",
        requestBody,
        null
      );

      if (response.ok) {
        setSuccessMessage(t("register.successMessage"));
        setTimeout(() => {
          navigate("/"); // Redirige al login tras 3 segundos
        }, 3000);
      } else {
        const data = await response.json();
        setError(data.message || t("register.errorGeneral"));
      }
    } catch (error) {
      setError(t("register.networkError") + error.message);
    }
  };

  return (
    <RegisterUI
      formData={formData}
      error={error}
      successMessage={successMessage}
      fieldErrors={fieldErrors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      navigate={navigate}
    />
  );
}

export default Register;
