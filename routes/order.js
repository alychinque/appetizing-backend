const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.route('/')
  .post(orderController.createOrder)
  .get(orderController.getAllOrders)
  .put(orderController.updateOrder)
  .delete(orderController.deleteOrder)

  router.route('/:id')
    .get(orderController.getOrder);

module.exports = router;