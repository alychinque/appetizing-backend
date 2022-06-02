const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
// const verifyJWT = require('../middleware/verifyJWT')


router.route('/')
  .post(orderController.createOrder)
  .post(orderController.createOrderGuest)
  .get(orderController.getAllOrders)
  .put(orderController.updateOrder)
  
  router.route('/:id')
  .get(orderController.getOrder)
  .delete(orderController.deleteOrder)

module.exports = router;