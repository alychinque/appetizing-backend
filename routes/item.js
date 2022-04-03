const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController.js');

router.route('/')
    .post(itemController.createNewItem)

module.exports = router;