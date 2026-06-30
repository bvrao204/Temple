import React, { useState } from 'react';
import { Compass, Save, Trash2, ArrowRight, ArrowDown } from 'lucide-react';

const STANDARD_CIRCUITS = [
  {
    id: 'jyotirlinga',
    name: 'Jyotirlinga Heritage Loop',
    description: 'A holy route linking major monumental Shiva Jyotirlingas of Northern, Western, and Central India.',
    duration: '9 Days',
    stops: ['somnath', 'mahakaleshwar', 'kashi-vishwanath', 'kedarnath'],
    tips: 'Ensure registration on the Uttarakhand portal for Kedarnath trek, pre-book Bhasma Aarti at Mahakaleshwar, and book early morning slots for Kashi Vishwanath Aarti.'
  },
  {
    id: 'south-india',
    name: 'Dravidian Architectural Circuit',
    description: 'Explore the grand stone carvings, long corridors, and towering Gopurams of Tamil Nadu, Kerala, and Andhra Pradesh.',
    duration: '9 Days',
    stops: ['tirupati-balaji', 'meenakshi-amman', 'brihadeeswarar-temple', 'ramanathaswamy', 'padmanabhaswamy'],
    tips: 'Strict traditional dress code is applicable at all South Indian temples. Note that bare-chested Mundu dress code is mandatory at Padmanabhaswamy, and advance VIP tickets for Tirupati are recommended.'
  },
  {
    id: 'heritage-unesco',
    name: 'UNESCO World Heritage Route',
    description: 'Focuses on the artistic and structural masterpieces designated as protected world heritage monuments.',
    duration: '8 Days',
    stops: ['sun-temple-konark', 'brihadeeswarar-temple', 'kandariya-mahadeva', 'virupaksha', 'ramappa-temple', 'mahabodhi'],
    tips: 'Hire local licensed guides at Konark, Khajuraho, Hampi, and Ramappa to fully interpret the historical sandbox engineering, floating brick systems, and sacred carving geometry.'
  },
  {
    id: 'char-dham',
    name: 'National Char Dham Pilgrimage',
    description: 'The ultimate four-cardinal pilgrimage of India established by Adi Shankara, representing the four directions of the country.',
    duration: '14 Days',
    stops: ['badrinath', 'jagannath-puri', 'ramanathaswamy', 'dwarkadhish'],
    tips: 'Usually requires significant train/flight planning across India. Best taken in a seasonal sequence (Badrinath is closed in winter).'
  },
  {
    id: 'shakti-peetha',
    name: 'Holy Shakti Peetha Trail',
    description: 'A sacred route linking prominent shrines dedicated to the Goddess Adishakti across North, East, and South India.',
    duration: '8 Days',
    stops: ['vaishno-devi', 'kamakhya', 'dakshineswar-kali', 'meenakshi-amman'],
    tips: 'Requires climbing/trekking at Vaishno Devi (RFID card is mandatory) and planning around festival rushes like Ambubachi Mela at Kamakhya.'
  }
];

