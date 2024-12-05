/**
 * @file Login.jsx
 * @description Componente que gestiona la lógica del inicio de sesión de usuarios.
 * Este componente maneja el estado del formulario, la autenticación mediante Firebase, 
 * y la validación de usuario en el backend. Utiliza el componente `LoginUI` para renderizar la interfaz gráfica.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginUI from "./LoginUI"; 
import loginFunctions from "./LoginFunctions";

/**
 * Componente funcional Login
 * @description Gestiona la lógica del formulario de inicio de sesión, incluyendo la autenticación con Firebase y 
 * la validación del token en el backend. Si la autenticación es exitosa, redirige al usuario a la página de inicio.
 * @returns {JSX.Element} - El JSX que representa el componente de inicio de sesión con la lógica aplicada.
 */
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const idToken = await loginFunctions.handleEmailLogin(email, password);
    //const idToken = await loginFunctions.handleGoogleLogin();
    //const idToken = await loginFunctions.handleFacebookLogin();

    if (idToken) {
      loginFunctions.sendTokenToBackend(idToken);
      navigate("/home");
    }
    setError("");
  };

  return (
    <LoginUI
      email={email}
      password={password}
      error={error}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      navigate={navigate}
    />
  );
}

export default Login;