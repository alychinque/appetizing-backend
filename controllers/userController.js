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

const updateUser = async (req, res) => {
  try {
    if (!req?.body?._id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const user = await User.findOne({ _id: req.body._id }).exec();
    if (!user) {
        return res.status(204).json({ "message": `No user matches ID ${req.body._id}.` });
    }
    
    user.nameUser = req.body.nameUser
    user.emailUser = req.body.emailUser
    user.phoneUser = req.body.phoneUser
    user.passwordUser = req.body.passwordUser
    user.active = req.body.active
    const result = await user.save();
    console.log(result)
    res.json(result);
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
}


module.exports = { createNewUser, getAllUsers, updateUser };