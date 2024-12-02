/**
 * @file chatRoutes.js
 * @description Definición de las rutas para manejar las operaciones CRUD de chats en la aplicación.
 * @requires express Framework web para definir y manejar rutas.
 * @requires ../controllers/chatController Controladores para manejar las operaciones de chat.
 */

const express = require('express');
const chatController = require('../controllers/chatController');

const router = express.Router();

/**
 * POST /create-chat
 * @description Ruta para crear un nuevo chat.
 * @access Público
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Contiene los datos del chat enviados en la solicitud.
 * @param {string} req.body.chatName - Nombre del chat a crear.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.post('/create-chat', chatController.createChatController);

/**
 * GET /get-chat
 * @description Ruta para obtener la información de un chat.
 * @access Público
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.query - Contiene los parámetros enviados en la solicitud.
 * @param {string} req.query.chatName - Nombre del chat a buscar.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.get('/get-chat', chatController.getChatController);

/**
 * POST /update-chat
 * @description Ruta para actualizar un chat añadiendo un mensaje.
 * @access Público
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Contiene los datos enviados en la solicitud.
 * @param {string} req.body.chatName - Nombre del chat a actualizar.
 * @param {string|Object} req.body.message - Mensaje a agregar al chat.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.post('/update-chat', chatController.updateChatController);

/**
 * DELETE /delete-chat
 * @description Ruta para eliminar un chat.
 * @access Público
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Contiene los datos enviados en la solicitud.
 * @param {string} req.body.chatName - Nombre del chat a eliminar.
 * @param {Object} res - Objeto de respuesta de Express.
 */
router.delete('/delete-chat', chatController.deleteChatController);

module.exports = router;