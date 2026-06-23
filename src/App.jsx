import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TempleCard from './components/TempleCard';
import TempleDirectory from './components/TempleDirectory';
import DetailView from './components/DetailView';
import CircuitPlanner from './components/CircuitPlanner';
import VirtualMuseum from './components/VirtualMuseum';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import { initialTemples } from './data/temples';
import { Compass, BookOpen, UserCheck } from 'lucide-react';

const MOCK_APPROVAL_QUEUE = [
  {
    id: 'sub-1',
    name: 'Dwaraka Tirumala Temple',
    deity: 'Venkateswara',
    state: 'Andhra Pradesh',
    city: 'Dwaraka Tirumala',
    region: 'South',
    history: 'An ancient Dravidian temple located in the Eluru district of Andhra Pradesh, popularly known as Chinna Tirupati. Dedicated to Lord Venkateswara, the temple sits on a beautiful hillock named Seshadri, representing historical Chola and Vijayanagara contribution patterns.',
    architectureStyle: 'Dravidian Style (Chola Architecture)',
    heritageStatus: 'Ancient (Circa 9th Century)',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1600100397608-f010e575796c?auto=format&fit=crop&w=800&q=80',
    morningTiming: '06:00 - 13:00',
    eveningTiming: '15:00 - 21:00',
    dressCode: 'Strict traditional clothing.',
    rulesList: 'No cameras.\nFootwear outside.',
    facilitiesDetails: 'Cottages and free dining halls run by the temple trust.',
    mapCoords: { lat: 16.9602, lng: 81.2588 }
  },
  {
    id: 'sub-2',
    name: 'Martand Sun Temple Ruins',
    deity: 'Surya (Sun God)',
    state: 'Jammu & Kashmir',
    city: 'Anantnag',
    region: 'North',
    history: 'A spectacular 8th-century Kashmiri Hindu temple built by King Lalitaditya Muktapida of the Karkota dynasty. Although ruined today, the monument showcases a blend of Gandharan, Gupta, and Greek architectural elements, built of massive blocks of stone.',
    architectureStyle: 'Kashmiri Style (Stone Masonry)',
    heritageStatus: 'Ancient Ruins (8th Century)',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1549449875-c9e29a9976bb?auto=format&fit=crop&w=800&q=80',
    morningTiming: '06:00 - 18:00',
    eveningTiming: 'Closed',
    dressCode: 'Decent attire expected.',
    rulesList: 'Protected monument.\nDo not deface stones.',
    facilitiesDetails: 'Basic tourist information centers at Anantnag.',
    mapCoords: { lat: 33.6937, lng: 75.2155 }
  }
];

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [temples, setTemples] = useState([]);
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [approvalQueue, setApprovalQueue] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize data from LocalStorage
  useEffect(() => {
    // 1. Load active temples list
    const storedTemples = localStorage.getItem('temple_database_active');
    const storedVersion = localStorage.getItem('temple_database_version');
    const CURRENT_DB_VERSION = 'v21';

    if (storedTemples && storedVersion === CURRENT_DB_VERSION) {
      const parsed = JSON.parse(storedTemples);
      const isOutdated = parsed.length < 23 || parsed.some(t => 
        !t.gallery || 
        t.gallery.length === 0 || 
        t.gallery.some(img => img.includes('temple_detail_') || img.includes('placeholder'))
      );
      if (isOutdated) {
        setTemples(initialTemples);
        localStorage.setItem('temple_database_active', JSON.stringify(initialTemples));
        localStorage.setItem('temple_database_version', CURRENT_DB_VERSION);
      } else {
        setTemples(parsed);
      }
    } else {
      setTemples(initialTemples);
      localStorage.setItem('temple_database_active', JSON.stringify(initialTemples));
      localStorage.setItem('temple_database_version', CURRENT_DB_VERSION);
    }

    // 2. Load approval queue
    const storedQueue = localStorage.getItem('temple_database_approval_queue');
    if (storedQueue) {
      setApprovalQueue(JSON.parse(storedQueue));
    } else {
      setApprovalQueue(MOCK_APPROVAL_QUEUE);
      localStorage.setItem('temple_database_approval_queue', JSON.stringify(MOCK_APPROVAL_QUEUE));
    }

    // 3. Load Dark Mode theme preference
    const prefersDark = localStorage.getItem('temple_theme_dark') === 'true';
    setDarkMode(prefersDark);
  }, []);

  // Sync dark class with document tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('temple_theme_dark', String(darkMode));
  }, [darkMode]);

  const navigate = (page, temple = null, push = true) => {
    setActivePage(page);
    setSelectedTemple(temple);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (push) {
      window.history.pushState({ page, templeId: temple ? temple.id : null }, '');
    }
  };

  // Sync React routing state with browser history (back button support)
  useEffect(() => {
    if (!window.history.state) {
      window.history.replaceState({ page: 'home', templeId: null }, '');
    }

    const handlePopState = (event) => {
      const state = event.state;
      if (state) {
        setActivePage(state.page || 'home');
        if (state.templeId) {
          const temple = temples.find(t => t.id === state.templeId);
          setSelectedTemple(temple || null);
        } else {
          setSelectedTemple(null);
        }
      } else {
        setActivePage('home');
        setSelectedTemple(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [temples]);

  const selectTempleForDetail = (temple) => {
    navigate('detail', temple);
  };

  const syncActiveTemples = (updatedTemples) => {
    setTemples(updatedTemples);
    localStorage.setItem('temple_database_active', JSON.stringify(updatedTemples));
  };

  const syncApprovalQueue = (updatedQueue) => {
    setApprovalQueue(updatedQueue);
    localStorage.setItem('temple_database_approval_queue', JSON.stringify(updatedQueue));
  };

  // CRUD handlers from Admin panel
  const handleAddTemple = (newTemple) => {
    const updated = [...temples, newTemple];
    syncActiveTemples(updated);
  };

  const handleUpdateTemple = (id, updatedFields) => {
    const updated = temples.map(t => t.id === id ? { ...t, ...updatedFields, id } : t);
    syncActiveTemples(updated);
  };

  const handleDeleteTemple = (id) => {
    const updated = temples.filter(t => t.id !== id);
    syncActiveTemples(updated);
  };

  // Approval handlers
  const handleApproveSubmission = (submission) => {
    const rules = submission.rulesList ? submission.rulesList.split('\n').filter(r => r.trim() !== '') : ['Leave shoes outside'];
    
    const approvedTemple = {
      id: submission.id,
      name: submission.name,
      deity: submission.deity,
      state: submission.state,
      city: submission.city,
      region: submission.region || 'North',
      history: submission.history,
      architectureStyle: submission.architectureStyle || 'Nagara Style',
      heritageStatus: submission.heritageStatus || 'Ancient',
      rating: submission.rating || 4.5,
      image: submission.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      website: submission.website || '',
      gallery: submission.gallery || (submission.image ? [submission.image] : ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80']),
      mapCoords: submission.mapCoords || { lat: Number(submission.lat) || 28.6139, lng: Number(submission.lng) || 77.2090 },
      featured: false,
      approved: true,
      darshanTimings: {
        morning: submission.morningTiming || '06:00 - 12:00',
        evening: submission.eveningTiming || '16:00 - 21:00',
        aarti: [{ name: 'Aarti', time: '06:30' }]
      },
      rituals: ['Daily worship routines'],
      guidelines: {
        dressCode: submission.dressCode || 'Traditional attire.',
        rules: rules,
        restrictions: ['Mobiles restricted.']
      },
      facilities: {
        accommodation: true,
        transport: ['Local buses and autos.'],
        details: submission.facilitiesDetails || 'Accommodation is available nearby.'
      }
    };

    // Add to active database
    const updatedTemples = [...temples, approvedTemple];
    syncActiveTemples(updatedTemples);

    // Remove from queue
    const updatedQueue = approvalQueue.filter(item => item.id !== submission.id);
    syncApprovalQueue(updatedQueue);
  };

  const handleRejectSubmission = (id) => {
    const updatedQueue = approvalQueue.filter(item => item.id !== id);
    syncApprovalQueue(updatedQueue);
  };

  // Filter out featured temples for homepage
  const featuredTemples = temples.filter(t => t.featured);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar navigation controls */}
      <Navbar
        activePage={activePage}
        setActivePage={(page) => {
          navigate(page, null);
        }}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Page Routing */}
      <main style={{ flexGrow: 1, paddingBottom: '40px' }}>
        {activePage === 'home' && (
          <div>
            <Hero temples={temples} onSelectTemple={selectTempleForDetail} />
            
            {/* Featured Section */}
            <div className="container" style={{ marginTop: '20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Sacred Indian Temples</h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
                  Explore our comprehensive portal of historical, architectural, and spiritual wonders across India.
                </p>
              </div>

              <div className="grid-3">
                {temples.map(temple => (
                  <TempleCard
                    key={temple.id}
                    temple={temple}
                    onClick={selectTempleForDetail}
                  />
                ))}
              </div>

              {/* Call to Actions Row */}
              <div className="grid-2" style={{ marginTop: '50px' }}>
                <div
                  className="glass-panel"
                  style={{
                    padding: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate('circuits')}
                >
                  <div style={{
                    background: 'var(--gold-glow)',
                    color: 'var(--gold)',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)'
                  }}>
                    <Compass size={28} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '6px' }}>Trip Circuit Planner</h3>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                      Sequence your journeys with map flow routines, check lists, and duration rules.
                    </p>
                  </div>
                </div>

                <div
                  className="glass-panel"
                  style={{
                    padding: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate('museum')}
                >
                  <div style={{
                    background: 'rgba(255, 111, 60, 0.15)',
                    color: 'var(--saffron)',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)'
                  }}>
                    <BookOpen size={28} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '6px' }}>Architectural Glossary</h3>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                      Learn about Vastu geometry, stone Shikharas, Gopurams, and test your knowledge in the quiz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePage === 'explore' && (
          <TempleDirectory temples={temples} onSelectTemple={selectTempleForDetail} />
        )}

        {activePage === 'circuits' && (
          <CircuitPlanner temples={temples} onSelectTemple={selectTempleForDetail} />
        )}

        {activePage === 'museum' && (
          <VirtualMuseum />
        )}

        {activePage === 'admin' && (
          <AdminPanel
            temples={temples}
            onAddTemple={handleAddTemple}
            onUpdateTemple={handleUpdateTemple}
            onDeleteTemple={handleDeleteTemple}
            approvalQueue={approvalQueue}
            onApproveSubmission={handleApproveSubmission}
            onRejectSubmission={handleRejectSubmission}
          />
        )}

        {activePage === 'detail' && selectedTemple && (
          <div className="container" style={{ marginTop: '30px' }}>
            <DetailView
              temple={selectedTemple}
              onBack={() => {
                if (window.history.state && window.history.length > 1) {
                  window.history.back();
                } else {
                  navigate('explore');
                }
              }}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
