/**
 * @file loginFunctions.js
 * @description Funciones relacionadas con el inicio de sesión y validación de usuarios 
 * en la aplicación utilizando Firebase Authentication. 
 * Incluye funciones para inicio de sesión con correo y contraseña, inicio de sesión con Google, 
 * y la validación del token de autenticación con el backend.
 */

import { auth } from "../../../config/firebaseConfigF";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth"; 
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
 * Función para enviar un correo de recuperación de cuenta.
 * @param {string} email - El correo electrónico del usuario.
 * @returns {Promise<void>} - Devuelve una promesa que se resuelve cuando el correo de recuperación se ha enviado correctamente.
 */
async function handlePasswordRecovery(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('Correo de recuperación enviado correctamente a:', email);
    alert('Te hemos enviado un correo para restablecer tu contraseña');
  } catch (error) {
    console.error('Error al enviar el correo de recuperación:', error.message);
    alert('Hubo un error al enviar el correo. Por favor, verifica el correo ingresado y vuelve a intentarlo.');
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


export default { handleEmailLogin, handleGoogleLogin, handleFacebookLogin, handlePasswordRecovery, sendTokenToBackend};