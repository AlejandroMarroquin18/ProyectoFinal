const { auth } = require('../config/firebaseConfig');
const { createUserWithEmailAndPassword, updateProfile } = require('firebase/auth');

/**
 * Crea un nuevo usuario en Firebase Authentication.
 * @param {string} displayName - El nombre del usuario.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Object} - Información del usuario creado.
 */
async function createUser (displayName, email, password) {
  console.log(displayName, email, password);
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

module.exports = { createUser }