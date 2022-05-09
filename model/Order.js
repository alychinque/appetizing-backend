const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  idUser: {
    type: String
  },
  meal: {
    type: Array,
    required: true
  },
  drink: {
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