const client = require('../../config/speechConfig');

// Definimos los formatos de audio soportados directamente en este archivo
const audioFormatos = {
  'audio/mpeg': { encoding: 'MP3', sampleRateHertz: 44100 },   // Para archivos .mp3
  'audio/ogg': { encoding: 'WEBM_OPUS', sampleRateHertz: 48000 }, // Para archivos .ogg
  'audio/wav': { encoding: 'LINEAR16' },
  'audio/wave': { encoding: 'LINEAR16' },
  'audio/flac': { encoding: 'FLAC', sampleRateHertz: 16000 },  // Para archivos .flac
};

// Función para procesar el audio en memoria y transcribirlo
async function transcribeAudioInMemory(audioBuffer, mimetype) {

  console.log('Recibiendo archivo de tipo:', mimetype); // Verificar tipo de archivo
  console.log('Tamaño del audio recibido:', audioBuffer.length);

  const formato = audioFormatos[mimetype];
  
  if (!formato) {
    throw new Error('Formato de audio no soportado');
  }

  const { encoding, sampleRateHertz } = formato;

  const audio = {
    content: audioBuffer.toString('base64'),  // Convertir el buffer de audio a base64
  };

  const config = {
    encoding: encoding,  // Se usa el encoding de acuerdo al tipo MIME
    sampleRateHertz: sampleRateHertz,  // Frecuencia de muestreo correspondiente
    languageCode: 'es-CO',  // Idioma para la transcripción
  };

  const request = {
    audio: audio,
    config: config,
  };

  try {
    console.log('Enviando solicitud a Google Speech-to-Text...');
    const [response] = await client.recognize(request);
    const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');
    console.log('Transcripción: ', transcription);
    return transcription;
  } catch (error) {
    console.error('Error al transcribir el audio:', error);
    throw new Error('Error al procesar el audio.');
  }
}

module.exports = { transcribeAudioInMemory };