/**
 * @file Login.jsx
 * @description Componente que gestiona la lógica del inicio de sesión de usuarios.
 * Este componente maneja el estado del formulario, la autenticación mediante Firebase,
 * y la validación de usuario en el backend. Utiliza el componente `LoginUI` para renderizar la interfaz gráfica.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginUI from "./LoginUI";
import loginFunctions from "./loginFunctions";
import { useTranslation } from "react-i18next";

/**
 * Componente funcional Login
 * @description Gestiona la lógica del formulario de inicio de sesión, incluyendo la autenticación con Firebase y
 * la validación del token en el backend. Si la autenticación es exitosa, redirige al usuario a la página de inicio.
 * @returns {JSX.Element} - El JSX que representa el componente de inicio de sesión con la lógica aplicada.
 */
function Login() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Función para mostrar errores como pop-ups
  const displayError = (message) => {
    setError(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // El pop-up desaparece tras 3 segundos
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const idToken = await loginFunctions.handleEmailLogin(email, password);
      if (idToken) {
        loginFunctions.sendTokenToBackend(idToken);
        navigate("/home");
      } else {
        displayError(t("login.errorLogin"));
      }
    } catch (err) {
      displayError(t("login.errorGeneral"));
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const idToken = await loginFunctions.handleGoogleLogin();
      if (idToken) {
        loginFunctions.sendTokenToBackend(idToken);
        navigate("/home");
      } else {
        displayError(t("login.errorGoogle"));
      }
    } catch (err) {
      displayError(t("login.errorGoogle"));
    }
    setLoading(false);
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    try {
      const idToken = await loginFunctions.handleFacebookLogin();
      if (idToken) {
        loginFunctions.sendTokenToBackend(idToken);
        navigate("/home");
      } else {
        displayError(t("login.errorFacebook"));
      }
    } catch (err) {
      displayError(t("login.errorFacebook"));
    }
    setLoading(false);
  };

  const handlePassword = async (e) => {
    try {
      await loginFunctions.handlePasswordRecovery(email);
    } catch (error) {
      console.error("Error en recuperación de contraseña:", error.message);
      setError(t("login.errorRecovery"));
      displayError(t("login.errorRecovery"));
    }
  };

  return (
    <LoginUI
      email={email}
      password={password}
      error={error}
      showPopup={showPopup}
      loading={loading}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      handleGoogleLogin={handleGoogleLogin}
      handleFacebookLogin={handleFacebookLogin}
      handlePassword={handlePassword}
      navigate={navigate}
    />
  );
}

export default Login;
