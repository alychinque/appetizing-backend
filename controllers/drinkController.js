const Drink = require('../model/Drink.js')

const createNewDrink = async (req, res) => {
  const drink = req.body
  try {
    const result = await Drink.create({
      "nameDrink": drink.nameDrink,
      "priceDrink": drink.priceDrink,
      "category": drink.category,
      "active": drink.active
    })
    res.status(201).json({ 'success': `New Drink ${ drink.nameDrink } created!`})
  } catch (err) {
    res.status(500).json({'message': err.message})
  }
}
module.exports = { createNewDrink }