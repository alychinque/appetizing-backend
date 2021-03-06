const User = require('../model/User.js')
const jwt = require('jsonwebtoken')

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies
  // optional chaining operator "?."
  if (!cookies?.jwt) return res.sendStatus(401)
  const refreshToken = cookies.jwt
  // fetches in the database if the email is registered
  const foundUser = await User.findOne({ refreshToken }).exec();
  // if not throws a message Unauthorized
  if (!foundUser) return res.sendStatus(403)
  // verify if the refreshToken is still valid
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err && foundUser.name !== decoded.name) return res.sendStatus(403)
      const accessToken = jwt.sign(
        { 'name': decoded.name },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '5m' }
      )
        res.json({ accessToken })
    }
  ) 
}

module.exports = { handleRefreshToken }