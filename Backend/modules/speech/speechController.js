const { transcribeAudioInMemory } = require('./speechService');
const multer = require('multer');

// Configurar multer para manejar archivos en memoria (sin guardarlos en disco)
const storage = multer.memoryStorage();
const upload = multer({ storage });

async function transcribeSpeech(req, res) {
  try {
    // El archivo de audio estará disponible en req.file.buffer
    const audioBuffer = req.file.buffer;
    const mimetype = req.file.mimetype;  // Obtener el tipo MIME del archivo
    const transcription = await transcribeAudioInMemory(audioBuffer, mimetype);

    res.status(200).json({ success: true, transcription });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al transcribir el audio', error: error.message });
  }
}

module.exports = { transcribeSpeech, upload };