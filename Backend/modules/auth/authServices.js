/**
 * @file authService.js
 * @description Servicio para manejar la autenticación de usuarios utilizando Firebase Authentication.
 * @requires ../../config/firebaseConfig Configuración de Firebase Admin SDK.
 * @requires firebase/auth Funciones de autenticación del cliente de Firebase.
*/

const { auth } = require('../../config/firebaseConfig');

/**
 * Crea un nuevo usuario en Firebase Authentication.
 * @function
 * @param {string} displayName - El nombre del usuario.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Object} - Información del usuario creado.
 */
async function createUser (displayName, email, password) {
  try {
    const userRecord = await auth.createUser({
      email: email,
      password: password,
      displayName: displayName,
    });

    console.log("Usuario creado exitosamente:", userRecord.uid);
    return userRecord;
  } catch (error) {
    console.error("Error al crear el usuario:", error.message);
    throw error;
  }
};


/**
 * Verifica un token de ID de Firebase y decodifica su contenido.
 * @function
 * @param {string} idToken - El token de ID de Firebase a verificar.
 * @returns {Object} - El token decodificado con la información del usuario.
 */
async function verifyToken(idToken) {
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    return decodedToken;  // Si el token es válido, retorna los datos decodificados
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
}

module.exports = { createUser, verifyToken }