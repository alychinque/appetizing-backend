const User = require('../model/User.js')
const bcrypt = require('bcryptjs')

const registerUser = async (req, res, next) => {
  const user = req.body
  if ( !req.body.password || Object.keys(req.body.password).length < 6) return res.status(409).json({ 'message': 'password invalid' });
  const found = await User.findOne({ email: req.body.email }).exec();
  if (found) return res.status(409).json({ 'message': 'User already exists.' });
  try {
    //create and store the new user
    const saltRounds = 10;
    const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
    const result = await User.create({
      "name": user.name,
      "email": user.email,
      "phone": user.phone,
      "password": hashedPwd,
      });
    res.status(201).json({ 'success': `New user ${user.name} created!` });
  } catch (err) {
    res.status(400).json({ 'message': err.message });
  }
}

module.exports = { registerUser }