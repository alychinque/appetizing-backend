const { application } = require('express')
const express = require('express')
const app = express()

const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')

require('dotenv').config()

const PORT = process.env.PORT || 8000

// Connect to MongoDB
connectDB()

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware for json 
app.use(express.json());

// Routes
app.use('/meal', require('./routes/meal'));

mongoose.connection.once('open', () => {
  console.log('Connect to MongoDB')
  app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })
})