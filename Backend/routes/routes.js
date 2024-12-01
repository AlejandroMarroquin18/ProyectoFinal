const express = require('express');
const geminiRoutes = require('./geminiRoutes');
const listRoutes = require('./listRoutes');
const chatRoutes = require('./chatRoutes');

const router = express.Router();

router.use('/chat', chatRoutes);
router.use('/list', listRoutes);
router.use('/gemini', geminiRoutes);

module.exports = router;
