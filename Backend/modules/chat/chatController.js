/**
 * @file chatController.js
 * @description Controladores para manejar operaciones CRUD en chats y conectarse al módulo de recomendación para obtener respuestas.
 * @requires ./chatService Servicios relacionados con la gestión de chats en Firebase Realtime Database.
 * @requires ../recommendation/recommendationService Servicio para interactuar con Gemini.
 */

const { createChat, getAllChats, getChat, updateChat, deleteChat } = require('./chatService');
const { generateRecommendation } = require('../recommendation/recommendationService');

/**
 * Controlador para crear un nuevo chat.
 * @function createChatController
 */
const createChatController = async (req, res) => {
  console.log("CREATE CHAT CONTROLLER");
  const { chatName } = req.body;

  if (!chatName || typeof chatName !== 'string') {
    return res.status(400).json({ error: 'El nombre es obligatorio y debe ser válido.' });
  }

  try {
    const result = await createChat(chatName);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error en createChatController:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controlador para obtener la información de todos los chats.
 * @function getChatController
 */
const getAllChatsController = async (req, res) => {
  console.log("GET ALL CHATS CONTROLLER");
  try {
    const chats = await getAllChats();
    res.status(200).json(chats);
  } catch (error) {
    console.error('Error en getAllChatsController:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controlador para obtener la información de un chat.
 * @function getChatController
 */
const getChatController = async (req, res) => {
  console.log("GET CHAT CONTROLLER");

  // Permitir obtener el parámetro desde la query o el body
  const chatName = req.query.chatName || req.body.chatName;

  if (!chatName) {
    return res.status(400).json({ error: 'El parámetro chatName es obligatorio.' });
  }

  try {
    const chatData = await getChat(chatName);
    res.status(200).json(chatData);
  } catch (error) {
    console.error('Error en getChatController:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controlador para actualizar un chat añadiendo un mensaje del usuario y la respuesta de Gemini.
 * @function updateChatController
 */
const updateChatController = async (req, res) => {
  console.log("UPDATE CHAT CONTROLLER");
  const { chatName, message } = req.body;

  // Validar que los parámetros requeridos estén presentes
  if (!chatName || !message) {
    return res.status(400).json({ success: false, error: 'Se requiere un chatName y un message válidos.' });
  }

  try {
    // Crear el mensaje del usuario
    const userMessage = {
      sender: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };

    // Agregar el mensaje del usuario al historial del chat en Firebase
    await updateChat(chatName, userMessage);

    // Generar respuesta de Gemini
    const botResponseContent = await generateRecommendation(message);

    // Crear el mensaje del bot
    const botResponse = {
      sender: 'bot',
      content: botResponseContent,
      timestamp: new Date().toISOString(),
    };

    // Agregar la respuesta del bot al historial del chat en Firebase
    await updateChat(chatName, botResponse);

    // Enviar ambos mensajes como respuesta con éxito
    res.status(200).json({
      success: true,  // Asegurarse de incluir esto
      userMessage,
      botResponse,
    });
  } catch (error) {
    console.error('Error en updateChatController:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Controlador para eliminar un chat.
 * @function deleteChatController
 */
const deleteChatController = async (req, res) => {
  console.log("DELETE CHAT CONTROLLER");
  const { chatName } = req.body; // El nombre del chat se toma del cuerpo de la solicitud.

  if (!chatName) {
    return res.status(400).json({ error: 'El parámetro chatName es obligatorio.' });
  }

  try {
    const message = await deleteChat(chatName); // Llamada al servicio para eliminar el chat.
    res.status(200).json({ message }); // Devuelve un mensaje de éxito al cliente.
  } catch (error) {
    console.error('Error en deleteChatController:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createChatController, getAllChatsController, getChatController, updateChatController, deleteChatController };