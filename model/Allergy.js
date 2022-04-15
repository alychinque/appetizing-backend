const mongoose = require('mongoose')
const Schema = mongoose.Schema

const allergySchema = new Schema({
    nameAllergy: {
        type: String,
        required: true
    },
    numberAllergy: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Allergy', allergySchema)