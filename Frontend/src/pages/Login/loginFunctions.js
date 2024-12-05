/**
 * @file loginFunctions.js
 * @description Funciones relacionadas con el inicio de sesión y validación de usuarios 
 * en la aplicación utilizando Firebase Authentication. 
 * Incluye funciones para inicio de sesión con correo y contraseña, inicio de sesión con Google, 
 * y la validación del token de autenticación con el backend.
 */

import { auth } from "../../../config/firebaseConfigF";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"; 
import request from "../../services/api";

/**
 * Función para realizar el inicio de sesión del usuario utilizando un correo registrado.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {string|null} - Devuelve el token de identificación (idToken) si el inicio de sesión es exitoso, 
 *                          o null en caso de error.
 */
async function handleEmailLogin(email, password) {
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
 * Función para realizar el inicio de sesión del usuario utilizando su cuenta de Google.
 * @returns {string|null} - Devuelve el token de identificación (idToken) si el inicio de sesión es exitoso, 
 *                          o null en caso de error.
 */
async function handleGoogleLogin() {
  try {
    const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = userCredential.user;
    const idToken = await user.getIdToken();
    return idToken;
  } catch (error) {
    console.error('Error de login:', error.message);
  }
}


/**
 * Función para realizar el inicio de sesión del usuario utilizando su cuenta de Facebook.
 * @returns {string|null} - Devuelve el token de identificación (idToken) si el inicio de sesión es exitoso, 
 *                          o null en caso de error.
 */
async function handleFacebookLogin() {
  try {
    const userCredential = await signInWithPopup(auth, new FacebookAuthProvider());
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

export default { handleEmailLogin, handleGoogleLogin, handleFacebookLogin, sendTokenToBackend};