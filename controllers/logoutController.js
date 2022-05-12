const User = require('../model/User.js')

const handleLogout = async (req, res) => {
  // front end delete access token as well 
  const cookies = req.cookies
  // optional chaining operator "?."
  if (!cookies?.jwt) return res.sendStatus(201) // No content
  const refreshToken = cookies.jwt

  // checks if refreshToken is in the database
  const foundUser = await User.findOne({ refreshToken }).exec();
  // if not clear cookie
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    return res.sendStatus(204)
  }
  
  // erase user's refreshToken and save 
  foundUser.refreshToken = ''
  const result = await foundUser.save()
  
  // Delete refreshToken
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
  res.sendStatus(204)
}

module.exports = { handleLogout }