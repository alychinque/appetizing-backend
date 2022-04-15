const express = require('express');
const router = express.Router();
const allergyController = require('../controllers/allergyController.js');

router.route('/')
    .post(allergyController.createNewAllergy)
    .get(allergyController.getAllAllergy)
    .put(allergyController.updateAllergy)
    .delete(allergyController.deleteAllergy)

router.route('/:id')
    .get(allergyController.getAllergy)

module.exports = router;