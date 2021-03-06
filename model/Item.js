const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    nameItem: {
        type: String,
        required: true
    },
    priceItem: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Item', itemSchema)