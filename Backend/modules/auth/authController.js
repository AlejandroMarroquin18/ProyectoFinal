/**
 * @file authController.js
 * @description Controlador para manejar la creación de usuarios en la aplicación utilizando el servicio de autenticación.
 * @requires ./authServices Servicio para la gestión de usuarios en Firebase Authentication.
 */

const { createUser, verifyToken } = require('./authService')

/**
 * Controlador para crear un nuevo usuario.
 * @function createUserController
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Contiene los datos del usuario enviados en la solicitud.
 * @param {string} req.body.displayName - Nombre del usuario.
 * @param {string} req.body.email - Correo electrónico del usuario.
 * @param {string} req.body.password - Contraseña del usuario.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} Devuelve una respuesta HTTP con el resultado de la operación.
 */
const createUserController = async (req, res) => {
  console.log("CREATE USER CONTROLLER")
  const { displayName, email, password } = req.body; 

  try {
    const result = await createUser(displayName, email, password);
    res.status(201).json(result);
  } catch (error) {
    console.log('Error en createUser')
    res.status(500).json({ error: error.message }); 
  }
} 


/**
 * Controlador para verificar la validez de un token de usuario.
 * @function verifyTokenController
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.headers - Contiene los encabezados de la solicitud.
 * @param {string} req.headers.authorization - El encabezado de autorización con el token de ID.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} Devuelve una respuesta HTTP con el resultado de la validación del token.
 */
const verifyTokenController = async (req, res) => {
  console.log("VERIFY TOKEN CONTROLLER")
  const idToken = req.headers.authorization?.split(' ')[1];

  if (!idToken) {
    return res.status(400).json({ message: 'Token no proporcionado' });
  }

  try {
    const decodedToken = await verifyToken(idToken);
    return res.status(200).json({ message: 'Token validado correctamente', user: decodedToken });
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido', error: error.message });
  }  
}

module.exports = { createUserController, verifyTokenController }