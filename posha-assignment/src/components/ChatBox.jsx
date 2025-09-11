import React, { useState } from 'react';
import './ChatBox.css';

const quickSuggestions = [
  { text: 'Remove chicken', icon: '🚫' },
  { text: 'Add garlic', icon: '🧄' },
  { text: 'Less salt', icon: '🧂' },
  { text: 'More cheese', icon: '🧀' },
  { text: 'Make it vegan', icon: '🌱' },
  { text: 'Gluten-free', icon: '🌾' }
];

const ChatBox = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError('Please enter a customization request.');
      return;
    }
    
    setLoading(true);
    setError(null);
    setOutput(null);
    setCopied(false);
    
    // Simulate API call
    setTimeout(() => {
      let json = {};
      const inputLower = input.toLowerCase();
      
      if (inputLower.includes('chicken') || inputLower.includes('remove')) {
        json = {
          status: { state: 'success', reason: null },
          customisations: [
            { intent: 'remove_ingredient', target_ingredient: 'Boneless Chicken Thighs' }
          ],
          original_request: input
        };
      } else if (inputLower.includes('garlic')) {
        json = {
          status: { state: 'success', reason: null },
          customisations: [
            { intent: 'add_ingredient', new_ingredient: { name: 'Garlic', quantity: 3, unit: 'cloves' } }
          ],
          original_request: input
        };
      } else if (inputLower.includes('vegan')) {
        json = {
          status: { state: 'success', reason: null },
          customisations: [
            { intent: 'remove_ingredient', target_ingredient: 'Boneless Chicken Thighs' },
            { intent: 'remove_ingredient', target_ingredient: 'Dairy Cream Cheese' },
            { intent: 'remove_ingredient', target_ingredient: 'Parmesan Cheese' },
            { intent: 'add_ingredient', new_ingredient: { name: 'Cashew Cream', quantity: 100, unit: 'ml' } }
          ],
          original_request: input
        };
      } else if (inputLower.includes('salt') || inputLower.includes('less')) {
        json = {
          status: { state: 'success', reason: null },
          customisations: [
            { intent: 'modify_ingredient', target_ingredient: 'Salt', new_quantity: 3, unit: 'g' }
          ],
          original_request: input
        };
      } else if (inputLower.includes('cheese') || inputLower.includes('more')) {
        json = {
          status: { state: 'success', reason: null },
          customisations: [
            { intent: 'modify_ingredient', target_ingredient: 'Parmesan Cheese', new_quantity: 50, unit: 'g' }
          ],
          original_request: input
        };
      } else {
        json = {
          status: { state: 'failure', reason: 'ambiguous_request' },
          customisations: [],
          original_request: input,
          suggestion: 'Try being more specific, like "remove chicken" or "add garlic"'
        };
      }
      
      setOutput(json);
      setLoading(false);
    }, 1200);
  };

  const handleSuggestion = (suggestion) => {
    setInput(suggestion);
    setError(null);
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(JSON.stringify(output, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-header">
        <h3>🍳 Customize Recipe</h3>
        <p>Tell us how you'd like to modify this recipe</p>
      </div>
      
      
      
      <form onSubmit={handleSubmit} className="chat-form">
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., 'Add more vegetables'"
            className="chat-input"
            disabled={loading}
          />
          <button type="submit" disabled={loading || !input.trim()} className="chat-submit">
            {loading ? (
              <div className="spinner"></div>
            ) : (
              <span>🍳 Update Recipe</span>
            )}
          </button>
        </div>
      </form>
      
      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}
      
      {output && (
        <div className="chat-output">
          <div className="output-header">
            <h4>
              {output.status.state === 'success' ? '✅ Recipe Customization' : '❌ Unable to Process'}
            </h4>
            <button onClick={handleCopy} className="copy-btn">
              {copied ? '✓ Copied!' : '📋 Copy JSON'}
            </button>
          </div>
          
          {output.status.state === 'success' ? (
            <div className="customizations-preview">
              <h5>Changes to be made:</h5>
              <ul className="changes-list">
                {output.customisations.map((change, index) => (
                  <li key={index} className={`change-item ${change.intent}`}>
                    {change.intent === 'remove_ingredient' && (
                      <span>🗑️ Remove <strong>{change.target_ingredient}</strong></span>
                    )}
                    {change.intent === 'add_ingredient' && (
                      <span>➕ Add <strong>{change.new_ingredient.quantity} {change.new_ingredient.unit} {change.new_ingredient.name}</strong></span>
                    )}
                    {change.intent === 'modify_ingredient' && (
                      <span>✏️ Change <strong>{change.target_ingredient}</strong> to <strong>{change.new_quantity} {change.unit}</strong></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="error-details">
              <p>Reason: {output.status.reason}</p>
              {output.suggestion && <p className="suggestion">💡 {output.suggestion}</p>}
            </div>
          )}
          
          <details className="raw-json">
            <summary>View Raw JSON</summary>
            <pre>{JSON.stringify(output, null, 2)}</pre>
          </details>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
