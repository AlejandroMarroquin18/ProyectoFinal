const { db } = require('../config/firebaseConfig')

// Creacion del chat
async function createChat(chatName) {
  try {
    const chatRef = db.ref('chats');

    const newChatRef = chatRef.push();
    await newChatRef.set({
      name: chatName,
      createdAt: new Date().toISOString(),
      messages: [],
    });

    console.log(`Chat '${chatName}' creado exitosamente`);
    return `Chat '${chatName}' creado exitosamente`;
  } catch (error) {
    console.error("Error en la función createChat:", error);
    throw error;
  }
}


// Leer chat
async function getChat(chatName) {
  console.log('ingreso getChat')
  try {
    const chatRef = db.ref('chats');
    const snapshot = await chatRef.orderByChild('name').equalTo(chatName).once('value');
    
    if (!snapshot.exists()) { throw new Error('El chat no existe'); }

    const chatKey = Object.keys(snapshot.val())[0];
    const chatData = snapshot.val()[chatKey];

    const chatFull = {
      id: chatKey,
      name: chatData.name,
      createdAt: chatData.createdAt,
      messages: chatData.messages || [] 
    }

    console.log(chatFull);
    return chatFull;

  } catch (error) {
    console.error("Error en la función getChat:", error);
    throw error;
  }
}


// Modificar chat
async function updateChat(chatName, message) {
  try {
    const chatRef = db.ref('chats');
    const snapshot = await chatRef.orderByChild('name').equalTo(chatName).once('value');
    
    if (!snapshot.exists()) { throw new Error('El chat no existe'); }

    const chatKey = Object.keys(snapshot.val())[0]; 
    const listMessageRef = chatRef.child(chatKey).child('messages'); 
    await listMessageRef.push(message);

    console.log(`Mensaje agregado al chat con ID ${chatName}`);
    return `Mensaje agregado al chat ${chatName} exitosamente.`;
  } catch (error) {
    console.error('Error al agregar el mensaje al chat:', error.message);
    throw error;
  }
}

// Eliminar chat
async function deleteChat(chatName) {
  try {
    const chatRef = db.ref('chats');
    const snapshot = await chatRef.orderByChild('name').equalTo(chatName).once('value');
    
    if (!snapshot.exists()) { throw new Error('El chat no existe'); }

    const chatKey = Object.keys(snapshot.val())[0];
    await chatRef.child(chatKey).remove();

    console.log(`Chat '${chatName}' eliminado exitosamente`);
    return `Chat '${chatName}' eliminado exitosamente`;
  } catch (error) {
    console.error("Error en la función deleteChat:", error.message);
    throw error;
  }
}


module.exports = { createChat, getChat, updateChat, deleteChat }