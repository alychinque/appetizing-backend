const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mealSchema = new Schema({
  nameItem: {
    type: String,
    required: true
  },
  priceItem: {
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