import React, { useState } from 'react';
import './RecipeDetails.css';

const RecipeDetails = ({ recipe }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  // Helper function to format cooking parameters
  const formatStepParameters = (step) => {
    const { action, parameters } = step;
    switch (action) {
      case 'dispense':
        if (parameters.items && parameters.items.length > 0) {
          return (
            <ul className="step-params-list">
              {parameters.items.map((item, idx) => (
                <li key={idx} className="step-param-item">
                  <span className="param-qty">{item.quantity}{item.unit}</span>{' '}
                  <span className="param-name">{item.name}</span>
                </li>
              ))}
            </ul>
          );
        }
        return null;
      case 'cook':
        return (
          <ul className="step-params-list">
            {parameters.mode && (
              <li><strong>Mode:</strong> <span>{parameters.mode}</span></li>
            )}
            {parameters.power_watts && (
              <li><strong>Power:</strong> <span>{parameters.power_watts}W</span></li>
            )}
            {parameters.temperature_celsius && (
              <li><strong>Temp:</strong> <span>{parameters.temperature_celsius}&deg;C</span></li>
            )}
            {parameters.duration_seconds && (
              <li><strong>Duration:</strong> <span>{Math.floor(parameters.duration_seconds / 60)}min {parameters.duration_seconds % 60}s</span></li>
            )}
            {parameters.pressure && (
              <li><strong>Pressure:</strong> <span>{parameters.pressure}</span></li>
            )}
            {parameters.release_method && (
              <li><strong>Release:</strong> <span>{parameters.release_method}</span></li>
            )}
          </ul>
        );
      case 'stir':
        return (
          <ul className="step-params-list">
            {parameters.speed && (
              <li><strong>Speed:</strong> <span>{parameters.speed}</span></li>
            )}
            {parameters.duration_seconds && (
              <li><strong>Duration:</strong> <span>{parameters.duration_seconds}s</span></li>
            )}
          </ul>
        );
      case 'rest':
        return parameters.duration_seconds ? (
          <ul className="step-params-list">
            <li><strong>Rest for:</strong> <span>{parameters.duration_seconds}s</span></li>
          </ul>
        ) : null;
      default:
        return null;
    }
  };

  // Helper function to generate step description based on action and parameters
  const generateStepDescription = (step) => {
    const { action, parameters } = step;
    
    switch (action) {
      case 'dispense':
        if (parameters.items && parameters.items.length > 0) {
          const itemList = parameters.items.map(item => 
            `${item.name} (${item.quantity}${item.unit})`
          ).join(', ');
          return `Dispense ${itemList}`;
        }
        return 'Dispense ingredients';
      
      case 'cook':
        let description = `Cook using ${parameters.mode || 'default mode'}`;
        if (parameters.duration_seconds) {
          const minutes = Math.floor(parameters.duration_seconds / 60);
          const seconds = parameters.duration_seconds % 60;
          if (minutes > 0 && seconds > 0) {
            description += ` for ${minutes}min ${seconds}s`;
          } else if (minutes > 0) {
            description += ` for ${minutes}min`;
          } else {
            description += ` for ${seconds}s`;
          }
        }
        if (parameters.power_watts) {
          description += ` at ${parameters.power_watts}W`;
        }
        return description;
      
      case 'stir':
        let stirDesc = `Stir at ${parameters.speed || 'medium'} speed`;
        if (parameters.duration_seconds) {
          stirDesc += ` for ${parameters.duration_seconds}s`;
        }
        return stirDesc;
      
      case 'rest':
        return parameters.duration_seconds ? 
          `Let rest for ${parameters.duration_seconds}s` : 
          'Let rest';
      
      default:
        return `Perform ${action}`;
    }
  };

  // Helper function to get action icon
  const getActionIcon = (action) => {
    switch (action) {
      case 'dispense': return '📥';
      case 'cook': return '🔥';
      case 'stir': return '🥄';
      case 'rest': return '⏰';
      default: return '📋';
    }
  };

  return (
    <div className="recipe-details">
      <div className="recipe-header">
        <h2>{recipe.name}</h2>
        <p className="recipe-description">{recipe.description}</p>
        {recipe.metadata && recipe.metadata.cuisine_type && (
          <span className="cuisine-type">{recipe.metadata.cuisine_type}</span>
        )}
      </div>
      
      <div className={`recipe-content ${!showInstructions ? 'instructions-hidden' : ''}`}>
        <div className={`ingredients-section ${!showInstructions ? 'two-columns' : ''}`}>
          <h3>Ingredients</h3>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                <span className="ingredient-name">{ingredient.name}</span>
                <span className="ingredient-quantity">{ingredient.quantity} {ingredient.unit}</span>
                {ingredient.notes && (
                  <span className="ingredient-notes">({ingredient.notes})</span>
                )}
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
            <ol className="instructions-list enhanced">
                {recipe.steps.map((step, index) => (
                  <li key={index} className={`instruction-item action-${step.action} instruction-card stunning-card stunning-card-flex`}>
                    <div className="step-row-flex" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.7rem', width: '100%' }}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1.2rem' }}>
                        <div className="step-icon-circle">
                          <span className="step-icon">{getActionIcon(step.action)}</span>
                        </div>
                        <div className="action-label" style={{ fontWeight: 600, fontSize: '1.1rem', color: '#009e6e' }}>
                          {step.action.charAt(0).toUpperCase() + step.action.slice(1)}
                        </div>
                      </div>
                      {formatStepParameters(step) && (
                        <div className="step-parameters" style={{ width: '100%', marginTop: '0.5rem', marginLeft: '0', marginRight: '0' }}>
                          {formatStepParameters(step)}
                        </div>
                      )}
                    </div>
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