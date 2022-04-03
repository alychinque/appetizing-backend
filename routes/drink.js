const express = require('express')
const router = express.Router()
const drinkController = require('../controllers/drinkController')

router.route('/')
  .post(drinkController.createNewDrink)

module.exports = router