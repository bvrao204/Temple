import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Sparkles } from 'lucide-react';

export default function Hero({ temples, onSelectTemple }) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length > 0) {
      const filtered = temples.filter(t => 
        t.name.toLowerCase().includes(val.toLowerCase()) ||
        t.deity.toLowerCase().includes(val.toLowerCase()) ||
        t.state.toLowerCase().includes(val.toLowerCase()) ||
        t.city.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (temple) => {
    setQuery('');
    setShowSuggestions(false);
    onSelectTemple(temple);
  };

  // Unique stats
  const totalTemples = temples.length;
  const statesCount = new Set(temples.map(t => t.state)).size;
  const stylesCount = new Set(temples.map(t => t.architectureStyle.split(' ')[0])).size;

  return (
    <section className="hero">
      <div className="hero-content">
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          background: 'rgba(255, 111, 60, 0.2)',
          border: '1px solid rgba(255, 111, 60, 0.4)',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.8rem',
          fontWeight: 700,
          color: 'var(--saffron)',
          marginBottom: '16px',
          textTransform: 'uppercase',
          letterSpacing: '1.5px'
        }}>
          <Sparkles size={14} fill="var(--saffron)" />
          <span>Discover the Divine Heritage</span>
        </div>

        <h1>India Temple Heritage & Pilgrimage Portal</h1>
        <p>Explore centuries of architecture, rituals, and spiritual significance. Plan your sacred pilgrimages with authentic guidelines.</p>

        {/* Autocomplete Search */}
        <div className="search-container" ref={dropdownRef}>
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search by temple name, deity, state, or city..."
              className="search-bar"
              value={query}
              onChange={handleInputChange}
              onFocus={() => query.trim().length > 0 && setShowSuggestions(true)}
            />
          </div>

          {/* Autocomplete Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map((temple) => (
                <div
                  key={temple.id}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(temple)}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    flexShrink: 0
                  }}>
                    <img
                      src={temple.image}
                      alt={temple.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="suggestion-info">
                    <h4>{temple.name}</h4>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} /> {temple.city}, {temple.state} | <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{temple.deity}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showSuggestions && suggestions.length === 0 && (
            <div className="suggestions-dropdown" style={{ padding: '16px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              No temples found matching "{query}"
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-number">{totalTemples}</span>
            <span className="stat-label">Temples Documented</span>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)', height: '40px', alignSelf: 'center' }} className="desktop-only-block"></div>
          <div className="stat-item">
            <span className="stat-number">{statesCount}</span>
            <span className="stat-label">States Represented</span>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)', height: '40px', alignSelf: 'center' }} className="desktop-only-block"></div>
          <div className="stat-item">
            <span className="stat-number">{stylesCount}</span>
            <span className="stat-label">Architectural Styles</span>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)', height: '40px', alignSelf: 'center' }} className="desktop-only-block"></div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Verified Guidelines</span>
          </div>
        </div>
      </div>
    </section>
  );
}
