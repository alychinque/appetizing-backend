const Order = require('../model/Order')

const createOrder = async (req, res) => {
  const order = req.body
  let date = new Date
  console.log(date.toDateString())
  console.log(date)
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

module.exports = { createOrder, getAllOrders }