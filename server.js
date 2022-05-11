const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const cookieParser = require('cookie-parser')
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')

require('dotenv').config()

const PORT = process.env.PORT || 9000

// Connect to MongoDB
connectDB()

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handler urlencoded form data
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json 
app.use(express.json());

// middleware for cookies
app.use(cookieParser())

// Routes
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/meal', require('./routes/meal'));
app.use('/item', require('./routes/item'));
app.use('/allergy', require('./routes/allergy'));
app.use('/drink', require('./routes/drink'));
app.use('/order', require('./routes/order'));
app.use('/user', require('./routes/user'));

mongoose.connection.once('open', () => {
    console.log('Connect to MongoDB')
    app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })
})