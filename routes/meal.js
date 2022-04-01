const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

router.post('/', mealController.createNewMeal);
router.get('/', mealController.getAllMeals);

module.exports = router;