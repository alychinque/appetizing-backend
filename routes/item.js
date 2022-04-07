const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController.js');

router.route('/')
    .post(itemController.createNewItem)
    .get(itemController.getAllItems)
    .put(itemController.updateItem)
    .delete(itemController.deleteItem)

module.exports = router;