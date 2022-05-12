const express = require('express');
const ROLES_LIST = require('../config/roles_list.js');
const router = express.Router();
const itemController = require('../controllers/itemController.js');
const verifyRoles = require('../middleware/verifyRoles')

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Staff), itemController.createNewItem)
    .get(itemController.getAllItems)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Staff), itemController.updateItem)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Staff), itemController.deleteItem)

router.route('/:id')
    .get(itemController.getItem)

module.exports = router;