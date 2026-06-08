import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">

          {/* Brand col */}
          <div className="footer-brand">
            <div className="footer-logo-name">Hubaall Women's Business Group (Inc.)</div>
            <p className="footer-tagline">Empowering mothers · Building community · Growing together</p>
            <div className="footer-chips">
              <span className="f-chip">🏛️ IPA Reg: 4-142028743</span>
              <span className="f-chip">🧾 TIN: 502920847</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <div className="footer-col-title">Quick Links</div>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/activity" className="footer-link">Activity Feed</Link>
            <Link to="/leadership" className="footer-link">Leadership</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>

          {/* Details */}
          <div className="footer-col">
            <div className="footer-col-title">Organisation</div>
            <span className="footer-text">📍 Fulumu Village, Ward 21</span>
            <span className="footer-text">Ambenob LLG, Madang District</span>
            <span className="footer-text">Madang Province, Papua New Guinea</span>
            <span className="footer-text mt-2">🏦 NBC · Account: 10001552</span>
            <span className="footer-text">Account Name: Hubaall Women's Business</span>
          </div>

        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {new Date().getFullYear()} Hubaall Women's Business Group (Inc.) — All rights reserved.</span>
          <span>Incorporated under the Business Groups Incorporation Act 1974 · PNG</span>
        </div>
      </div>
    </footer>
  );
}
