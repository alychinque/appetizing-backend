const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
// const verifyJWT = require('../middleware/verifyJWT')


router.route('/')
  .post(orderController.createOrder)
  .post(orderController.createOrderGuest)
  .get(orderController.getAllOrders)
  .put(orderController.updateOrder)
  .delete(orderController.deleteOrder)

  router.route('/:id')
    .get(orderController.getOrder);

module.exports = router;