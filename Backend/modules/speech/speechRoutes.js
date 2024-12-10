const express = require('express');
const { transcribeSpeech, upload } = require('./speechController');

const router = express.Router();

router.post('/transcribe', upload.single('audio'), transcribeSpeech);

module.exports = router;