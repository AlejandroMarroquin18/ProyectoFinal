const express = require('express');
const geminiController = require('../controllers/geminiController')

const router = express.Router();

router.post('/recommend-pc', geminiController.recommendPC);

module.exports = router;