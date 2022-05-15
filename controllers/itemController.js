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
            'success': `new Item ${item.nameItem} created`
        })

    } catch (error) {
        res.status(500).json({
            'message': error.message
        })
    }
}

const updateItem = async(req, res) => {

    if (!req.body.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const item = await Item.findOne({ _id: req.body.id }).exec();
    if (!item) {
        return res.status(204).json({ "message": `No item matches ID ${req.body.id}.` });
    }
    try{
        item.nameItem = req.body.nameItem,
        item.priceItem = req.body.priceItem
        const result = await item.save()
        res.Itemtemstatus(200).json(result)
    } catch (error) {
        res.status(500).json({
            'message': error.message
        })
    }
}

const deleteItem = async(req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Item ID required.' });
    const item = await Item.findOne({ _id: req.params.id }).exec();
    if (!item) return res.status(204).json({ "message": `No item matches ID ${req.body.id}.` });
    try{
    const result = await item.deleteOne({ _id: req.body.id });
    res.json(result);
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

const getItem = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Item ID required.' });
    const item = await Item.findOne({ _id: req.params.id }).exec();
    if (!item) return res.status(204).json({ "message": `No item matches ID ${req.params.id}.` });
    res.json(item);
}

module.exports = { createNewItem, getAllItems, updateItem, deleteItem, getItem }