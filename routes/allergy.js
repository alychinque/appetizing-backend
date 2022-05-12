const express = require('express');
const ROLES_LIST = require('../config/roles_list.js');
const router = express.Router();
const allergyController = require('../controllers/allergyController.js');
const verifyRoles = require('../middleware/verifyRoles')

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Staff), allergyController.createNewAllergy)
<<<<<<< HEAD
    .get(allergyController.getAllAllergy)
=======
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Staff), allergyController.getAllAllergy)
>>>>>>> c335feca67c88ca5c4b2a86b19d84dc7f5351590
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Staff), allergyController.updateAllergy)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Staff), allergyController.deleteAllergy)

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Staff), allergyController.getAllergy)

module.exports = router;