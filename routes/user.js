const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const ROLES_LIST = require('../config/roles_list.js');
const verifyRoles = require('../middleware/verifyRoles')


router.route('/')
  .get(userController.getAllUsers)
  .put(userController.updateUser)
  .delete(userController.deleteUser)

router.route('/:id')
    .get(userController.getUser)

module.exports = router;