const express = require('express');
const chatController = require('../controllers/chatController');

const router = express.Router();

router.post('/create-chat', chatController.createChatController);
router.get('/get-chat', chatController.getChatController);
router.post('/update-chat', chatController.updateChatController);
router.delete('/delete-chat', chatController.deleteChatController);

module.exports = router;