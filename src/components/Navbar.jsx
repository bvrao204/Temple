import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Landmark } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, darkMode, setDarkMode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Explore Temples' },
    { id: 'circuits', label: 'Pilgrimage Circuits' },
    { id: 'museum', label: 'Virtual Museum' },
    { id: 'admin', label: 'Admin Panel' }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileOpen(false);
  };

  const navStyles = {
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--bg-glass)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      transition: 'background var(--transition-normal), border var(--transition-normal)'
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '72px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '1.4rem',
      fontWeight: 700,
      fontFamily: 'var(--font-title)',
      cursor: 'pointer',
      background: 'linear-gradient(135deg, var(--saffron) 0%, var(--gold) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    logoIcon: {
      stroke: 'var(--saffron)'
    },
    desktopNav: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    navLink: (isActive) => ({
      padding: '8px 16px',
      borderRadius: 'var(--radius-sm)',
      fontSize: '0.92rem',
      fontWeight: 600,
      fontFamily: 'var(--font-title)',
      color: isActive ? 'var(--saffron)' : 'var(--text-secondary)',
      background: isActive ? 'rgba(255, 111, 60, 0.08)' : 'transparent',
      border: 'none',
      cursor: 'pointer',
      transition: 'all var(--transition-fast)'
    }),
    controls: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    themeBtn: {
      background: 'none',
      border: '1px solid var(--border-color)',
      color: 'var(--text-secondary)',
      padding: '8px',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all var(--transition-fast)'
    },
    menuBtn: {
      display: 'none',
      background: 'none',
      border: 'none',
      color: 'var(--text-primary)',
      cursor: 'pointer',
      padding: '4px'
    },
    mobileNav: {
      display: 'none',
      position: 'absolute',
      top: '72px',
      left: 0,
      right: 0,
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-color)',
      padding: '16px 24px',
      flexDirection: 'column',
      gap: '12px',
      boxShadow: 'var(--shadow-md)'
    }
  };

  // Media query overrides via CSS injection or inline JS styles inside elements
  return (
    <header style={navStyles.header}>
      <div className="container" style={navStyles.container}>
        {/* Brand Logo */}
        <div style={navStyles.logo} onClick={() => handleNavClick('home')}>
          <Landmark size={24} style={navStyles.logoIcon} />
          <span>BHARAT HERITAGE</span>
        </div>

        {/* Desktop Links */}
        <nav className="desktop-only-flex" style={navStyles.desktopNav}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={navStyles.navLink(activePage === item.id)}
              className="nav-hover-item"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Controls */}
        <div style={navStyles.controls}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={navStyles.themeBtn}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="theme-btn-hover"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="mobile-only-block"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={navStyles.menuBtn}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      <div
        className="mobile-only-flex"
        style={{
          ...navStyles.mobileNav,
          display: mobileOpen ? 'flex' : 'none'
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            style={{
              ...navStyles.navLink(activePage === item.id),
              textAlign: 'left',
              width: '100%',
              padding: '12px 16px'
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Injecting media query CSS directly for mobile display control */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-only-flex {
            display: none !important;
          }
          .mobile-only-block {
            display: block !important;
          }
        }
        .nav-hover-item:hover {
          color: var(--saffron) !important;
          background: rgba(255, 111, 60, 0.04) !important;
        }
        .theme-btn-hover:hover {
          border-color: var(--border-focus) !important;
          color: var(--gold) !important;
          background: rgba(212, 163, 89, 0.05);
        }
      `}</style>
    </header>
  );
}
