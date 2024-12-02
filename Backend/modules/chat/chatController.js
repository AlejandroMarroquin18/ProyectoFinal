/**
 * @file chatController.js
 * @description Controladores para manejar operaciones CRUD en chats utilizando los servicios de chat.
 * @requires ./chatService Servicios relacionados con la gestión de chats en Firebase Realtime Database.
 */

const { createChat, getChat, updateChat, deleteChat } = require('./chatService')

/**
 * Controlador para crear un nuevo chat.
 * @function createChatController
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Contiene los datos enviados en la solicitud.
 * @param {string} req.body.chatName - Nombre del chat a crear.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} Devuelve una respuesta HTTP con el resultado de la operación.
 */
const createChatController = async (req, res) => {
  const { chatName } = req.body; 

  if (!chatName || typeof chatName !== 'string') {
    return res.status(400).json({ error: 'El nombre es obligatorio y debe ser valido'});
  }

  try {
    const result = await createChat(chatName);
    res.status(201).json(result);
  } catch (error) {
    console.log('Error en createChat')
    res.status(500).json({ error: error.message }); 
  }
}


/**
 * Controlador para obtener la información de un chat.
 * @function getChatController
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.query - Contiene los parámetros de consulta enviados en la solicitud.
 * @param {string} req.query.chatName - Nombre del chat a buscar.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} Devuelve una respuesta HTTP con la información del chat.
 */
const getChatController = async (req, res) => {
  const { chatName } = req.query;
  
  try {
    const message = await getChat(chatName);
    return res.status(200).json(message);
  } catch (error) {
    console.error("Error en el controlador getChat:", error);
    return res.status(500).json({ error: error.message });
  }
}


/**
 * Controlador para actualizar un chat añadiendo un mensaje.
 * @function updateChatController
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Contiene los datos enviados en la solicitud.
 * @param {string} req.body.chatName - Nombre del chat a actualizar.
 * @param {string|Object} req.body.message - Mensaje a agregar al chat.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} Devuelve una respuesta HTTP con el resultado de la operación.
 */
const updateChatController = async (req, res) => {
  const { chatName, message } = req.body;

  if (!chatName || !message ) {
    return res.status(400).json({ error: 'Los datos son incorrectos. Se requiere un chatName válido y un message.' });
  }

  try {
    const result = await updateChat(chatName, message);
    return res.status(200).json(result);  
  } catch (error) {
    console.error('Error en updateChatController:', error);
    return res.status(500).json({ error: error.message }); 
  }
}


/**
 * Controlador para eliminar un chat.
 * @function deleteChatController
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Contiene los datos enviados en la solicitud.
 * @param {string} req.body.chatName - Nombre del chat a eliminar.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} Devuelve una respuesta HTTP con el resultado de la operación.
 */
const deleteChatController = async (req, res) => {
  const { chatName } = req.body;

  try {
    const message = await deleteChat(chatName);
    return res.status(200).json({ message });
  } catch (error) {
    console.error("Error en el controlador deleteChat:", error);
    return res.status(500).json({ error: error.message });
  }
}

module.exports = { createChatController, getChatController, updateChatController, deleteChatController }