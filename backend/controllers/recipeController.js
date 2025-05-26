// controllers/recipeController.js

exports.createRecipe = async (req, res) => {
  const { title, ingredients, instructions, image } = req.body;

  let parsedIngredients = ingredients;
  if (typeof ingredients === 'string') {
    try {
      parsedIngredients = JSON.parse(ingredients);
    } catch (err) {
      return res.status(400).json({ message: 'Invalid ingredients format' });
    }
  }

  const newRecipe = new Recipe({ title, ingredients: parsedIngredients, instructions, image });

  try {
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
