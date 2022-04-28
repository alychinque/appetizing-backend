const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  nameUser: {
    type: String,
    required: true
  },
  emailUser: {
    type: String,
    required: true
  },
  phoneUser: {
    type: String,
    required: true
  },
  passwordUser: {
    type: String,
    required: true
  },
  activeUser: {
    type: Boolean,
    default: true
  }
})
module.exports = mongoose.model('User', userSchema)