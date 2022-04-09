const express = require('express')
const router = express.Router()
const drinkController = require('../controllers/drinkController')

router.route('/')
  .post(drinkController.createNewDrink)
  .get(drinkController.getAllDrinks)
  .put(drinkController.updateDrink)
  .delete(drinkController.deleteDrink)

router.route('/:id')
  .get(drinkController.getDrink)

module.exports = router