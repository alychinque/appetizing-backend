const User = require('../model/User.js')

const createNewUser = async (req, res) => {
  const user = req.body

  //blocks same email
  const find = await User.findOne({ emailUser: req.body.email }).exec();
  if (!find) {
  try {
    //create and store the new user
    const result = await User.create({
      "nameUser": user.name,
      "emailUser": user.email,
      "phoneUser": user.phone,
      "passwordUser": user.password,
      });

      console.log(result);

      res.status(201).json({ 'success': `New user ${user.nameUser} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
  }
  else{
    res.status(500).json({ 'message': 'User already exists' });
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
    console.log(result)
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