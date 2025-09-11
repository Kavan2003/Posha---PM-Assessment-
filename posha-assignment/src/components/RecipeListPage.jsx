import React from 'react';
import RecipeList from './RecipeList';
import './RecipeListPage.css';

const RecipeListPage = ({ recipes }) => {
  return (
    <div className="recipe-list-page">
      <h2>All Recipes</h2>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default RecipeListPage;
