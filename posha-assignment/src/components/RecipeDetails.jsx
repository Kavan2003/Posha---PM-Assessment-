import React, { useState } from 'react';
import './RecipeDetails.css';

const RecipeDetails = ({ recipe }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="recipe-details">
      <div className="recipe-header">
        <h2>{recipe.name}</h2>
        <p className="recipe-description">{recipe.description}</p>
      </div>
      
      <div className={`recipe-content ${!showInstructions ? 'instructions-hidden' : ''}`}>
        <div className="ingredients-section">
          <h3>Ingredients</h3>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                <span className="ingredient-name">{ingredient.name}</span>
                <span className="ingredient-quantity">{ingredient.quantity} {ingredient.unit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="instructions-section">
          <div className="instructions-header">
            <h3>Instructions</h3>
            <button 
              className="toggle-instructions"
              onClick={() => setShowInstructions(!showInstructions)}
            >
              {showInstructions ? '⏫ Hide Steps' : '⏬ Show Steps'}
            </button>
          </div>
          
          {showInstructions && (
            <ol className="instructions-list">
              {recipe.steps.map((step, index) => (
                <li key={index} className="instruction-item">
                  <span className="step-number">{step.step_number}</span>
                  <span className="step-description">{step.description}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
