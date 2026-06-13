import React from 'react';
import { Star, MapPin, ArrowRight, Landmark } from 'lucide-react';

export default function TempleCard({ temple, onClick }) {
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
      } catch (e) {
        return 0;
      }
    };

    const parseRange = (rangeStr) => {
      try {
        const [start, end] = rangeStr.split('-').map(s => s.trim());
        return [parseTime(start), parseTime(end)];
      } catch (e) {
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
    } catch (err) {
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
          src={temple.image}
          alt={temple.name}
          className="temple-card-img"
          style={cardStyles.image}
        />
        <div style={cardStyles.ratingBadge}>
          <Star size={12} fill="var(--gold)" stroke="var(--gold)" />
          <span>{temple.rating.toFixed(1)}</span>
        </div>
        <div style={cardStyles.deityBadge}>{temple.deity}</div>
      </div>

      <div style={cardStyles.content}>
        <div style={cardStyles.header}>
          <h3 style={cardStyles.title}>{temple.name}</h3>
        </div>

        <div style={cardStyles.location}>
          <MapPin size={14} color="var(--saffron)" />
          <span>{temple.city}, {temple.state}</span>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Landmark size={14} />
          <span>{temple.architectureStyle.split(' (')[0]}</span>
        </div>

        <div style={cardStyles.footer}>
          <span className={`timing-status ${status.class}`}>
            {status.label}
          </span>
          <span style={cardStyles.action}>
            Details <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </div>
  );
}
