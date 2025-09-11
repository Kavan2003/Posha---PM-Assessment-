import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeList.css';

const RecipeList = ({ recipes }) => {
  return (
    <div className="recipe-list">
      {recipes.map((recipe, index) => (
        <Link to={`/recipe/${index}`} key={index} className="recipe-card">
          <div className="recipe-card-content">
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
            <div className="recipe-meta">
              <span className="ingredient-count">{recipe.ingredients.length} ingredients</span>
              <span className="step-count">{recipe.steps.length} steps</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecipeList;
