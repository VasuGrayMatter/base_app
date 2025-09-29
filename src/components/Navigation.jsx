import React from 'react';
import './Navigation.css';

const categories = [
  { key: 'food', label: '🍕 Food', color: '#ff6b6b' },
  { key: 'events', label: '🎭 Events', color: '#4ecdc4' },
  { key: 'cab', label: '🚗 Cab', color: '#45b7d1' },
  { key: 'hotel', label: '🏨 Hotel', color: '#96ceb4' }
];

export default function Navigation({ activeCategory, setActiveCategory }) {
  return (
    <nav className="navigation">
      <div className="nav-header">
        <h2>📋 Categories</h2>
      </div>
      <ul className="nav-list">
        {categories.map(category => (
          <li key={category.key}>
            <button 
              className={`nav-item ${activeCategory === category.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.key)}
              style={{ '--accent-color': category.color }}
            >
              <span className="nav-icon">{category.label.split(' ')[0]}</span>
              <span className="nav-label">{category.label.split(' ')[1]}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}