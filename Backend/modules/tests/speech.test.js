const { transcribeSpeech } = require('../speech/speechController');
const speechService = require('../speech/speechService');

// Mock de la función de transcripción para no realizar llamadas reales al API
jest.mock('../speech/speechService', () => ({
  transcribeAudioInMemory: jest.fn()
}));

describe('Speech Controller', () => {
  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  // Este mock me simula un audio en formato ogg para ser transcrito
  const mockReq = (file) => ({
    file: {
      buffer: Buffer.from("audio data", 'utf-8'),
      mimetype: 'audio/ogg' 
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test de transcripción correcta
  test('Se debería transcribir correctamente el audio', async () => {
    const req = mockReq();
    const res = mockRes();

    speechService.transcribeAudioInMemory.mockResolvedValue('Texto transcribido del audio');

    await transcribeSpeech(req, res);

    expect(speechService.transcribeAudioInMemory).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, transcription: 'Texto transcribido del audio' });
  });

  // Test de manejo de las transcripciones
  test('Se deberían manejar los errores de transcripción adecuadamente', async () => {
    const req = mockReq();
    const res = mockRes();

    speechService.transcribeAudioInMemory.mockRejectedValue(new Error('Error al transcribir el audio'));

    await transcribeSpeech(req, res);

    expect(speechService.transcribeAudioInMemory).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Error al transcribir el audio', error: 'Error al transcribir el audio' });
  });
});
