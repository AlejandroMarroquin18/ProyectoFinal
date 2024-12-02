/**
 * @file authRoutes.js
 * @description Definición de las rutas para manejar la autenticación de usuarios en la aplicación.
 * @requires express Framework web para definir y manejar rutas.
 * @requires ./authController Controladores para manejar las operaciones de autenticación.
 */

const express = require('express');
const authController = require('./authController');

const router = express.Router();

/**
 * POST /create-user
 * @description Ruta para crear un nuevo usuario.
 * @access Público
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Datos del usuario enviados en la solicitud.
 * @param {string} req.body.displayName - Nombre del usuario.
 * @param {string} req.body.email - Correo electrónico del usuario.
 * @param {string} req.body.password - Contraseña del usuario.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} Devuelve una respuesta HTTP con el resultado de la operación.
 */
router.post('/create-user', authController.createUserController);

module.exports = router;