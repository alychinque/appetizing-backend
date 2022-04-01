const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mealSchema = new Schema({
  nameMeal: {
    type: String,
    required: true,
    unique: true
  },
  priceMeal: {
    type: Number,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  allergies: {
    type: Array,
    required: true
  },
  extras: {
    type: Array,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  }

})
module.exports = mongoose.model('Meal', mealSchema)