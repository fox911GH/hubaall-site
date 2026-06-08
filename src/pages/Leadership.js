import React from 'react';
import './Leadership.css';

const COMMITTEE = [
  { name:'Sepait Edul',       role:'Chairperson',      initials:'SE', color:'#6d28a0', desc:'Leads the Management Committee and represents the group in all official capacities.' },
  { name:'Susefi Poisa',      role:'Vice-Chairperson', initials:'SP', color:'#1b4332', desc:'Supports the Chairperson and assumes leadership responsibilities when required.' },
  { name:'Josephine Narual',  role:'Secretary',        initials:'JN', color:'#0e7490', desc:'Manages correspondence, records, and administrative functions of the group.' },
  { name:'Margarette Sawan',  role:'Treasurer',        initials:'MS', color:'#9333c8', desc:'Oversees financial management, accounts, and reporting for the group.' },
];

const GOVERNANCE = [
  { icon:'👥', title:'Committee Size', desc:'4 Management Committee members appointed by consensus of the Business Group membership.' },
  { icon:'⚖️', title:'Quorum',         desc:'A quorum for any meeting shall consist of all 4 members of the Management Committee.' },
  { icon:'🤝', title:'Decision Making', desc:'Decisions are made by General Consensus of the Management Committee and membership.' },
  { icon:'📝', title:'Document Signing', desc:'Any document to be signed by the incorporated group shall be signed by authorised Committee members.' },
];

export default function Leadership() {
  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-label">Our Team</div>
          <h1>Leadership &amp; Governance</h1>
          <p>Meet the Management Committee guiding Hubaall Women's Business Group (Inc.) — appointed 04 August 2025.</p>
        </div>
      </section>

      <div className="container leadership-page">

        {/* Committee */}
        <section className="ldp-section">
          <div className="section-label">Management Committee</div>
          <h2 className="section-title">Our Leadership Team</h2>
          <div className="committee-grid">
            {COMMITTEE.map(m => (
              <div key={m.name} className="committee-card">
                <div className="cc-avatar" style={{background: m.color}}>{m.initials}</div>
                <div className="cc-role-chip" style={{color: m.color, borderColor: m.color + '44', background: m.color + '12'}}>
                  {m.role}
                </div>
                <div className="cc-name">{m.name}</div>
                <div className="cc-nat">🇵🇬 Papua New Guinean · Female</div>
                <p className="cc-desc">{m.desc}</p>
                <div className="cc-footer">
                  <span className="cc-date">Appointed: 04 Aug 2025</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Governance */}
        <section className="ldp-section">
          <div className="section-label">How We Operate</div>
          <h2 className="section-title">Governance Structure</h2>
          <div className="gov-grid">
            {GOVERNANCE.map(g => (
              <div key={g.title} className="gov-card">
                <div className="gov-icon">{g.icon}</div>
                <div className="gov-title">{g.title}</div>
                <p className="gov-desc">{g.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dispute */}
        <section className="ldp-section">
          <div className="section-label">Dispute Resolution</div>
          <h2 className="section-title">Dispute Settlement Authority</h2>
          <div className="dsa-box">
            <div className="dsa-icon">⚖️</div>
            <div className="dsa-body">
              <div className="dsa-lbl">Appointed Authority</div>
              <div className="dsa-name">Mun Kingris</div>
              <div className="dsa-addr">C/- P O Box 726, Madang 2511, Madang, Madang, Papua New Guinea</div>
            </div>
            <div className="dsa-note">
              Any matter between members or a member and the Business Group which is not otherwise provided for in the constitution shall be regulated by the traditional customs of the <strong>Bau</strong>.
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
