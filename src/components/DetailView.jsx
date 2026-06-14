import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Calendar, ShieldCheck, MapPin, Star, AlertTriangle, Compass, Heart, MessageSquare, Globe } from 'lucide-react';

const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const basePath = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${basePath}${cleanPath}`;
};

export default function DetailView({ temple, onBack }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ name: '', text: '', rating: 5, date: '' });
  const [liked, setLiked] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);

  // Load and save visitor notes from LocalStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(`temple_notes_${temple.id}`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      setNotes([
        { name: 'Rohan Sharma', text: 'Beautiful and highly spiritual. Make sure to visit early in the morning around 5 AM to witness the morning Aarti without heavy queues.', rating: 5, date: '2026-05-12' },
        { name: 'Ananya Rao', text: 'Very well maintained temple corridor. Follow the dress code strictly as the temple authorities check at the main tower gate.', rating: 4, date: '2026-06-02' }
      ]);
    }

    // Load liked status
    const isLiked = localStorage.getItem(`temple_liked_${temple.id}`) === 'true';
    setLiked(isLiked);
  }, [temple.id]);

  const saveNotes = (updatedNotes) => {
    setNotes(updatedNotes);
    localStorage.setItem(`temple_notes_${temple.id}`, JSON.stringify(updatedNotes));
  };

  const handleLikeToggle = () => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    localStorage.setItem(`temple_liked_${temple.id}`, String(nextLiked));
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.name.trim() || !newNote.text.trim()) return;

    const today = new Date().toISOString().split('T')[0];
    const updated = [
      {
        name: newNote.name,
        text: newNote.text,
        rating: Number(newNote.rating),
        date: today
      },
      ...notes
    ];
    saveNotes(updated);
    setNewNote({ name: '', text: '', rating: 5, date: '' });
  };

  const tabs = [
    { id: 'overview', label: 'History & Overview' },
    { id: 'timings', label: 'Rituals & Timings' },
    { id: 'guidelines', label: 'Visitor Guidelines' },
    { id: 'facilities', label: 'Travel & Facilities' },
    { id: 'notes', label: 'Visitor Notes' }
  ];

  const detailStyles = {
    header: {
      position: 'relative',
      height: '350px',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      marginBottom: '30px',
      boxShadow: 'var(--shadow-lg)'
    },
    headerImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    headerOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.4) 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px'
    },
    backBtn: {
      alignSelf: 'flex-start',
      background: 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      color: '#fff',
      padding: '8px 16px',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontWeight: 600,
      fontSize: '0.9rem',
      transition: 'all var(--transition-fast)'
    },
    headerText: {
      color: '#fff'
    },
    title: {
      fontSize: '2.5rem',
      color: '#fff',
      margin: '0 0 10px 0',
      textShadow: '0 2px 4px rgba(0,0,0,0.4)'
    },
    metaRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      flexWrap: 'wrap',
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '0.95rem'
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '30px',
      alignItems: 'start'
    },
    card: {
      padding: '24px',
      marginBottom: '24px'
    },
    infoRow: {
      display: 'flex',
      gap: '12px',
      marginBottom: '16px'
    },
    infoLabel: {
      fontWeight: 700,
      color: 'var(--text-secondary)'
    },
    timelineItem: {
      position: 'relative',
      paddingLeft: '24px',
      borderLeft: '2px solid var(--gold)',
      paddingBottom: '20px'
    },
    timelineDot: {
      position: 'absolute',
      left: '-6px',
      top: '6px',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: 'var(--saffron)'
    }
  };

  return (
    <div className="animate-fade-in-up">
      {/* Header Image section */}
      <div style={detailStyles.header}>
        <img src={getImageUrl(temple.image)} alt={temple.name} style={detailStyles.headerImg} />
        <div style={detailStyles.headerOverlay}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <button
              onClick={onBack}
              style={detailStyles.backBtn}
              className="back-btn-hover"
            >
              <ArrowLeft size={16} /> Back to Explore
            </button>

            <div style={{ display: 'flex', gap: '10px' }}>
              {temple.website && (
                <a
                  href={temple.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    ...detailStyles.backBtn,
                    background: 'rgba(245, 158, 11, 0.85)',
                    borderColor: 'var(--gold)',
                    textDecoration: 'none'
                  }}
                  className="back-btn-hover"
                >
                  <Globe size={16} /> Official Website
                </a>
              )}

              <button
                onClick={handleLikeToggle}
                style={{
                  ...detailStyles.backBtn,
                  background: liked ? 'rgba(255, 111, 60, 0.85)' : 'rgba(255, 255, 255, 0.25)',
                  borderColor: liked ? 'var(--saffron)' : 'rgba(255, 255, 255, 0.4)'
                }}
                className="back-btn-hover"
              >
                <Heart size={16} fill={liked ? '#fff' : 'none'} />
                {liked ? 'Added to Saved' : 'Save Temple'}
              </button>
            </div>
          </div>

          <div style={detailStyles.headerText}>
            <h1 style={detailStyles.title}>{temple.name}</h1>
            <div style={detailStyles.metaRow}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={16} color="var(--saffron)" />
                {temple.city}, {temple.state} ({temple.region} India)
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Compass size={16} color="var(--gold)" />
                {temple.architectureStyle.split(' (')[0]}
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,0,0,0.4)', padding: '2px 8px', borderRadius: '4px' }}>
                <Star size={14} fill="var(--gold)" stroke="var(--gold)" />
                {temple.rating.toFixed(1)} / 5.0
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="tabs-header">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.id === 'notes' && <MessageSquare size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main layout */}
      <div style={detailStyles.mainContent} className="detail-view-layout">
        <div className="detail-main-left">
          {/* Tab 1: Overview & History */}
          {activeTab === 'overview' && (
            <div className="glass-panel" style={detailStyles.card}>
              <h2 style={{ marginBottom: '16px', fontFamily: 'var(--font-title)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Historical Significance</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '1.05rem', lineHeight: '1.8' }}>
                {temple.history}
              </p>

              <h3 style={{ marginBottom: '12px', fontSize: '1.2rem' }}>Architectural Legacy</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                The temple stands as a primary monument of the <strong>{temple.architectureStyle}</strong>. Its structural style showcases detailed calculations, rock cutting, and placement layout patterns typical of the <strong>{temple.heritageStatus}</strong> era of heritage construction.
              </p>

              <h3 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>Deity and Worship</h3>
              <div style={{ display: 'flex', gap: '16px', background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--saffron)', marginBottom: '24px' }}>
                <div>
                  <h4 style={{ color: 'var(--saffron)', fontSize: '1.1rem', marginBottom: '4px' }}>Principal Deity: {temple.deity}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                    Highly revered by millions of devotees, the sanctum holds deep religious rituals and cultural worship routines designed around the deity's significance in Vedic philosophy.
                  </p>
                </div>
              </div>

              {/* Image Gallery */}
              {temple.gallery && temple.gallery.length > 0 && (
                <div style={{ marginTop: '30px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                  <h3 style={{ marginBottom: '16px', fontSize: '1.25rem', fontFamily: 'var(--font-title)' }}>Photo Gallery</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                    {temple.gallery.map((imgUrl, index) => (
                      <div
                        key={index}
                        className="gallery-img-container"
                        style={{
                          borderRadius: 'var(--radius-md)',
                          overflow: 'hidden',
                          height: '140px',
                          cursor: 'pointer',
                          position: 'relative',
                          border: '1px solid var(--border-color)',
                          boxShadow: 'var(--shadow-sm)',
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => setSelectedGalleryImage(imgUrl)}
                      >
                        <img
                          src={getImageUrl(imgUrl)}
                          alt={`${temple.name} Gallery View ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease'
                          }}
                          className="gallery-thumbnail"
                        />
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0,0,0,0.4)',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontSize: '0.9rem',
                            fontWeight: 600
                          }}
                          className="gallery-overlay"
                        >
                          View Large
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Rituals & Timings */}
          {activeTab === 'timings' && (
            <div className="glass-panel" style={detailStyles.card}>
              <h2 style={{ marginBottom: '16px', fontFamily: 'var(--font-title)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Darshan Timings</h2>
              
              <div className="grid-2" style={{ marginBottom: '24px' }}>
                <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Clock size={36} color="var(--saffron)" />
                  <div>
                    <h4 style={{ margin: 0 }}>Morning Slots</h4>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{temple.darshanTimings.morning}</span>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Clock size={36} color="var(--gold)" />
                  <div>
                    <h4 style={{ margin: 0 }}>Evening Slots</h4>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                      {temple.darshanTimings.evening || 'Closed for general worship'}
                    </span>
                  </div>
                </div>
              </div>

              {temple.darshanTimings.aarti && temple.darshanTimings.aarti.length > 0 && (
                <>
                  <h3 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>Pooja & Aarti Calendar</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                    {temple.darshanTimings.aarti.map((a, index) => (
                      <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                        <span style={{ fontWeight: 600 }}>{a.name}</span>
                        <span style={{ color: 'var(--saffron)', fontWeight: 700 }}>{a.time}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <h3 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>Important Daily Rituals</h3>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)' }}>
                {temple.rituals.map((ritual, idx) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>{ritual}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tab 3: Visitor Guidelines */}
          {activeTab === 'guidelines' && (
            <div className="glass-panel" style={detailStyles.card}>
              <h2 style={{ marginBottom: '16px', fontFamily: 'var(--font-title)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Visitor Rules & Dress Code</h2>

              <div style={{ background: 'rgba(255, 111, 60, 0.08)', border: '1px solid var(--saffron)', borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <ShieldCheck size={24} color="var(--saffron)" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ color: 'var(--saffron)', margin: '0 0 4px 0' }}>Dress Code Policy</h4>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{temple.guidelines.dressCode}</p>
                </div>
              </div>

              <h3 style={{ marginBottom: '12px', fontSize: '1.2rem' }}>Guidelines & Code of Conduct</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {temple.guidelines.rules.map((rule, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', marginTop: '8px', flexShrink: 0 }}></span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{rule}</span>
                  </div>
                ))}
              </div>

              <h3 style={{ marginBottom: '12px', fontSize: '1.2rem', color: 'var(--danger)' }}>Restrictions & Travel Precautions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {temple.guidelines.restrictions.map((restriction, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: 'rgba(211, 47, 47, 0.05)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
                    <AlertTriangle size={16} color="var(--danger)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>{restriction}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Travel & Facilities */}
          {activeTab === 'facilities' && (
            <div className="glass-panel" style={detailStyles.card}>
              <h2 style={{ marginBottom: '16px', fontFamily: 'var(--font-title)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Pilgrimage Facilities</h2>

              <h3 style={{ marginBottom: '12px', fontSize: '1.2rem' }}>How to Reach</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {temple.facilities.transport.map((trans, idx) => (
                  <div key={idx} style={{ padding: '12px 16px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                    {trans}
                  </div>
                ))}
              </div>

              <h3 style={{ marginBottom: '12px', fontSize: '1.2rem' }}>Accommodation & Utilities</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>
                {temple.facilities.details}
              </p>
            </div>
          )}

          {/* Tab 5: Visitor Notes & Review module */}
          {activeTab === 'notes' && (
            <div className="glass-panel" style={detailStyles.card}>
              <h2 style={{ marginBottom: '16px', fontFamily: 'var(--font-title)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Visitor Notes & Feedback</h2>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} style={{ marginBottom: '30px', background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>Add your Pilgrimage Note</h3>
                
                <div className="grid-2" style={{ marginBottom: '12px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Your Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Rahul Verma"
                      required
                      value={newNote.name}
                      onChange={(e) => setNewNote({ ...newNote, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Rating (1 to 5 Stars)</label>
                    <select
                      className="form-control"
                      value={newNote.rating}
                      onChange={(e) => setNewNote({ ...newNote, rating: Number(e.target.value) })}
                    >
                      <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                      <option value="4">⭐⭐⭐⭐ (4/5)</option>
                      <option value="3">⭐⭐⭐ (3/5)</option>
                      <option value="2">⭐⭐ (2/5)</option>
                      <option value="1">⭐ (1/5)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Review / Experience Notes</label>
                  <textarea
                    className="form-control"
                    placeholder="Share tips about timing, lines, dress code compliance, or special pooja experiences..."
                    required
                    value={newNote.text}
                    onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Submit Note</button>
              </form>

              {/* Notes List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {notes.map((n, index) => (
                  <div key={index} style={{ padding: '16px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 700 }}>{n.name}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{n.date}</span>
                    </div>
                    <div style={{ color: 'var(--gold)', marginBottom: '8px', fontSize: '0.85rem' }}>
                      {Array.from({ length: n.rating }).map((_, i) => '★').join('')}
                      {Array.from({ length: 5 - n.rating }).map((_, i) => '☆').join('')}
                    </div>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{n.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info Card */}
        <div className="detail-sidebar">
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '14px' }}>Quick Info</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Main Deity</span>
                <p style={{ margin: 0, fontWeight: 700 }}>{temple.deity}</p>
              </div>

              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>State / Region</span>
                <p style={{ margin: 0, fontWeight: 700 }}>{temple.state} ({temple.region})</p>
              </div>

              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Architecture Era</span>
                <p style={{ margin: 0, fontWeight: 700 }}>{temple.heritageStatus}</p>
              </div>

              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Style Classification</span>
                <p style={{ margin: 0, fontWeight: 700 }}>{temple.architectureStyle}</p>
              </div>

              {temple.facilities.accommodation && (
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '6px', color: 'var(--success)' }}>
                  <ShieldCheck size={16} />
                  <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Visitor Lodging Available</span>
                </div>
              )}
            </div>

            {temple.website && (
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                <a
                  href={temple.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary animate-pulse-ring"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    textDecoration: 'none',
                    padding: '10px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}
                >
                  <Globe size={16} /> Visit Official Website
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedGalleryImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            backdropFilter: 'blur(5px)',
            animation: 'fade-in 0.25s ease'
          }}
          onClick={() => setSelectedGalleryImage(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '90%',
              maxHeight: '90%',
              background: '#000',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getImageUrl(selectedGalleryImage)}
              alt="Temple Gallery Zoomed View"
              style={{
                display: 'block',
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain'
              }}
            />
            <button
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'rgba(0,0,0,0.6)',
                color: '#fff',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                transition: 'background-color 0.2s'
              }}
              onClick={() => setSelectedGalleryImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style>{`
        .back-btn-hover:hover {
          background: rgba(255, 255, 255, 0.4) !important;
          transform: translateY(-1px);
        }
        .gallery-img-container:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .gallery-img-container:hover .gallery-thumbnail {
          transform: scale(1.12);
        }
        .gallery-img-container:hover .gallery-overlay {
          opacity: 1 !important;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 768px) {
          .detail-view-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
