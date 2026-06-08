import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const SECTORS = [
  { icon: '🏗️', label: 'Construction' },
  { icon: '🌾', label: 'Agriculture & Forestry' },
  { icon: '🤝', label: 'Community Services' },
  { icon: '🚛', label: 'Transport & Storage' },
  { icon: '🛒', label: 'Wholesale & Retail Trade' },
  { icon: '🌱', label: 'Mixed Farming' },
];

const STATS = [
  { val: '2025', label: 'Year Founded' },
  { val: '4',    label: 'Committee Members' },
  { val: '6',    label: 'Business Sectors' },
  { val: 'PNG',  label: 'Madang Province' },
];

export default function Home() {
  return (
    <div className="home">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg-circle c1" />
        <div className="hero-bg-circle c2" />
        <div className="container hero-inner">
          <div className="hero-text fade-up">
            <div className="hero-eyebrow">Independent State of Papua New Guinea · Incorporated</div>
            <h1 className="hero-title">
              <span className="accent-purple">Hubaall</span> Women's<br />
              Business <span className="accent-italic">Group (Inc.)</span>
            </h1>
            <p className="hero-desc">
              Empowering mothers in Fulumu Village, Ambenob LLG, Madang Province —
              a formally incorporated, community-driven women's business group building
              economic opportunity through unity, culture, and enterprise.
            </p>
            <div className="hero-actions">
              <Link to="/about" className="btn btn-primary">Learn About Us</Link>
              <Link to="/activity" className="btn btn-outline">View Activity Feed</Link>
            </div>
            <div className="hero-badges">
              <span className="badge badge-green">✓ IPA Registered</span>
              <span className="badge badge-purple">✓ Tax Registered (IRC)</span>
              <span className="badge badge-gold">✓ NBC Bank Account</span>
            </div>
          </div>
          <div className="hero-card fade-up">
            <div className="hero-card-header">Organisation at a Glance</div>
            {STATS.map(s => (
              <div key={s.label} className="hero-stat-row">
                <span className="hero-stat-val">{s.val}</span>
                <span className="hero-stat-lbl">{s.label}</span>
              </div>
            ))}
            <div className="hero-card-divider" />
            <div className="hero-reg-row"><span>Reg. No.</span><strong>4-142028743</strong></div>
            <div className="hero-reg-row"><span>TIN</span><strong>502920847</strong></div>
            <div className="hero-reg-row"><span>Bank (NBC)</span><strong>10001552</strong></div>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="mission-section">
        <div className="container mission-grid">
          <div>
            <div className="section-label">Our Mission</div>
            <h2 className="section-title">Rooted in Community,<br />Growing Together</h2>
            <p style={{color:'var(--muted)', lineHeight:1.8, marginBottom:'1.2rem'}}>
              Hubaall Women's Business Group was established to give the mothers of
              Fulumu Village a formal, recognised platform to participate in economic
              development, access opportunities, and build a sustainable future for their
              families and community.
            </p>
            <p style={{color:'var(--muted)', lineHeight:1.8}}>
              Guided by the traditional customs of the <strong>Bau</strong>, we blend
              cultural values with modern business practice — creating an organisation
              that is accountable, inclusive, and project-ready.
            </p>
            <Link to="/about" className="btn btn-outline" style={{marginTop:'1.5rem'}}>Read Full Profile →</Link>
          </div>
          <div className="mission-card">
            <div className="mission-card-top">
              <div className="mc-icon">🌿</div>
              <div>
                <div style={{fontWeight:700, color:'white', fontSize:'1.05rem'}}>Membership</div>
                <div style={{fontSize:'0.78rem', color:'rgba(255,255,255,0.55)', marginTop:'2px'}}>Eligibility criteria</div>
              </div>
            </div>
            <p className="mc-quote">
              "Only those mothers who are in the community and residing at Fulumu Village,
              Ambenob Ward 21, Ambenob LLG in Madang District of Madang Province are
              eligible for membership."
            </p>
            <div className="mc-tags">
              {['Fulumu Village','Ward 21','Ambenob LLG','Madang District'].map(t => (
                <span key={t} className="mc-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTORS ── */}
      <section className="sectors-section">
        <div className="container">
          <div className="text-center" style={{marginBottom:'2.5rem'}}>
            <div className="section-label" style={{justifyContent:'center', display:'flex'}}>What We Do</div>
            <h2 className="section-title">Business Activities &amp; Sectors</h2>
          </div>
          <div className="sectors-grid">
            {SECTORS.map(s => (
              <div key={s.label} className="sector-card">
                <div className="sector-icon">{s.icon}</div>
                <div className="sector-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="cta-strip">
        <div className="container cta-inner">
          <div>
            <h3 className="cta-title">Stay Connected with Our Activities</h3>
            <p className="cta-sub">Follow our latest news, events, photos and community updates.</p>
          </div>
          <Link to="/activity" className="btn btn-primary" style={{flexShrink:0}}>
            View Activity Feed →
          </Link>
        </div>
      </section>

    </div>
  );
}
