const { SpeechClient } = require('@google-cloud/speech');
require('dotenv').config();

const credenciales_speech = JSON.parse(process.env.GOOGLE_SPEECH_CREDENTIALS);

// Configuración del cliente de Google Speech
const speechClient = new SpeechClient({
  credentials: credenciales_speech
});

module.exports = speechClient;