const Drink = require('../model/Drink.js')

const getAllDrinks = async (req, res) => {
  const drinks = await Drink.find()
  if (!drinks) return res.status(204).json({ 'message': 'No drinks found.' })
  res.json(drinks)
}

const createNewDrink = async (req, res) => {
  const drink = req.body
  const checkDrink = await Drink.findOne({ nameDrink: req.body.nameDrink }).exec()
  if (!checkDrink) {
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
  } else {
    res.status(400).json({'message': `The ${req.body.nameDrink} is in the database`})
  }
}

const updateDrink = async (req, res) => {
  if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
  const drink = await Drink.findOne({ _id: req.body.id }).exec()
  if (!drink) {
    return res.status(204).json({ "message": `No drink matches ID ${req.body.id}` })
  }
  drink.nameDrink = req.body.nameDrink.toLowerCase()
  drink.priceDrink = req.body.priceDrink
  drink.category = req.body.category
  drink.active = req.body.active
  const result = await drink.save()
  res.json(result)
}

const deleteDrink = async (req, res) => {
  if (!req?.body?.id) return res.status(400).json({ 'message': 'Drink ID required.' });

    const drink = await Drink.findOne({ _id: req.body.id }).exec();
    if (!drink) {
        return res.status(204).json({ "message": `No drink matches ID ${req.body.id}.` });
    }
    const result = await drink.deleteOne({ _id: req.body.id });
    res.json(result);
}
module.exports = { createNewDrink, getAllDrinks, updateDrink, deleteDrink }