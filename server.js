const express = require('express')
const app = express()

const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')

require('dotenv').config()

const PORT = process.env.PORT || 9000

// built-in middleware for json 
app.use(express.json());

// Connect to MongoDB
connectDB()

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Routes
app.use('/meal', require('./routes/meal'));
app.use('/item', require('./routes/item'));
app.use('/drink', require('./routes/drink'));

mongoose.connection.once('open', () => {
    console.log('Connect to MongoDB')
    app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })
})