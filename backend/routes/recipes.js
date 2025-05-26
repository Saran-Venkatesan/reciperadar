const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const authenticate = require('../middleware/auth');

// GET /api/recipes - Fetch all recipes (Public endpoint)
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 }); // Optional: sort by newest first
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// POST /api/recipes (requires authentication)
router.post('/', authenticate, async (req, res) => {
  try {
    // Parse ingredients if it's a string
    let ingredients = req.body.ingredients;
    if (typeof ingredients === 'string') {
      ingredients = JSON.parse(ingredients);
    }

    const newRecipe = new Recipe({
      title: req.body.title,
      ingredients: ingredients,
      instructions: req.body.instructions,
      createdBy: req.user.id  // 🔥 This is the fix!
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload recipe' });
  }
});

module.exports = router;
