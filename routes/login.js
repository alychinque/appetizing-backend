const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
  .post(verifyJWT, loginController.handleLogin)

module.exports = router;