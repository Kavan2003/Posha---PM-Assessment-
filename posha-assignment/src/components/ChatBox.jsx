import React, { useState } from 'react';
import { fetchGeminiCustomization } from '../controllers/geminiController';
import './ChatBox.css';

const quickSuggestions = [
  { text: 'Remove chicken', icon: '🚫' },
  { text: 'Add garlic', icon: '🧄' },
  { text: 'Less salt', icon: '🧂' },
  { text: 'More cheese', icon: '🧀' },
];

const ChatBox = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  // Accept a callback prop for customization
  const onCustomization = typeof window.onCustomization === 'function' ? window.onCustomization : null;

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
    try {
      const response = await fetchGeminiCustomization(input);
  console.log('Gemini full response:', response);
      setOutput(response);
      if (onCustomization && response && response.status && response.customisations) {
        onCustomization(response);
      }
    } catch (err) {
      setError('Failed to fetch from Gemini API.');
    }
    setLoading(false);
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
      {output && output.status && (
        <div
          className="gemini-message"
          style={{
            color: output.status.state === 'success' ? 'green' : 'red',
            fontWeight: 600,
            fontSize: '1.1rem',
            marginTop: '1rem',
            border: `1.5px solid ${output.status.state === 'success' ? 'green' : 'red'}`,
            borderRadius: '8px',
            padding: '0.7rem',
            background: output.status.state === 'success' ? '#eaffea' : '#ffeaea',
          }}
        >
          {output.status.message}
        </div>
      )}
    </div>
  );
}

export default ChatBox;
