import React from 'react';

/**
 * Horizontal scrollable bar that lists nearby attractions for a temple.
 * Clicking an item notifies the parent via `onSelect` with the attraction index.
 */
export default function TourismBar({ attractions, onSelect }) {
  return (
    <div className="tourism-bar">
      {attractions.map((attr, idx) => (
        <button
          type="button"
          key={idx}
          className="tourism-item"
          onClick={() => onSelect(idx)}
        >
          <img src={attr.imageUrl} alt={attr.name} className="tourism-thumb" />
          <span className="tourism-name">{attr.name}</span>
        </button>
      ))}
    </div>
  );
}

