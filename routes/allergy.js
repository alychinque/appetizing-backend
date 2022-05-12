const express = require('express');
const ROLES_LIST = require('../config/roles_list.js');
const router = express.Router();
const allergyController = require('../controllers/allergyController.js');
const verifyRoles = require('../middleware/verifyRoles')

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Staff), allergyController.createNewAllergy)
    .get(allergyController.getAllAllergy)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Staff), allergyController.updateAllergy)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Staff), allergyController.deleteAllergy)

router.route('/:id')
    .get(allergyController.getAllergy)

module.exports = router;