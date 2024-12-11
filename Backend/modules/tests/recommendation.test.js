const { generateRecommendation } = require('../recommendation/recommendationService');

// Mock de Gemini
jest.mock('../../config/geminiConfig', () => ({
  generateContent: jest.fn().mockResolvedValue({
    response: {
      candidates: [{
        content: {
          parts: [{ text: 'Recomendación de prueba' }]
        }
      }]
    }
  })
}));

describe('Recommendation Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test para saber si la recomendación de Gemini se hace correctamente.
  test('generateRecommendation debería generar una recomendación válida', async () => {
    const message = 'Necesito un PC para gaming con presupuesto de 5000000 COP';
    const result = await generateRecommendation(message);
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
    expect(result).toBe('Recomendación de prueba');
  });

  // Test para manejar la respuesta en caso de hacer una búsqueda no relacionada con PCs.
  test('generateRecommendation debería manejar consultas no relacionadas', async () => {
    const message = '¿Cuál es la capital de Francia?';
    const mockResponse = 'No tengo respuesta a tu petición';
    
    const model = require('../../config/geminiConfig');
    model.generateContent.mockResolvedValueOnce({
      response: {
        candidates: [{
          content: {
            parts: [{ text: mockResponse }]
          }
        }]
      }
    });

    const result = await generateRecommendation(message);
    expect(result).toBe(mockResponse);
  });

  // Manejo de errores de la API.
  test('generateRecommendation debería manejar errores de la API', async () => {
    const message = 'Necesito una recomendación';
    const model = require('../../config/geminiConfig');
    model.generateContent.mockRejectedValueOnce(new Error('Error de API'));

    await expect(generateRecommendation(message))
      .rejects.toThrow();
  });

  // Manejo cuando no hay ningún candidato retornado por Gemini.
  test('generateRecommendation debería manejar respuestas sin candidatos', async () => {
    const message = 'Necesito una recomendación';
    const model = require('../../config/geminiConfig');
    model.generateContent.mockResolvedValueOnce({
      response: {
        candidates: []
      }
    });

    await expect(generateRecommendation(message))
      .rejects.toThrow();
  });
});