const Meal = require('../model/Meal.js')

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
        res.status(500).json({ 'message123': err.message });
    }
}

module.exports = { createNewMeal };



            