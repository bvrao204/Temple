import React, { useState } from 'react';
import { Lock, BarChart3, PlusCircle, CheckCircle, Trash2, Edit2, AlertCircle, TrendingUp, Users } from 'lucide-react';

export default function AdminPanel({ temples, onAddTemple, onUpdateTemple, onDeleteTemple, approvalQueue, onApproveSubmission, onRejectSubmission }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  
  const [adminTab, setAdminTab] = useState('analytics');

  // Form State for CRUD
  const [editingTempleId, setEditingTempleId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', deity: '', state: '', city: '', region: 'North',
    history: '', architectureStyle: 'Nagara Style', heritageStatus: 'Ancient',
    rating: 4.5, image: '', morningTiming: '06:00 - 12:00', eveningTiming: '16:00 - 21:00',
    dressCode: 'Modest traditional clothing.', rulesList: '', facilitiesDetails: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'password123') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid administrator credentials. Try: password123');
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.deity || !formData.state || !formData.city) {
      alert('Please fill out name, deity, state, and city.');
      return;
    }

    const rules = formData.rulesList.split('\n').filter(r => r.trim() !== '');
    const transport = ['Local transport connections available.'];

    const templePayload = {
      name: formData.name,
      deity: formData.deity,
      state: formData.state,
      city: formData.city,
      region: formData.region,
      history: formData.history || 'No history provided.',
      architectureStyle: formData.architectureStyle,
      heritageStatus: formData.heritageStatus,
      rating: Number(formData.rating),
      image: formData.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      featured: false,
      approved: true,
      darshanTimings: {
        morning: formData.morningTiming,
        evening: formData.eveningTiming,
        aarti: [{ name: 'Morning Aarti', time: formData.morningTiming.split(' - ')[0] }]
      },
      rituals: ['Daily morning worship', 'Sandhya Aarti ritual'],
      guidelines: {
        dressCode: formData.dressCode,
        rules: rules.length > 0 ? rules : ['Maintain quietness inside temple', 'Footwear outside'],
        restrictions: ['Electronic devices check at counter']
      },
      facilities: {
        accommodation: true,
        transport: transport,
        details: formData.facilitiesDetails || 'Dharamshalas and lodges are available in the proximity.'
      }
    };

    if (editingTempleId) {
      onUpdateTemple(editingTempleId, templePayload);
      setSuccessMessage('Temple record updated successfully!');
      setEditingTempleId(null);
    } else {
      onAddTemple({
        ...templePayload,
        id: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      });
      setSuccessMessage('New temple added successfully!');
    }

    // Reset Form
    setFormData({
      name: '', deity: '', state: '', city: '', region: 'North',
      history: '', architectureStyle: 'Nagara Style', heritageStatus: 'Ancient',
      rating: 4.5, image: '', morningTiming: '06:00 - 12:00', eveningTiming: '16:00 - 21:00',
      dressCode: 'Modest traditional clothing.', rulesList: '', facilitiesDetails: ''
    });

    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleEditClick = (temple) => {
    setEditingTempleId(temple.id);
    setAdminTab('add-edit');
    setFormData({
      name: temple.name,
      deity: temple.deity,
      state: temple.state,
      city: temple.city,
      region: temple.region || 'North',
      history: temple.history,
      architectureStyle: temple.architectureStyle,
      heritageStatus: temple.heritageStatus,
      rating: temple.rating,
      image: temple.image,
      morningTiming: temple.darshanTimings?.morning || '06:00 - 12:00',
      eveningTiming: temple.darshanTimings?.evening || '16:00 - 21:00',
      dressCode: temple.guidelines?.dressCode || 'Modest clothing.',
      rulesList: temple.guidelines?.rules?.join('\n') || '',
      facilitiesDetails: temple.facilities?.details || ''
    });
  };

  // Compute analytics
  const totalCount = temples.length;
  const regions = temples.reduce((acc, t) => {
    acc[t.region] = (acc[t.region] || 0) + 1;
    return acc;
  }, {});

  const avgRating = (temples.reduce((acc, t) => acc + t.rating, 0) / totalCount).toFixed(2);

  // Authentication Gate Screen
  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '80px 0' }} className="animate-fade-in-up">
        <div className="glass-panel" style={{ padding: '36px', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--gold-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto'
          }}>
            <Lock size={28} color="var(--gold)" />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Security Gate</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
            Access restricted to verified admins of Incredible India Heritage Portal.
          </p>

          <form onSubmit={handleLogin}>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {authError && (
              <div style={{ color: 'var(--danger)', fontSize: '0.85rem', marginBottom: '16px', display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'center' }}>
                <AlertCircle size={14} />
                <span>{authError}</span>
              </div>
            )}
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Authenticate</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in-up" style={{ padding: '20px 0' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>Administrator Control Room</h1>
          <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0', fontSize: '0.9rem' }}>
            Manage database catalog, review analytics, and moderate user submissions.
          </p>
        </div>
        <button className="btn btn-secondary btn-small" onClick={() => setIsAuthenticated(false)}>Lock Console</button>
      </div>

      {/* Navigation Inside Admin */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button
          onClick={() => setAdminTab('analytics')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid ' + (adminTab === 'analytics' ? 'var(--gold)' : 'var(--border-color)'),
            background: adminTab === 'analytics' ? 'rgba(212, 163, 89, 0.08)' : 'transparent',
            color: adminTab === 'analytics' ? 'var(--gold)' : 'var(--text-secondary)',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <BarChart3 size={16} /> Analytics
        </button>

        <button
          onClick={() => setAdminTab('add-edit')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid ' + (adminTab === 'add-edit' ? 'var(--gold)' : 'var(--border-color)'),
            background: adminTab === 'add-edit' ? 'rgba(212, 163, 89, 0.08)' : 'transparent',
            color: adminTab === 'add-edit' ? 'var(--gold)' : 'var(--text-secondary)',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <PlusCircle size={16} /> Add / Manage Temples
        </button>

        <button
          onClick={() => setAdminTab('queue')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid ' + (adminTab === 'queue' ? 'var(--gold)' : 'var(--border-color)'),
            background: adminTab === 'queue' ? 'rgba(212, 163, 89, 0.08)' : 'transparent',
            color: adminTab === 'queue' ? 'var(--gold)' : 'var(--text-secondary)',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <CheckCircle size={16} /> Approvals Queue ({approvalQueue.length})
        </button>
      </div>

      {successMessage && (
        <div style={{ background: 'rgba(46, 125, 50, 0.12)', border: '1px solid var(--success)', color: 'var(--success)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '20px', fontWeight: 600 }}>
          {successMessage}
        </div>
      )}

      {/* Tab Content: Analytics */}
      {adminTab === 'analytics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Top Row Cards */}
          <div className="grid-3">
            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Temples Cataloged</span>
                <TrendingUp size={20} />
              </div>
              <h2 style={{ fontSize: '2.2rem', margin: '8px 0 4px 0' }}>{totalCount}</h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--success)' }}>+12% vs last month</span>
            </div>

            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Average rating</span>
                <Users size={20} />
              </div>
              <h2 style={{ fontSize: '2.2rem', margin: '8px 0 4px 0' }}>{avgRating}</h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--gold)' }}>Based on user logs</span>
            </div>

            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Draft Submissions</span>
                <CheckCircle size={20} />
              </div>
              <h2 style={{ fontSize: '2.2rem', margin: '8px 0 4px 0' }}>{approvalQueue.length}</h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--warning)' }}>Requires admin moderation</span>
            </div>
          </div>

          {/* Regional graph (Vanilla CSS Chart) */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ marginBottom: '16px' }}>Regional Temple Distribution</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {['North', 'South', 'East', 'West', 'Central'].map((regionName) => {
                const count = regions[regionName] || 0;
                const percentage = totalCount > 0 ? (count / totalCount) * 100 : 0;
                
                return (
                  <div key={regionName} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 40px', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontWeight: 600 }}>{regionName}</span>
                    <div style={{ background: 'var(--bg-secondary)', height: '24px', borderRadius: '4px', overflow: 'hidden' }}>
                      <div className="analytics-chart-bar" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <span style={{ textAlign: 'right', fontWeight: 700 }}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: CRUD Operations */}
      {adminTab === 'add-edit' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', alignItems: 'start' }} className="admin-crud-layout">
          
          {/* Form */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '20px' }}>
              {editingTempleId ? 'Edit Temple Details' : 'Add New Heritage Temple'}
            </h3>

            <form onSubmit={handleFormSubmit}>
              <div className="grid-2">
                <div className="form-group">
                  <label>Temple Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="e.g. Kedarnath Temple"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Principal Deity</label>
                  <input
                    type="text"
                    name="deity"
                    className="form-control"
                    placeholder="e.g. Shiva"
                    value={formData.deity}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>

              <div className="grid-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    placeholder="e.g. Uttarakhand"
                    value={formData.state}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    placeholder="e.g. Kedarnath"
                    value={formData.city}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Region Zone</label>
                  <select
                    name="region"
                    className="form-control"
                    value={formData.region}
                    onChange={handleFormChange}
                  >
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                    <option value="Central">Central</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Historical Significance</label>
                <textarea
                  name="history"
                  className="form-control"
                  placeholder="Describe historical context, builders, and cultural impact..."
                  value={formData.history}
                  onChange={handleFormChange}
                ></textarea>
              </div>

              <div className="grid-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="form-group">
                  <label>Architecture Style</label>
                  <input
                    type="text"
                    name="architectureStyle"
                    className="form-control"
                    value={formData.architectureStyle}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="form-group">
                  <label>Heritage Era</label>
                  <input
                    type="text"
                    name="heritageStatus"
                    className="form-control"
                    value={formData.heritageStatus}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="text"
                    name="image"
                    className="form-control"
                    placeholder="Direct unsplash photo URL"
                    value={formData.image}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Morning Hours</label>
                  <input
                    type="text"
                    name="morningTiming"
                    className="form-control"
                    placeholder="e.g. 06:00 - 12:00"
                    value={formData.morningTiming}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="form-group">
                  <label>Evening Hours</label>
                  <input
                    type="text"
                    name="eveningTiming"
                    className="form-control"
                    placeholder="e.g. 16:00 - 21:00"
                    value={formData.eveningTiming}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Dress Code Rules</label>
                <input
                  type="text"
                  name="dressCode"
                  className="form-control"
                  value={formData.dressCode}
                  onChange={handleFormChange}
                />
              </div>

              <div className="form-group">
                <label>General Guidelines Checklist (One per line)</label>
                <textarea
                  name="rulesList"
                  className="form-control"
                  placeholder="e.g. No cameras inside the sanctorum.&#10;Leave shoes outside."
                  value={formData.rulesList}
                  onChange={handleFormChange}
                ></textarea>
              </div>

              <div className="form-group">
                <label>Facilities & Accommodation details</label>
                <textarea
                  name="facilitiesDetails"
                  className="form-control"
                  placeholder="Nearby hotels, ashram contacts, dharamshala ratings..."
                  value={formData.facilitiesDetails}
                  onChange={handleFormChange}
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" className="btn btn-primary" style={{ flexGrow: 1 }}>
                  {editingTempleId ? 'Update Temple' : 'Save Temple'}
                </button>
                {editingTempleId && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditingTempleId(null);
                      setFormData({
                        name: '', deity: '', state: '', city: '', region: 'North',
                        history: '', architectureStyle: 'Nagara Style', heritageStatus: 'Ancient',
                        rating: 4.5, image: '', morningTiming: '06:00 - 12:00', eveningTiming: '16:00 - 21:00',
                        dressCode: 'Modest traditional clothing.', rulesList: '', facilitiesDetails: ''
                      });
                    }}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List of existing temples */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '20px' }}>
              Active Database Listings ({totalCount})
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '680px', overflowY: 'auto', paddingRight: '4px' }}>
              {temples.map((t) => (
                <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                  <div>
                    <h4 style={{ margin: '0 0 2px 0', fontSize: '0.95rem' }}>{t.name}</h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t.city}, {t.state} | {t.deity}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => handleEditClick(t)}
                      style={{ background: 'rgba(212, 163, 89, 0.12)', border: 'none', color: 'var(--gold)', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete ${t.name}?`)) {
                          onDeleteTemple(t.id);
                        }
                      }}
                      style={{ background: 'rgba(211, 47, 47, 0.1)', border: 'none', color: 'var(--danger)', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Approval Queue */}
      {adminTab === 'queue' && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '20px' }}>
            User Submissions Moderation Queue ({approvalQueue.length})
          </h3>

          {approvalQueue.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              No pending user-submitted drafts require review at this time.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {approvalQueue.map((item) => (
                <div key={item.id} style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '20px', background: 'var(--bg-primary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', color: 'var(--saffron)' }}>{item.name}</h4>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        Proposed Deity: <strong>{item.deity}</strong> | Location: <strong>{item.city}, {item.state}</strong>
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => onApproveSubmission(item)}
                        className="btn btn-primary btn-small"
                        style={{ background: 'var(--success)' }}
                      >
                        Approve & Publish
                      </button>
                      <button
                        onClick={() => onRejectSubmission(item.id)}
                        className="btn btn-danger btn-small"
                      >
                        Reject Draft
                      </button>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', background: 'var(--bg-card)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--gold)' }}>
                    <strong>Proposed History:</strong> {item.history}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .admin-crud-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
