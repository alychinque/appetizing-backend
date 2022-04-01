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
            "items": meal.items,
            "allergies": meal.allergies,
            "extras": meal.extras,
            "active": meal.active
        });

        console.log(result);

        res.status(201).json({ 'success': `New meal ${meal} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const updateMeal = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const meal = await Meal.findOne({ _id: req.body.id }).exec();
    if (!meal) {
        return res.status(204).json({ "message": `No meal matches ID ${req.body.id}.` });
    }
    
    meal.nameMeal = req.body.nameMeal,
    meal.priceMeal = req.body.priceMeal,
    meal.items = req.body.items,
    meal.allergies = req.body.allergies,
    meal.extras = req.body.extras,
    meal.active = req.body.active
    const result = await meal.save();
    res.json(result);
}

module.exports = { createNewMeal, getAllMeals, updateMeal};



            