const Meal = require('../model/Meal.js')

const getAllMeals = async (req, res) => {
    const meals = await Meal.find()
    if (!meals) return res.status(204).json({ 'message': 'No meals found.' })
    res.json(meals)
}

const createNewMeal = async (req, res) => {
  const meal = req.body
  try {
    //create and store the new meal
    const result = await Meal.create({
            "nameMeal": meal.nameMeal.toLowerCase(),
            "priceMeal": meal.priceMeal,
            "photoMeal": meal.photoMeal,
            "items": meal.items,
            "allergies": meal.allergies,
            "extras": meal.extras,
            "active": meal.active
        });
        res.status(201).json({ 'success': `New meal ${meal.nameMeal} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const updateMeal = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const meal = await Meal.findOne({ _id: req.body.id }).exec();
    if (!meal) return res.status(204).json({ "message": `No meal matches ID ${req.body.id}.` });
    try {
        meal.nameMeal = req.body.nameMeal.toLowerCase(),
        meal.priceMeal = req.body.priceMeal,
        meal.items = req.body.items,
        meal.allergies = req.body.allergies,
        meal.extras = req.body.extras,
        meal.active = req.body.active
        const result = await meal.save();
        res.json(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const deleteMeal = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Employee ID required.' });
    const meal = await Meal.findOne({ _id: req.params.id }).exec();
    if (!meal) return res.status(204).json({ "message": `No meal matches ID ${req.body.id}.` });
    try{
        const result = await meal.deleteOne({ _id: req.body.id });
        res.json(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const getMeal = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Employee ID required.' });
    const meal = await Meal.findOne({ _id: req.params.id }).exec();
    if (!meal) return res.status(204).json({ "message": `No meal matches ID ${req.params.id}.` });
    res.json(meal);
}

module.exports = { createNewMeal, getAllMeals, updateMeal, deleteMeal, getMeal};



            