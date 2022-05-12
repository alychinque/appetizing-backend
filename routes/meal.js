const express = require('express');
const ROLES_LIST = require('../config/roles_list.js');
const router = express.Router();
const mealController = require('../controllers/mealController');
const verifyRoles = require('../middleware/verifyRoles')

router.route('/')
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Staff), mealController.createNewMeal)
  .get(mealController.getAllMeals)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Staff), mealController.updateMeal)
  .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Staff), mealController.deleteMeal)

router.route('/:id')
    .get(mealController.getMeal);

module.exports = router;