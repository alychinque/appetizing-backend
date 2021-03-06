const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController.js');
const ROLES_LIST = require('../config/roles_list.js');
const verifyRoles = require('../middleware/verifyRoles')

router.route('/')
    .post(itemController.createNewItem)
    .get(itemController.getAllItems)
    .put(itemController.updateItem)
    
    router.route('/:id')
    .get(itemController.getItem)
    .delete(itemController.deleteItem)

module.exports = router;