const User = require('../model/User.js')

const createNewUser = async (req, res) => {
  const user = req.body
  try {
    //create and store the new user
    const result = await User.create({
      "nameUser": user.nameUser,
      "emailUser": user.emailUser,
      "phoneUser": user.phoneUser,
      "passwordUser": user.passwordUser,
      });

      console.log(result);

      res.status(201).json({ 'success': `New user ${user.nameUser} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    if (!users) return res.status(204).json({ 'message': 'No users found.' })
    res.json(users)
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
}


module.exports = { createNewUser, getAllUsers };