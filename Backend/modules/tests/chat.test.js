const { createChat, getAllChats, getChat, updateChat, deleteChat } = require('../chat/chatService');
const { db } = require('../../config/firebaseConfig');

jest.mock('../../config/firebaseConfig', () => ({
  db: {
    ref: jest.fn().mockReturnThis(),
    orderByChild: jest.fn().mockReturnThis(),
    equalTo: jest.fn().mockReturnThis(),
    push: jest.fn().mockReturnThis(),
    set: jest.fn().mockResolvedValue(),
    once: jest.fn().mockImplementation(() => Promise.resolve({
      exists: jest.fn().mockReturnValue(true),
      val: jest.fn().mockReturnValue({
        chatKey: { // Asumiendo que 'chatKey' es la clave del chat en Firebase
          name: 'Chat Existente',
          createdAt: '2024-01-01T00:00:00.000Z',
          messages: []
        }
      })
    })),
    child: jest.fn().mockReturnThis(),
    remove: jest.fn().mockResolvedValue(),
  }
}));

describe('Chat Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test para comprobar que un test se creo correctamente.
  test('createChat debería crear un nuevo chat', async () => {
    const chatName = 'Chat de Prueba';
    const result = await createChat(chatName);
    expect(result).toContain('creado exitosamente');
  });

  // Test para obtener todos los chats en Firebase (getAllChats).
  test('getAllChats debería traer todos los chats creados', async () => {
    const result = await getAllChats();
    expect(Array.isArray(result)).toBe(true);
  });

  // Test para obtener un chat, especificando el nombre (getChat).
  test('getChat debería traerme un chat con un nombre', async () => {
    const chatName = 'Chat Existente';
    const result = await getChat(chatName);
    expect(result).toHaveProperty('name', chatName);
    expect(result).toHaveProperty('messages');
    expect(result.messages).toEqual([]);
  });

  // Test para comprobar que un test se ha actualizado correctamente en Firebase.
  test('updateChat debería añadir un mensaje al chat creado', async () => {
    const chatName = 'Chat Existente';
    const message = 'Mensaje de prueba';
    const result = await updateChat(chatName, message);
    expect(result.success).toBe(true);
  });

  // Test para probar la eliminación de un chat.
  test('deleteChat debería eliminar un chat existente', async () => {
    const chatName = 'Chat Existente para Eliminar';
    await createChat(chatName); // Asegúrate de que el chat exista antes de intentar eliminarlo
    const result = await deleteChat(chatName);
    expect(result).toContain('eliminado exitosamente');
    expect(db.ref().child().remove).toHaveBeenCalled(); // Verifica que se llama el método de eliminar
  }); 
});