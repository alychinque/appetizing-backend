const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');
const ROLES_LIST = require('../config/roles_list.js');
const verifyRoles = require('../middleware/verifyRoles')

router.route('/')
  .post(mealController.createNewMeal)
  .get(mealController.getAllMeals)
  .put(mealController.updateMeal)
  
  router.route('/:id')
  .get(mealController.getMeal)
  .delete(mealController.deleteMeal)

module.exports = router;