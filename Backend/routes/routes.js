const express = require('express');

const geminiRoutes = require('./geminiRoutes');
const listRoutes = require('./listRoutes');
const chatRoutes = require('./chatRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.use('/chat', chatRoutes);
router.use('/list', listRoutes);
router.use('/gemini', geminiRoutes);
router.use('/auth', authRoutes);

module.exports = router;
