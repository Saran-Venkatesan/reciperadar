import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const UploadRecipe = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
  const [instructions, setInstructions] = useState('');

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const removeIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const res = await axios.post(
        'http://localhost:5000/api/recipes',
        {
          title,
          ingredients: JSON.stringify(ingredients), // ✅ FIXED: now sending as JSON string
          instructions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      alert('Recipe uploaded successfully!');
      setTitle('');
      setInstructions('');
      setIngredients([{ name: '', quantity: '' }]);
    } catch (err) {
      console.error('Error uploading recipe:', err);
      alert(`Failed to upload recipe: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Upload a New Recipe</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Recipe Title</label>
              <input
                type="text"
                placeholder="e.g., Creamy Pasta"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Ingredients</label>
              {ingredients.map((ing, index) => (
                <div key={index} className="flex gap-2 mb-2 items-center">
                  <input
                    type="text"
                    placeholder="Name"
                    value={ing.name}
                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                    className="w-1/2 p-2 border border-gray-300 rounded-xl"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Quantity"
                    value={ing.quantity}
                    onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                    className="w-1/2 p-2 border border-gray-300 rounded-xl"
                    required
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="text-red-500 text-lg font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addIngredient}
                className="mt-2 text-blue-600 hover:underline"
              >
                + Add Another Ingredient
              </button>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Instructions</label>
              <textarea
                placeholder="Describe the steps clearly..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300"
            >
              Submit Recipe
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadRecipe;
