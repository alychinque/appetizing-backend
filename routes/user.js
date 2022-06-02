const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const ROLES_LIST = require('../config/roles_list.js');
const verifyRoles = require('../middleware/verifyRoles')


router.route('/')
  .get(userController.getAllUsers)
  .put(userController.updateUser)
  
  router.route('/:id')
  .get(userController.getUser)
  .delete(userController.deleteUser)

module.exports = router;