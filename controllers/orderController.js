const Order = require('../model/Order')

const createOrder = async (req, res) => {
  const order = req.body
  try {
    // creates a new order and store in the database
    const result = await Order.create({
      "idUser": order.idUser,
      "meals": order.meals,
      "table": order.table,
      "message": order.message,
      "extra": order.extra,
      "priceTotal": order.priceTotal,
      "status": order.status,
      "date": order.date,
    })

    console.log(result)

    res.status(201).json({ 'success': 'new order created!'})
  } catch (error) {
    res.status(500).json({ 'message': error.message })
  }
}

const getAllOrders = async (req, res) => {
    const orders = await Order.find()
    if (!orders) return res.status(204).json({ 'message': 'No orders found.' })
    res.json(orders)
}

const updateOrder = async (req, res) => {
    if (!req?.body?._id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const order = await Order.findOne({ _id: req.body._id }).exec();
    if (!order) {
        return res.status(204).json({ "message": `No order matches ID ${req.body._id}.` });
    }
    
    order.idUser = req.body.idUser
    order.meals = req.body.meals
    order.table = req.body.table
    order.message = req.body.message
    order.extra = req.body.extra
    order.priceTotal = req.body.priceTotal
    order.status = req.body.status
    order.date = req.body.date
    const result = await order.save();
    res.json(result);
}

const deleteOrder = async (req, res, next) => {
  try {
    if (!req?.body?._id) return res.status(400).json({ 'message': 'Order ID required.' });

    const order = await Order.findOne({ _id: req.body._id }).exec();
    if (!order) {
        return res.status(204).json({ "message": `No order matches ID ${req.body._id}.` });
    }
    const result = await order.deleteOne({ _id: req.body._id });
    res.json(result);
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
}

const getOrder = async (req, res) => {
  try {
    if (!req?.params?._id) return res.status(400).json({ 'message': 'Order ID required.' });

    const order = await Order.findOne({ _id: req.params._id }).exec();
    if (!order) {
        return res.status(204).json({ "message": `No order matches ID ${req.params._id}.` });
    }
    res.json(meal);
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
}


module.exports = { createOrder, getAllOrders, updateOrder, deleteOrder, getOrder }