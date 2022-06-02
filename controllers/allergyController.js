const Allergy = require('../model/Allergy')

const createNewAllergy = async(req, res) => {

    const allergy = req.body
    try {
        //create and store a new allergy
        const result = await Allergy.create({
            "nameAllergy": allergy.nameAllergy,
            "numberAllergy": allergy.numberAllergy
        })
        res.status(201).json({
            'success': `new Allergy ${allergy.nameAllergy} created`
        })

    } catch (err) {
        res.status(500).json({'message': err.message})
    }
}

const updateAllergy = async(req, res) => {

    if (!req.body.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const allergy = await Allergy.findOne({ _id: req.body.id }).exec();
    if (!allergy) return res.status(204).json({ "message": `No allergy matches ID ${req.body.id}.` });
    try{
        allergy.nameAllergy = req.body.nameAllergy,
        allergy.numberAllergy = req.body.numberAllergy
        const result = await allergy.save()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({'message': err.message})
    }
}

const deleteAllergy = async(req, res) => {
    if (!req.params.id) return res.status(400).json({ 'message': 'Allergy ID required.' });
    const allergy = await Allergy.findOne({ _id: req.params.id }).exec();
    if (!allergy) return res.status(204).json({ "message": `No allergy matches ID ${req.body.id}.` });
    try{
        const result = await allergy.deleteOne({ _id: req.body.id });
        res.json(result);
    } catch (err) {
        res.status(500).json({'message': err.message})
    }
}


const getAllAllergies = async(req, res) => {
    const allergys = await Allergy.find()
    if (!allergys) return res.status(204).json({ 'message': 'No allergy found.' })
    res.json(allergys)
}

const getAllergy = async(req, res) => {
    if (!req.params.id) return res.status(400).json({ 'message': 'Allergy ID required.' });
    const allergy = await Allergy.findOne({ _id: req.params.id }).exec();
    if (!allergy) return res.status(204).json({ "message": `No allergy matches ID ${req.params.id}.` });
    res.json(allergy);
}

module.exports = { createNewAllergy, getAllAllergies, updateAllergy, deleteAllergy, getAllergy }