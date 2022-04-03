const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController.js');

router.route('/')
    .post(itemController.createNewItem)
    .get(itemController.getAllItems)

module.exports = router;