export default function CircuitPlanner({ temples, onSelectTemple }) {
  const [selectedCircuit, setSelectedCircuit] = useState(STANDARD_CIRCUITS[0]);
  const [checklistState, setChecklistState] = useState(() => {
    const savedChecklist = localStorage.getItem('temple_circuit_checklist');
    if (savedChecklist) {
      try {
        return JSON.parse(savedChecklist);
      } catch {
        // ignore
      }
    }
    return {};
  });
  const [customCircuit, setCustomCircuit] = useState([]);
  const [customName, setCustomName] = useState('My Custom Yatra');
  const [savedCustomCircuits, setSavedCustomCircuits] = useState(() => {
    const savedCustom = localStorage.getItem('temple_custom_circuits');
    if (savedCustom) {
      try {
        return JSON.parse(savedCustom);
      } catch {
        // ignore
      }
    }
    return [];
  });

  const toggleChecklistItem = (stopId, itemKey) => {
    const key = `${selectedCircuit.id}_${stopId}_${itemKey}`;
    const updated = {
      ...checklistState,
      [key]: !checklistState[key]
    };
    setChecklistState(updated);
    localStorage.setItem('temple_circuit_checklist', JSON.stringify(updated));
  };

  const addTempleToCustom = (templeId) => {
    if (customCircuit.includes(templeId)) return;
    setCustomCircuit([...customCircuit, templeId]);
  };

  const removeTempleFromCustom = (templeId) => {
    setCustomCircuit(customCircuit.filter(id => id !== templeId));
  };

  const saveCustomCircuit = () => {
    if (customCircuit.length === 0) return;
    const newCircuit = {
      id: `custom_${Date.now()}`,
      name: customName,
      description: 'Customized spiritual pilgrimage path.',
      duration: `${customCircuit.length * 2} Days`,
      stops: [...customCircuit],
      tips: 'Carry printouts of Aadhar/Identity card proofs and dress code compliant attire.',
      custom: true
    };
    const updatedList = [...savedCustomCircuits, newCircuit];
    setSavedCustomCircuits(updatedList);
    localStorage.setItem('temple_custom_circuits', JSON.stringify(updatedList));
    setCustomCircuit([]);
    setCustomName('My Custom Yatra');
    setSelectedCircuit(newCircuit);
  };

  const deleteCustomCircuit = (id) => {
    const updated = savedCustomCircuits.filter(c => c.id !== id);
    setSavedCustomCircuits(updated);
    localStorage.setItem('temple_custom_circuits', JSON.stringify(updated));
    if (selectedCircuit.id === id) {
      setSelectedCircuit(STANDARD_CIRCUITS[0]);
    }
  };

  // Helper to find temple detail by ID
  const getTempleDetail = (id) => {
    return temples.find(t => t.id === id);
  };

  return (
    <div className="container animate-fade-in-up" style={{ padding: '20px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          background: 'rgba(212, 163, 89, 0.12)',
          borderRadius: 'var(--radius-full)',
          color: 'var(--gold)',
          marginBottom: '10px'
        }}>
          <Compass size={18} />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-title)', letterSpacing: '1px' }}>Pilgrimage Route Planner</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Plan Your Sacred Yatra</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)' }}>
          Select standard cultural circuits or design a customizable journey. Track accommodation and travel bookings inside local logs.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2.5fr',
        gap: '30px',
        alignItems: 'start'
      }} className="circuit-layout">

        {/* Left column - Select Circuits */}
        <div className="circuit-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '12px', fontSize: '1.1rem' }}>Predefined Circuits</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {STANDARD_CIRCUITS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCircuit(c)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid ' + (selectedCircuit.id === c.id ? 'var(--saffron)' : 'var(--border-color)'),
                    background: selectedCircuit.id === c.id ? 'rgba(255, 111, 60, 0.08)' : 'transparent',
                    color: selectedCircuit.id === c.id ? 'var(--saffron)' : 'var(--text-primary)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {c.name} ({c.duration})
                </button>
              ))}
            </div>

            {savedCustomCircuits.length > 0 && (
              <>
                <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', margin: '20px 0 12px 0', fontSize: '1.1rem' }}>Your Saved Yatras</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {savedCustomCircuits.map((c) => (
                    <div key={c.id} style={{ display: 'flex', gap: '4px' }}>
                      <button
                        onClick={() => setSelectedCircuit(c)}
                        style={{
                          flexGrow: 1,
                          padding: '10px 14px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid ' + (selectedCircuit.id === c.id ? 'var(--gold)' : 'var(--border-color)'),
                          background: selectedCircuit.id === c.id ? 'rgba(212, 163, 89, 0.08)' : 'transparent',
                          color: selectedCircuit.id === c.id ? 'var(--gold)' : 'var(--text-primary)',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '0.9rem'
                        }}
                      >
                        {c.name}
                      </button>
                      <button
                        onClick={() => deleteCustomCircuit(c.id)}
                        style={{ background: 'rgba(211, 47, 47, 0.1)', border: 'none', color: 'var(--danger)', padding: '10px', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Builder Box */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '12px', fontSize: '1.1rem' }}>Yatra Builder</h3>

            <div className="form-group">
              <label>Circuit Name</label>
              <input
                type="text"
                className="form-control"
                style={{ padding: '8px 10px', fontSize: '0.9rem' }}
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Add Temples</label>
              <select
                className="form-control"
                style={{ padding: '8px 10px', fontSize: '0.9rem' }}
                onChange={(e) => {
                  if (e.target.value) {
                    addTempleToCustom(e.target.value);
                    e.target.value = '';
                  }
                }}
              >
                <option value="">-- Choose Temple --</option>
                {temples.map(t => (
                  <option key={t.id} value={t.id} disabled={customCircuit.includes(t.id)}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {customCircuit.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Itinerary Stops:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {customCircuit.map((id, index) => {
                    const t = getTempleDetail(id);
                    if (!t) return null;
                    return (
                      <div key={id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', padding: '6px 10px', borderRadius: '4px', fontSize: '0.85rem' }}>
                        <span>{index + 1}. {t.name}</span>
                        <button
                          onClick={() => removeTempleFromCustom(id)}
                          style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              onClick={saveCustomCircuit}
              disabled={customCircuit.length === 0}
              className="btn btn-primary btn-small"
              style={{ width: '100%' }}
            >
              <Save size={14} /> Save Custom Yatra
            </button>
          </div>
        </div>

        {/* Right column - Circuit Details */}
        <div className="circuit-main" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--saffron)', marginBottom: '6px' }}>{selectedCircuit.name}</h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>{selectedCircuit.description}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Recommended Duration</span>
                <p style={{ margin: 0, fontWeight: 700, fontSize: '1.1rem' }}>{selectedCircuit.duration}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total stops</span>
                <p style={{ margin: 0, fontWeight: 700, fontSize: '1.1rem' }}>{selectedCircuit.stops.length} Temples</p>
              </div>
            </div>

            {/* SVG Visual Flow Routing */}
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Pilgrimage Node Routing</h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: '16px',
              padding: '20px',
              background: 'var(--bg-primary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              marginBottom: '24px'
            }} className="svg-flow-container">
              {selectedCircuit.stops.map((stopId, index) => {
                const t = getTempleDetail(stopId);
                if (!t) return null;
                return (
                  <React.Fragment key={stopId}>
                    <div
                      onClick={() => onSelectTemple(t)}
                      style={{
                        padding: '12px 18px',
                        background: 'var(--bg-card)',
                        border: '2px solid var(--gold)',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'transform 0.2s',
                        maxWidth: '200px'
                      }}
                      className="flow-node"
                    >
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem' }}>{t.name}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.city}, {t.state}</span>
                      {t.mapCoords && (
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '8px' }} onClick={e => e.stopPropagation()}>
                          <a
                            href={`https://www.google.com/maps/search/${encodeURIComponent(t.name)}/@${t.mapCoords.lat},${t.mapCoords.lng},17z`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Google Maps"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '3px',
                              padding: '3px 8px', borderRadius: '3px', textDecoration: 'none',
                              background: '#1a73e8', color: '#fff', fontSize: '0.7rem', fontWeight: 700
                            }}
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Maps
                          </a>
                          <a
                            href={`https://earth.google.com/web/search/${encodeURIComponent(t.name)}/@${t.mapCoords.lat},${t.mapCoords.lng},500a,800d,35y,0h,45t,0r`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Google Earth"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '3px',
                              padding: '3px 8px', borderRadius: '3px', textDecoration: 'none',
                              background: '#2e7d32', color: '#fff', fontSize: '0.7rem', fontWeight: 700
                            }}
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> Earth
                          </a>
                        </div>
                      )}
                    </div>

                    {index < selectedCircuit.stops.length - 1 && (
                      <div className="flow-arrow" style={{ display: 'flex', alignItems: 'center', color: 'var(--gold)' }}>
                        <ArrowRight size={24} className="desktop-arrow" />
                        <ArrowDown size={24} className="mobile-arrow" style={{ display: 'none' }} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Guided stops checklist */}
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Yatra Checklist logs</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {selectedCircuit.stops.map((stopId) => {
                const t = getTempleDetail(stopId);
                if (!t) return null;
                return (
                  <div key={stopId} style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                      <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>{t.name} ({t.city})</h4>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => onSelectTemple(t)}
                          style={{ background: 'none', border: 'none', color: 'var(--saffron)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
                        >
                          View guidelines
                        </button>
                        {t.mapCoords && (
                          <a
                            href={`https://www.google.com/maps/search/${encodeURIComponent(t.name)}/@${t.mapCoords.lat},${t.mapCoords.lng},17z`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View on Google Maps"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '4px',
                              padding: '4px 10px', borderRadius: '4px', textDecoration: 'none',
                              background: 'linear-gradient(135deg, #1a73e8, #0d47a1)',
                              color: '#fff', fontWeight: 600, fontSize: '0.78rem'
                            }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            Maps
                          </a>
                        )}
                        {t.mapCoords && (
                          <a
                            href={`https://earth.google.com/web/search/${encodeURIComponent(t.name)}/@${t.mapCoords.lat},${t.mapCoords.lng},500a,800d,35y,0h,45t,0r`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View on Google Earth"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '4px',
                              padding: '4px 10px', borderRadius: '4px', textDecoration: 'none',
                              background: 'linear-gradient(135deg, #2e7d32, #1b5e20)',
                              color: '#fff', fontWeight: 600, fontSize: '0.78rem'
                            }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                            Earth 3D
                          </a>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={!!checklistState[`${selectedCircuit.id}_${stopId}_transport`]}
                          onChange={() => toggleChecklistItem(stopId, 'transport')}
                          style={{ accentColor: 'var(--saffron)' }}
                        />
                        <span>Transport Booked</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={!!checklistState[`${selectedCircuit.id}_${stopId}_lodge`]}
                          onChange={() => toggleChecklistItem(stopId, 'lodge')}
                          style={{ accentColor: 'var(--saffron)' }}
                        />
                        <span>Lodging Reserved</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={!!checklistState[`${selectedCircuit.id}_${stopId}_darshan`]}
                          onChange={() => toggleChecklistItem(stopId, 'darshan')}
                          style={{ accentColor: 'var(--saffron)' }}
                        />
                        <span>Darshan Slot Booked</span>
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedCircuit.tips && (
              <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(212, 163, 89, 0.08)', borderLeft: '4px solid var(--gold)', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
                <h4 style={{ margin: '0 0 6px 0', color: 'var(--gold)' }}>Important Circuit Tips:</h4>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{selectedCircuit.tips}</p>
              </div>
            )}
          </div>
        </div>

      </div>

      <style>{`
        .flow-node:hover {
          transform: translateY(-2px);
          border-color: var(--saffron) !important;
          box-shadow: var(--shadow-md) !important;
        }
        @media (max-width: 900px) {
          .circuit-layout {
            grid-template-columns: 1fr !important;
          }
          .svg-flow-container {
            flex-direction: column !important;
          }
          .desktop-arrow {
            display: none !important;
          }
          .mobile-arrow {
            display: block !important;
            margin: 8px 0;
          }
        }
      `}</style>
    </div>
  );
}
