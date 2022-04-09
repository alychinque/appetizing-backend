const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController.js');

router.route('/')
    .post(itemController.createNewItem)
    .get(itemController.getAllItems)
    .put(itemController.updateItem)
    .delete(itemController.deleteItem)

router.route('/:id')
    .get(itemController.getItem)

module.exports = router;