const User = require('../model/User.js')
const jwt = require('jsonwebtoken')

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies
  // optional chaining operator "?."
  if (!cookies?.jwt) return res.sendStatus(401)
  const refreshToken = cookies.jwt
  // fetches in the database if the email is registered
  const found = await User.findOne({ refreshToken }).exec();
  // if not throws a message Unauthorized
  if (!found) res.sendStatus(403)
  // checks if the password entered is equal to the one encrypted
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || found.name !== decoded.name) return res.sendStatus(403)
      const accessToken = jwt.sign(
        {
          'UserInfo': {
            'name': decoded.name,
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' }
      )
    }
  ) 
}

module.exports = { handleRefreshToken }