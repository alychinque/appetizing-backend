const { application } = require('express')
const express = require('express')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
  res.send('<h1>It is working</h1>')
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})