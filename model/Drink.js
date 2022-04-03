const mongoose = require('mongoose')
const Schema = mongoose.Schema

const drinkSchema = new Schema({
  nameDrink: {
    type: String,
    required: true
  },
  priceDrink: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['beer', 'wine', 'cocktail', 'soft drink', 'gin', 'vodka'],
    required: true
  },
  active: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model('Drink', drinkSchema)