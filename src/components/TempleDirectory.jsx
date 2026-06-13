import React, { useState } from 'react';
import TempleCard from './TempleCard';
import { Filter, SlidersHorizontal, RefreshCcw, BookOpen } from 'lucide-react';

export default function TempleDirectory({ temples, onSelectTemple }) {
  const [filterState, setFilterState] = useState('');
  const [filterDeity, setFilterDeity] = useState('');
  const [filterStyle, setFilterStyle] = useState('');
  const [filterHeritage, setFilterHeritage] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Collect unique filter options from database
  const states = Array.from(new Set(temples.map(t => t.state))).sort();
  const deities = Array.from(new Set(temples.map(t => t.deity))).sort();
  const styles = Array.from(new Set(temples.map(t => t.architectureStyle.split(' (')[0]))).sort();
  const heritages = Array.from(new Set(temples.map(t => t.heritageStatus.split(' (')[0]))).sort();

  // Reset all filters
  const resetFilters = () => {
    setFilterState('');
    setFilterDeity('');
    setFilterStyle('');
    setFilterHeritage('');
    setSortBy('name');
  };

  // Filter and Sort Logic
  const filteredTemples = temples
    .filter(t => {
      const matchState = !filterState || t.state === filterState;
      const matchDeity = !filterDeity || t.deity === filterDeity;
      const matchStyle = !filterStyle || t.architectureStyle.includes(filterStyle);
      const matchHeritage = !filterHeritage || t.heritageStatus.includes(filterHeritage);
      return matchState && matchDeity && matchStyle && matchHeritage;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });

  return (
    <div className="container animate-fade-in-up" style={{ padding: '20px 0' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          background: 'rgba(255, 111, 60, 0.12)',
          borderRadius: 'var(--radius-full)',
          color: 'var(--saffron)',
          marginBottom: '10px'
        }}>
          <Filter size={16} />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-title)', letterSpacing: '1.5px' }}>Temple Directory</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Explore Sacred Shrines</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)' }}>
          Browse historic temples across Indian states, select deities, or filter by architectural heritage style guidelines.
        </p>
      </div>

      {/* Filter Options Bar */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
          <SlidersHorizontal size={18} color="var(--gold)" />
          <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Filter Catalog</h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '16px',
          alignItems: 'end'
        }} className="directory-filters">
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label style={{ fontSize: '0.85rem' }}>State</label>
            <select
              className="form-control"
              style={{ padding: '8px 10px', fontSize: '0.9rem' }}
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
            >
              <option value="">All States</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label style={{ fontSize: '0.85rem' }}>Deity</label>
            <select
              className="form-control"
              style={{ padding: '8px 10px', fontSize: '0.9rem' }}
              value={filterDeity}
              onChange={(e) => setFilterDeity(e.target.value)}
            >
              <option value="">All Deities</option>
              {deities.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label style={{ fontSize: '0.85rem' }}>Architecture Style</label>
            <select
              className="form-control"
              style={{ padding: '8px 10px', fontSize: '0.9rem' }}
              value={filterStyle}
              onChange={(e) => setFilterStyle(e.target.value)}
            >
              <option value="">All Styles</option>
              {styles.map(st => <option key={st} value={st}>{st}</option>)}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label style={{ fontSize: '0.85rem' }}>Era Status</label>
            <select
              className="form-control"
              style={{ padding: '8px 10px', fontSize: '0.9rem' }}
              value={filterHeritage}
              onChange={(e) => setFilterHeritage(e.target.value)}
            >
              <option value="">All Eras</option>
              {heritages.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px' }} className="filter-buttons-wrapper">
            <div className="form-group" style={{ marginBottom: 0, flexGrow: 1 }}>
              <label style={{ fontSize: '0.85rem' }}>Sort By</label>
              <select
                className="form-control"
                style={{ padding: '8px 10px', fontSize: '0.9rem' }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Alphabetical</option>
                <option value="rating">User Ratings</option>
              </select>
            </div>

            <button
              onClick={resetFilters}
              className="btn btn-secondary"
              style={{ height: '38px', padding: '0 12px', flexShrink: 0 }}
              title="Reset All Filters"
            >
              <RefreshCcw size={16} />
            </button>
          </div>

        </div>
      </div>

      {/* Temple Catalog Grid */}
      {filteredTemples.length > 0 ? (
        <div className="grid-3">
          {filteredTemples.map((temple) => (
            <TempleCard
              key={temple.id}
              temple={temple}
              onClick={onSelectTemple}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <BookOpen size={40} style={{ color: 'var(--gold)', marginBottom: '16px' }} />
          <h3>No Temples Found</h3>
          <p style={{ margin: '8px 0 20px 0' }}>No active temple listings match your filter selections. Try resetting filters.</p>
          <button className="btn btn-primary" onClick={resetFilters}>Reset Filters</button>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .directory-filters {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .filter-buttons-wrapper {
            margin-top: 8px;
          }
        }
      `}</style>
    </div>
  );
}
