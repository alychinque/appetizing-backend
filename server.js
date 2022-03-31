const { application } = require('express')
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')

require('dotenv').config()

const PORT = process.env.PORT || 8000

// Connect to MongoDB
connectDB()

app.get('/', (req, res) => {
  res.send('<h1>It is working</h1>')
})

mongoose.connection.once('open', () => {
  console.log('Connect to MongoDB')
  app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })
})