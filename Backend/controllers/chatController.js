const { createChat, getChat, updateChat, deleteChat } = require('../services/chatService')

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