
import { Star, MapPin, ArrowRight, Landmark, Clock } from 'lucide-react';

// Google Earth SVG icon component
const EarthIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const basePath = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${basePath}${cleanPath}`;
};

export default function TempleCard({ temple, onClick, distance }) {
  // Live status calculation utility
  const getLiveStatus = (darshanTimings) => {
    if (!darshanTimings || !darshanTimings.morning) {
      return { label: 'Open', class: 'timing-open' }; // Fallback for monuments like Konark
    }

    const now = new Date();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    const currentVal = currentHour * 60 + currentMin; // minutes since midnight

    const parseTime = (timeStr) => {
      try {
        const [h, m] = timeStr.trim().split(':').map(Number);
        return h * 60 + m;
      } catch {
        return 0;
      }
    };

    const parseRange = (rangeStr) => {
      try {
        const [start, end] = rangeStr.split('-').map(s => s.trim());
        return [parseTime(start), parseTime(end)];
      } catch {
        return [0, 0];
      }
    };

    try {
      // 1. Check if it's within 30 minutes of any Aarti Pooja
      if (darshanTimings.aarti && darshanTimings.aarti.length > 0) {
        for (let a of darshanTimings.aarti) {
          const aartiMin = parseTime(a.time);
          if (currentVal >= aartiMin && currentVal <= aartiMin + 30) {
            return { label: `Aarti: ${a.name}`, class: 'timing-aarti' };
          }
        }
      }

      // 2. Check morning slot
      const [mStart, mEnd] = parseRange(darshanTimings.morning);
      if (currentVal >= mStart && currentVal <= mEnd) {
        return { label: 'Open Now', class: 'timing-open' };
      }

      // 3. Check evening slot
      if (darshanTimings.evening) {
        const [eStart, eEnd] = parseRange(darshanTimings.evening);
        if (currentVal >= eStart && currentVal <= eEnd) {
          return { label: 'Open Now', class: 'timing-open' };
        }
      }
    } catch {
      // fallback
    }

    return { label: 'Closed', class: 'timing-closed' };
  };

  const status = getLiveStatus(temple.darshanTimings);

  const cardStyles = {
    card: {
      overflow: 'hidden',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
    },
    imageWrapper: {
      position: 'relative',
      height: '220px',
      overflow: 'hidden',
      background: '#e0e0e0'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform var(--transition-slow)'
    },
    ratingBadge: {
      position: 'absolute',
      top: '12px',
      right: '12px',
      background: 'rgba(0, 0, 0, 0.75)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: '4px 8px',
      borderRadius: 'var(--radius-sm)',
      fontSize: '0.8rem',
      fontWeight: 700,
      backdropFilter: 'blur(4px)'
    },
    deityBadge: {
      position: 'absolute',
      bottom: '12px',
      left: '12px',
      background: 'var(--bg-glass)',
      color: 'var(--text-primary)',
      padding: '4px 10px',
      borderRadius: 'var(--radius-sm)',
      fontSize: '0.75rem',
      fontWeight: 700,
      backdropFilter: 'blur(8px)',
      border: '1px solid var(--border-color)'
    },
    content: {
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: '8px',
      marginBottom: '10px'
    },
    title: {
      fontSize: '1.25rem',
      lineHeight: '1.3',
      margin: 0
    },
    location: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '0.88rem',
      color: 'var(--text-secondary)',
      marginBottom: '14px'
    },
    footer: {
      marginTop: 'auto',
      paddingTop: '16px',
      borderTop: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    action: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '0.88rem',
      fontWeight: 600,
      color: 'var(--saffron)'
    }
  };

  return (
    <div
      className="glass-panel"
      style={cardStyles.card}
      onClick={() => onClick(temple)}
      onMouseEnter={(e) => {
        const img = e.currentTarget.querySelector('.temple-card-img');
        if (img) img.style.transform = 'scale(1.08)';
      }}
      onMouseLeave={(e) => {
        const img = e.currentTarget.querySelector('.temple-card-img');
        if (img) img.style.transform = 'scale(1)';
      }}
    >
      <div style={cardStyles.imageWrapper}>
        <img
          src={getImageUrl(temple.image)}
          alt={temple.name}
          className="temple-card-img"
          style={cardStyles.image}
        />
        <div style={cardStyles.ratingBadge}>
          <Star size={12} fill="var(--gold)" stroke="var(--gold)" />
          <span>{Number(temple.rating).toFixed(1)}</span>
        </div>
        <div style={cardStyles.deityBadge}>{temple.deity}</div>
      </div>

      <div style={cardStyles.content}>
        <div style={cardStyles.header}>
          <h3 style={cardStyles.title}>{temple.name}</h3>
        </div>

        {temple.circuits && temple.circuits.length > 0 && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
            {temple.circuits.map(c => (
              <span key={c} style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', background: 'rgba(255,111,60,0.1)', color: 'var(--saffron)', borderRadius: '12px', border: '1px solid rgba(255,111,60,0.2)' }}>
                {c}
              </span>
            ))}
          </div>
        )}

        <div style={cardStyles.location}>
          <MapPin size={14} color="var(--saffron)" />
          <span>{temple.city}, {temple.state}</span>
          {distance !== undefined && distance !== null && (
            <span style={{
              marginLeft: 'auto',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#ffb300',
              background: 'rgba(255, 179, 0, 0.1)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(255, 179, 0, 0.2)'
            }}>
              📍 {distance} km
            </span>
          )}
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Landmark size={14} />
          <span>{temple.architectureStyle.split(' (')[0]}</span>
        </div>

        {temple.darshanTimings && temple.darshanTimings.morning ? (
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={14} color="var(--gold)" />
              <span style={{ fontWeight: 600 }}>Darshan Timings:</span>
            </div>
            <div style={{ paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
              <div>Morning: {temple.darshanTimings.morning}</div>
              {temple.darshanTimings.evening && !temple.darshanTimings.evening.toLowerCase().includes('closed') && (
                <div>Evening: {temple.darshanTimings.evening}</div>
              )}
            </div>
          </div>
        ) : null}

        <div style={cardStyles.footer}>
          <span className={`timing-status ${status.class}`}>
            {status.label}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {temple.mapCoords && (
              <a
                href={`https://earth.google.com/web/search/${encodeURIComponent(temple.name)}/@${temple.mapCoords.lat},${temple.mapCoords.lng},500a,800d,35y,0h,45t,0r`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="View on Google Earth"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#4a90d9',
                  textDecoration: 'none',
                  padding: '3px 8px',
                  border: '1px solid rgba(74,144,217,0.35)',
                  borderRadius: '4px',
                  background: 'rgba(74,144,217,0.08)',
                  transition: 'all 0.2s'
                }}
                onMouseOver={e => { e.currentTarget.style.background = 'rgba(74,144,217,0.18)'; e.currentTarget.style.borderColor = '#4a90d9'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'rgba(74,144,217,0.08)'; e.currentTarget.style.borderColor = 'rgba(74,144,217,0.35)'; }}
              >
                <EarthIcon size={13} /> Earth
              </a>
            )}
            <span style={cardStyles.action}>
              Details <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
