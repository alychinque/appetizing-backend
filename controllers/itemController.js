const Item = require('../model/Item')

const createNewItem = async(req, res) => {

    const item = req.body
    try {

        //create and store a new item
        const result = await Item.create({
            "nameItem": item.nameItem,
            "priceItem": item.priceItem
        })
        res.status(201).json({
            'success': `new Item ${item} created`
        })

    } catch (error) {
        res.status(500).json({
            'message': error.message
        })
    }
}

const getAllItems = async(req, res) => {
    const items = await Item.find()
    if (!items) return res.status(204).json({ 'message': 'No items found.' })
    res.json(items)
}
module.exports = { createNewItem, getAllItems }