const User = require('../model/User.js')
const bcrypt = require('bcryptjs')

const createNewUser = async (req, res, next) => {
  const user = req.body
  const find = await User.findOne({ email: req.body.email }).exec();
  try {
    if (!find) {
      if (req.body.password == req.body.confirm_password) {
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
      }else{
        res.status(400).json({ 'message': 'Passwords do not match.' });
      }
    }else{
      res.status(422).json({ 'message': 'User already exists.' });
    }
  } catch (err) {
    res.status(400).json({ 'message': err.message });
  }
}

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
  try {
    if (!req?.body?._id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const user = await User.findOne({ _id: req.body._id }).exec();
    if (!user) {
        return res.status(204).json({ "message": `No user matches ID ${req.body._id}.` });
    }
    
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
  try {
    if (!req?.body?._id) return res.status(400).json({ 'message': 'User ID required.' });

    const user = await User.findOne({ _id: req.body._id }).exec();
    if (!user) {
        return res.status(204).json({ "message": `No user matches ID ${req.body._id}.` });
    }
    const result = await user.deleteOne({ _id: req.body._id });
    res.json(result);
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
}

const getUser = async (req, res) => {
  try {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'User ID required.' });

    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ "message": `No User matches ID ${req.params._id}.` });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
}


module.exports = { createNewUser, getAllUsers, updateUser, deleteUser, getUser };