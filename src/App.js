import React, { useState } from 'react';
import './App.css';
import './animations.css';

function DiSPA() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('http://localhost:8000/analyze/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms: symptoms.split(',') }),
      });
      const data = await response.json();
      setResult(data.analysis);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header fade-in">
        <h1>DiSPA</h1>
        <p>AI-Powered Disease Symptom Pathway Analyzer</p>
      </header>
      <main className="main">
        <form onSubmit={handleSubmit} className="form fade-in">
          <label>Enter Symptoms (comma-separated):</label>
          <input
            type="text"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g., fever, cough, headache"
          />
          <button type="submit">Analyze</button>
        </form>
        {loading && <div className="loading">Analyzing...</div>}
        {result && (
          <div className="results fade-in">
            <h2>Analysis Results:</h2>
            <ul>
              {result.pathways.map((pathway, index) => (
                <li key={index}>{pathway}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <footer className="footer fade-in">
        <p>© 2024 WSpace AI</p>
      </footer>
    </div>
  );
}

export default DiSPA;
