const User = require('../model/User.js')
const bcrypt = require('bcryptjs')

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({},{"passwordUser": 0})
    if (!users) return res.status(204).json({ 'message': 'No users found.' })

    
    res.json(users)
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
}

const updateUser = async (req, res) => {
  if (!req?.body?._id) return res.status(400).json({ 'message': 'ID parameter is required.' });
  const user = await User.findOne({ _id: req.body._id }).exec();
  if (!user) return res.status(204).json({ "message": `No user matches ID ${req.body._id}.` });
  try {
    user.name = req.body.name
    user.email = req.body.email
    user.phone = req.body.phone
    user.password = req.body.password
    user.active = req.body.active
    const result = await user.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
}

const deleteUser = async (req, res, next) => {
  if (!req?.body?._id) return res.status(400).json({ 'message': 'User ID required.' });
  const user = await User.findOne({ _id: req.body._id }).exec();
  if (!user) return res.status(204).json({ "message": `No user matches ID ${req.body._id}.` });
  try {
    const result = await user.deleteOne({ _id: req.body._id });
    res.json(result);
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
}

const getUser = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ 'message': 'User ID required.' });
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) return res.status(204).json({ "message": `No User matches ID ${req.params._id}.` });
  res.json(user);
  
}


module.exports = { getAllUsers, updateUser, deleteUser, getUser };