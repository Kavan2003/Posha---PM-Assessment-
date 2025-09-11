import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeListPage from './components/RecipeListPage';
import RecipeDetailsPage from './components/RecipeDetailsPage';
import { recipes } from './models/recipe';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>Recipe Customizer</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<RecipeListPage recipes={recipes} />} />
            <Route path="/recipe/:id" element={<RecipeDetailsPage recipes={recipes} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
