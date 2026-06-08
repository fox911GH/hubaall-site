import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const LOGO = "/logo1.png";
// Replace above with actual logo - see README

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/',           label: 'Home' },
    { to: '/about',      label: 'About' },
    { to: '/activity',   label: 'Activity' },
    { to: '/leadership', label: 'Leadership' },
    { to: '/contact',    label: 'Contact' },
  ];

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner container">
        {/* Brand */}
        <Link to="/" className="brand">
          <img src={LOGO} alt="Hubaall Logo" className="brand-logo" onError={e => e.target.style.display='none'} />
          <div className="brand-text">
            <span className="brand-name">Hubaall</span>
            <span className="brand-sub">Women's Business Group (Inc.)</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="nav-links">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              {l.label}
              {l.to === '/activity' && <span className="nav-dot" />}
            </NavLink>
          ))}
        </nav>

        {/* Hamburger */}
        <button className={`hamburger${open ? ' open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mobile-menu">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({isActive}) => isActive ? 'mobile-link active' : 'mobile-link'}>
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
