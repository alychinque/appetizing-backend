const express = require('express')
const ROLES_LIST = require('../config/roles_list.js');
const router = express.Router()
const drinkController = require('../controllers/drinkController')
const verifyRoles = require('../middleware/verifyRoles')

router.route('/')
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Staff, ROLES_LIST.Customer), drinkController.createNewDrink)
  .get(drinkController.getAllDrinks)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Staff), drinkController.updateDrink)
  .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Staff), drinkController.deleteDrink)

router.route('/:id')
  .get(drinkController.getDrink)

module.exports = router