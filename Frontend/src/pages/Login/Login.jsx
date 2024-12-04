/**
 * @file Login.jsx
 * @description Componente que gestiona la lógica del inicio de sesión de usuarios.
 * Este componente maneja el estado del formulario, la autenticación mediante Firebase, 
 * y la validación de usuario en el backend. Utiliza el componente `LoginUI` para renderizar la interfaz gráfica.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebaseConfigF";
import { signInWithEmailAndPassword } from "firebase/auth";
import LoginUI from "./LoginUI";  // Componente para la interfaz gráfica
import request from "../../services/api";

/**
 * Función para realizar el inicio de sesión del usuario utilizando Firebase Authentication.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {string|null} - Devuelve el token de identificación (idToken) si el inicio de sesión es exitoso, 
 *                          o null en caso de error.
 */
async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const idToken = await user.getIdToken();
    return idToken;
  } catch (error) {
    console.error('Error de login:', error.message);
  }
}

/**
 * Función para enviar el token de autenticación al backend para validarlo.
 * @param {string} idToken - El token de identificación del usuario, obtenido desde Firebase.
 */
async function sendTokenToBackend(idToken) {
  try {

    const response = await request("/auth/validate-user", "POST", null, idToken)
    /*const response = await fetch('http://localhost:3000/auth/validate-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
    });*/

    const data = await response.json();
    if (response.ok) {
      console.log('Token validado correctamente en el backend:', data);
    } else {
      console.error('Error en la validación del backend:', data.message);
    }
  } catch (error) {
    console.error('Error al enviar el token al backend:', error.message);
  }
}

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
    const idToken = await loginUser(email, password);
    if (idToken) {
      sendTokenToBackend(idToken);
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