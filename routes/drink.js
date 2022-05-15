const express = require('express')
const router = express.Router()
const drinkController = require('../controllers/drinkController')
const ROLES_LIST = require('../config/roles_list.js');
const verifyRoles = require('../middleware/verifyRoles')

router.route('/')
  .post(drinkController.createNewDrink)
  .get(drinkController.getAllDrinks)
  .put(drinkController.updateDrink)
  .delete(drinkController.deleteDrink)

router.route('/:id')
  .get(drinkController.getDrink)

module.exports = router