const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: 'User name can\'t be empty'
  },
  email: {
    type: String,
    required: 'Email can\'t be empty',
    unique: true
  },
  phone: {
    type: String,
    required: 'Phone can\'t be empty',
    minlength: [9, 'Phone must be at least 9 numbers long']
  },
  active: {
    type: Boolean,
    default: true
  },
  password: {
    type: String,
    required: 'Password can\'t be empty',
    minlength : [6,'Password must be at least 6 character long']
  },
  refreshToken : String
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');


module.exports = mongoose.model('User', userSchema)