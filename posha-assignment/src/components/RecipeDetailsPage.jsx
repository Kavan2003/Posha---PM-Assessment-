import React from 'react';
import { useParams, Link } from 'react-router-dom';
import RecipeDetails from './RecipeDetails';
import ChatBox from './ChatBox';
import './RecipeDetailsPage.css';

const RecipeDetailsPage = ({ recipes }) => {
  const { id } = useParams();
  const recipe = recipes[id];

  if (!recipe) {
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
          <RecipeDetails recipe={recipe} />
        </div>
        
        <div className="customization-section">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
