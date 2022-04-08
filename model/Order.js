const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  idUser: {
    type: String
  },
  meals: {
    type: Array,
    required: true
  },
  table: {
    type: Number,
    required: true
  },
  message: {
    type: String
  },
  extras: {
    type: Array
  },
  priceTotal: {
    type: Number,
    required: true
  },
  statusOrder: {
    type: String,
    enum: ['In work', 'closed', 'canceled'],
    default:"In work"
  },
  date: {
    type: Date,
    required: true
  }

})
module.exports = mongoose.model('Order', orderSchema)