const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

router.route('/')
  .post(mealController.createNewMeal)
  .get(mealController.getAllMeals)
  .put(mealController.updateMeal)
  .delete(mealController.deleteMeal)

router.route('/:id')
    .get(mealController.getMeal);

module.exports = router;