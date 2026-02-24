import React from 'react';
import '../styles/SearchBar.css';

function SearchBar({ searchTerm, onSearchChange, resultCount }) {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input 
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button 
            className="clear-search"
            onClick={() => onSearchChange('')}
          >
            ✕
          </button>
        )}
      </div>
      {searchTerm && resultCount !== undefined && (
        <p className="search-result-count">
          {resultCount} {resultCount === 1 ? 'result' : 'results'} found
        </p>
      )}
    </div>
  );
}

export default SearchBar;