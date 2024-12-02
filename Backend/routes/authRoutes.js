const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/create-user', authController.createUserController);

module.exports = router;