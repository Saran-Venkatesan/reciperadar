import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm = ({ onRecipeAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    image: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/recipes', formData);
    onRecipeAdded(); // Refresh the list
    setFormData({ title: '', ingredients: '', instructions: '', image: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4 mb-6">
      <input className="w-full p-2 border rounded" name="title" placeholder="Title" onChange={handleChange} value={formData.title} required />
      <textarea className="w-full p-2 border rounded" name="ingredients" placeholder="Ingredients" onChange={handleChange} value={formData.ingredients} required />
      <textarea className="w-full p-2 border rounded" name="instructions" placeholder="Instructions" onChange={handleChange} value={formData.instructions} required />
      <input className="w-full p-2 border rounded" name="image" placeholder="Image URL (optional)" onChange={handleChange} value={formData.image} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Recipe</button>
    </form>
  );
};

export default RecipeForm;
