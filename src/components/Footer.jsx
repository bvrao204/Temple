
import { Landmark, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const footerStyles = {
    footer: {
      marginTop: '60px',
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      padding: '48px 0 24px 0',
      transition: 'background var(--transition-normal), border var(--transition-normal)'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr',
      gap: '40px',
      marginBottom: '32px'
    },
    brandCol: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '1.3rem',
      fontWeight: 700,
      fontFamily: 'var(--font-title)',
      background: 'linear-gradient(135deg, var(--saffron) 0%, var(--gold) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    desc: {
      fontSize: '0.9rem',
      color: 'var(--text-secondary)',
      lineHeight: '1.6',
      maxWidth: '400px'
    },
    title: {
      fontSize: '1rem',
      fontFamily: 'var(--font-title)',
      fontWeight: 700,
      marginBottom: '16px',
      color: 'var(--text-primary)'
    },
    links: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    linkItem: {
      fontSize: '0.88rem',
      color: 'var(--text-secondary)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px'
    },
    bottom: {
      borderTop: '1px solid var(--border-color)',
      paddingTop: '20px',
      textAlign: 'center',
      fontSize: '0.8rem',
      color: 'var(--text-muted)'
    }
  };

  return (
    <footer style={footerStyles.footer}>
      <div className="container">
        <div style={footerStyles.grid} className="grid-3">
          {/* Brand */}
          <div style={footerStyles.brandCol}>
            <div style={footerStyles.logo}>
              <Landmark size={20} style={{ stroke: 'var(--saffron)' }} />
              <span>BHARAT HERITAGE</span>
            </div>
            <p style={footerStyles.desc}>
              Preserving and highlighting India's sacred temple history. Our portal provides pilgrims, historians, and tourists with verified, culturally respectful darshan logs and guidelines.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--success)', fontWeight: 600 }}>
              <ShieldCheck size={16} /> Verified by Incredible India Heritage Guidelines
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={footerStyles.title}>Government Portals</h3>
            <ul style={footerStyles.links}>
              <li>
                <a href="https://www.incredibleindia.org" target="_blank" rel="noreferrer" style={footerStyles.linkItem} className="footer-link">
                  Incredible India <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://www.asi.nic.in" target="_blank" rel="noreferrer" style={footerStyles.linkItem} className="footer-link">
                  Archaeological Survey of India <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://tourism.gov.in" target="_blank" rel="noreferrer" style={footerStyles.linkItem} className="footer-link">
                  Ministry of Tourism <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Guidelines resources */}
          <div>
            <h3 style={footerStyles.title}>Pilgrim Resources</h3>
            <ul style={footerStyles.links}>
              <li>
                <a href="#explore" style={footerStyles.linkItem} className="footer-link">Explore Listings</a>
              </li>
              <li>
                <a href="#circuits" style={footerStyles.linkItem} className="footer-link">Pilgrimage Circuits</a>
              </li>
              <li>
                <a href="#museum" style={footerStyles.linkItem} className="footer-link">Architectural Glossary</a>
              </li>
            </ul>
          </div>
        </div>

        <div style={footerStyles.bottom}>
          <p>© {new Date().getFullYear()} India Temple Heritage & Pilgrimage Portal. Created by B Venkateswara Rao. Licensed under MIT.</p>
        </div>
      </div>

      <style>{`
        .footer-link:hover {
          color: var(--saffron) !important;
          text-decoration: underline !important;
        }
        @media (max-width: 768px) {
          footer {
            padding: 30px 0 20px 0 !important;
          }
        }
      `}</style>
    </footer>
  );
}
