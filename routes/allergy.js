const express = require('express');
const router = express.Router();
const allergyController = require('../controllers/allergyController.js');
const ROLES_LIST = require('../config/roles_list.js');
const verifyRoles = require('../middleware/verifyRoles')

router.route('/')
    .post(allergyController.createNewAllergy)
    .get(allergyController.getAllAllergies)
    .put(allergyController.updateAllergy)
    
    router.route('/:id')
    .get(allergyController.getAllergy)
    .delete(allergyController.deleteAllergy)

module.exports = router;