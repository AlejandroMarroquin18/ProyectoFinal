const express = require('express');
const listController = require('../controllers/listController');

const router = express.Router();

router.post('/create-list', listController.createListController);
router.post('/add-item', listController.addItemToListController);
router.delete('/remove-item', listController.removeItemFromListController);
router.delete('/delete-list', listController.deleteListController);
router.get('/get-list', listController.getListController)

module.exports = router;