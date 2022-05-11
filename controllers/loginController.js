const User = require('../model/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const handleLogin = async (req, res) => {
  console.log('chega handleLogin')
  console.log(req.body.email)
  // checks if they are empty 
  if (!req.body.email || !req.body.password) return res.status(400).json({ 'message': 'Email and password are required.' })
  // fetches in the database if the email is registered
  const foundUser = await User.findOne({ email: req.body.email }).exec();
  // if not throws a message Unauthorized
  if (!foundUser) return res.sendStatus(401).json({ 'message': 'Unauthorized not foundUser.' });
  // checks if the password entered is equal to the one encrypted
  console.log(foundUser)
  console.log(req.body.email)
  console.log(req.body.password)
  const match = await bcrypt.compare(req.body.password, foundUser.password);
  console.log(match)
  if (match) {
    // create JWT
    const accessToken = jwt.sign(
      { 'name': foundUser.name },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    )
    const refreshToken = jwt.sign(
      { 'name': foundUser.name },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    )
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken
    const result = await foundUser.save()
    console.log(result)


    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    res.json({ accessToken })
  } else {
    res.status(401).json({ 'message': 'Unauthorized password did not match.' });
  }
  
}

module.exports = { handleLogin }