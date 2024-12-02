/**
 * @file authController.js
 * @description Controlador para manejar la creación de usuarios en la aplicación utilizando el servicio de autenticación.
 * @requires ../services/authServices Servicio para la gestión de usuarios en Firebase Authentication.
 */

const { createUser } = require('../services/authServices')

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
  const { displayName, email, password } = req.body; 

  try {
    const result = await createUser(displayName, email, password);
    res.status(201).json(result);
  } catch (error) {
    console.log('Error en createUser')
    res.status(500).json({ error: error.message }); 
  }
} 

module.exports = { createUserController }