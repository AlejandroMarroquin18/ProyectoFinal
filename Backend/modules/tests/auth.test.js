const { createUser, verifyToken } = require('../auth/authService');

// Mock de Firebase
jest.mock('../../config/firebaseConfig', () => ({
  auth: {
    createUser: jest.fn().mockResolvedValue({
      uid: '123abc',
      email: 'test@test.com',
      displayName: 'Test User'
    }),
    verifyIdToken: jest.fn().mockResolvedValue({
      uid: '123abc',
      email: 'test@test.com'
    })
  }
}));

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Creación de un usuario en Firebase.
  test('createUser debería crear un usuario correctamente', async () => {
    const mockUserRecord = {
      uid: '123abc',
      email: 'test@test.com',
      displayName: 'Test User'
    };

    const result = await createUser('Test User', 'test@test.com', 'password123');
    expect(result).toEqual(mockUserRecord);
  });

  // Test para validar el token de un usuario.
  test('verifyToken debería validar un token correctamente', async () => {
    const mockDecodedToken = {
      uid: '123abc',
      email: 'test@test.com'
    };

    const result = await verifyToken('valid-token');
    expect(result).toEqual(mockDecodedToken);
  });
});
