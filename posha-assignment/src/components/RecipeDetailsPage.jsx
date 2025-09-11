import React from 'react';
import { useParams, Link } from 'react-router-dom';
import RecipeDetails from './RecipeDetails';
import ChatBox from './ChatBox';
import './RecipeDetailsPage.css';

const RecipeDetailsPage = ({ recipes }) => {
  const { id } = useParams();
  const originalRecipe = recipes[id];
  const [currentRecipe, setCurrentRecipe] = React.useState(originalRecipe);

  // Always use latest ingredients for Gemini prompt
  const getIngredientsJSONString = () => {
    return JSON.stringify(
      { ingredients: currentRecipe.ingredients },
      null,
      2
    );
  };

  // Apply Gemini customizations to recipe
  const handleCustomization = (response) => {
    if (!response || !response.status || response.status.state !== 'success') return;
    let updatedIngredients = [...currentRecipe.ingredients];

    // Helper to find ingredient index
    const findIndex = (name) => updatedIngredients.findIndex(i => i.name.toLowerCase() === name.toLowerCase());

    // Apply each customization intent
    response.customisations.forEach(cust => {
      switch (cust.intent) {
        case 'remove_ingredient': {
          const idx = findIndex(cust.target_ingredient);
          if (idx !== -1) updatedIngredients.splice(idx, 1);
          break;
        }
        case 'add_ingredient': {
          if (cust.new_ingredient) {
            const idx = findIndex(cust.new_ingredient.name);
            if (idx !== -1) {
              // Handle mode for add_ingredient
              if (cust.mode === 'Add' || !cust.mode) {
                updatedIngredients[idx].quantity += cust.new_ingredient.quantity;
              } else if (cust.mode === 'Sub') {
                updatedIngredients[idx].quantity -= cust.new_ingredient.quantity;
              } else if (cust.mode === 'Set') {
                updatedIngredients[idx].quantity = cust.new_ingredient.quantity;
              }
              updatedIngredients[idx].unit = cust.new_ingredient.unit;
            } else {
              updatedIngredients.push({ ...cust.new_ingredient });
            }
          }
          break;
        }
        case 'substitute_ingredient': {
          const targetIdx = findIndex(cust.target_ingredient);
          if (targetIdx !== -1 && cust.new_ingredient) {
            const newIdx = findIndex(cust.new_ingredient.name);
            if (newIdx !== -1 && newIdx !== targetIdx) {
              // If new ingredient exists elsewhere, add quantity and remove target
              updatedIngredients[newIdx].quantity += cust.new_ingredient.quantity;
              updatedIngredients[newIdx].unit = cust.new_ingredient.unit;
              updatedIngredients.splice(targetIdx, 1);
            } else {
              // Replace target with new ingredient
              updatedIngredients[targetIdx] = { ...cust.new_ingredient };
            }
          }
          break;
        }
        case 'adjust_quantity': {
          const idx = findIndex(cust.target_ingredient);
          if (idx !== -1) {
            // Handle mode for adjust_quantity
            if (cust.mode === 'Add') {
              updatedIngredients[idx].quantity += cust.quantity;
            } else if (cust.mode === 'Sub') {
              updatedIngredients[idx].quantity -= cust.quantity;
            } else if (cust.mode === 'Set' || !cust.mode) {
              updatedIngredients[idx].quantity = cust.quantity;
            }
            updatedIngredients[idx].unit = cust.unit;
          }
          break;
        }
        default:
          break;
      }
    });
    // Remove ingredients with quantity 0 or less
    updatedIngredients = updatedIngredients.filter(i => i.quantity > 0);
    setCurrentRecipe({ ...currentRecipe, ingredients: updatedIngredients });
  };

  // Expose handler and latest ingredients to ChatBox via window
  React.useEffect(() => {
    window.onCustomization = handleCustomization;
    window.getIngredientsJSONString = getIngredientsJSONString;
    return () => {
      window.onCustomization = null;
      window.getIngredientsJSONString = null;
    };
  }, [currentRecipe]);

  if (!currentRecipe) {
    return (
      <div className="recipe-not-found">
        <h2>Recipe not found</h2>
        <Link to="/" className="back-link">← Back to Recipes</Link>
      </div>
    );
  }

  return (
    <div className="recipe-details-page">
      <div className="page-header">
        <Link to="/" className="back-link">
          <span className="back-icon">←</span>
          Back to Recipes
        </Link>
      </div>
      <div className="page-content">
        <div className="recipe-section">
          <RecipeDetails recipe={currentRecipe} />
        </div>
        <div className="customization-section">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
