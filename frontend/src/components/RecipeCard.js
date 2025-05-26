import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 w-full max-w-md mx-auto">
      {/* Optional Image */}
      {/* <img src={recipe.imageUrl} alt={recipe.title} className="rounded-xl mb-4 w-full h-48 object-cover" /> */}
      
      <h2 className="text-xl font-semibold text-blue-700 mb-2">{recipe.title}</h2>

      <div className="mb-3">
        <h3 className="font-medium text-gray-700">Ingredients:</h3>
        <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
          {Array.isArray(recipe.ingredients) ? (
            recipe.ingredients.map((ing, index) => (
              <li key={index}>
                <span className="font-medium">{ing.name}</span>: {ing.quantity}
              </li>
            ))
          ) : (
            <li>Invalid format</li>
          )}
        </ul>
      </div>

      <div>
        <h3 className="font-medium text-gray-700">Instructions:</h3>
        <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
