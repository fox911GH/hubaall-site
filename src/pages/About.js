import React from 'react';
import './About.css';

const CERTS = [
  { icon:'📜', name:'Certificate of Incorporation', num:'No. 4-142028743', detail:'04 August 2025 · PNG IPA · Validation: BG-5161604 · Signed: David A. Kil', color:'#6d28a0' },
  { icon:'🏅', name:'Certificate of Good Standing – Long Form', num:'Status: Registered', detail:'Generated 04 August 2025 at 13:43 · Registrar of Companies · PNG IPA', color:'#1b4332' },
  { icon:'🧾', name:'Taxpayer Registration Certificate', num:'TIN: 502920847', detail:'11 September 2025 · PNG Internal Revenue Commission · Cert No. 166959646', color:'#9333c8' },
];

const REG = [
  { label:'IPA Registration Number', val:'4-142028743', sub:'Investment Promotion Authority · PNG' },
  { label:'Date of Incorporation', val:'04 August, 2025', sub:'Business Groups Incorporation Act 1974' },
  { label:'Status', val:'✓ Registered', sub:'Certificate of Good Standing – Long Form', green:true },
  { label:'Taxpayer ID (TIN)', val:'502920847', sub:'PNG Internal Revenue Commission' },
  { label:'IRC Registration Date', val:'11 September, 2025', sub:'Madang Tax Office · IRC Cert. 166959646' },
  { label:'Entity Type', val:'Business Group', sub:'Act Sec. 11(1) · Validation: BG-5161604' },
];

export default function About() {
  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-label">Who We Are</div>
          <h1>About Hubaall Women's Business Group</h1>
          <p>A formally incorporated, culturally grounded, project-ready women's organisation in the heart of Madang Province, Papua New Guinea.</p>
        </div>
      </section>

      <div className="container about-page">

        {/* Registration */}
        <section className="about-section">
          <div className="section-label">Legal Identity</div>
          <h2 className="section-title">Registration &amp; Credentials</h2>
          <div className="reg-grid">
            {REG.map(r => (
              <div key={r.label} className="reg-card">
                <div className="reg-lbl">{r.label}</div>
                <div className="reg-val" style={r.green ? {color:'#166534'} : {}}>{r.val}</div>
                <div className="reg-sub">{r.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="about-section about-story-grid">
          <div>
            <div className="section-label">Our Story</div>
            <h2 className="section-title">About the Organisation</h2>
            <p>Hubaall Women's Business Group (Inc.) is a formally incorporated, women-led organisation rooted in the Fulumu Village community of Ambenob Ward 21, Ambenob LLG, Madang District, Madang Province, Papua New Guinea.</p>
            <p>Established under the Business Groups Incorporation Act 1974 and registered with the Investment Promotion Authority, the group empowers local mothers to participate actively in economic development, community services, agriculture, trade, and construction across multiple sectors.</p>
            <p>The organisation is guided by the traditional customs of the <strong>Bau</strong>, ensuring operations remain culturally grounded while pursuing modern business and community development goals.</p>
          </div>
          <div className="story-sidebar">
            <div className="story-box purple-border">
              <div className="sb-lbl">Issuing Authority</div>
              <div className="sb-val">David A. Kil</div>
              <div className="sb-sub">Registrar of Companies · PNG IPA</div>
            </div>
            <div className="story-box green-border">
              <div className="sb-lbl">Principal Place of Business</div>
              <div className="sb-val">Fulumu Village, Ward 21</div>
              <div className="sb-sub">Ambenob LLG · Madang District · Madang Province</div>
            </div>
            <div className="story-box gold-border">
              <div className="sb-lbl">Cultural Foundation</div>
              <div className="sb-val">Bau Customs</div>
              <div className="sb-sub">Unresolved matters regulated by traditional customs of the Bau community</div>
            </div>
          </div>
        </section>

        {/* Membership */}
        <section className="about-section">
          <div className="section-label">Who Can Join</div>
          <h2 className="section-title">Membership Eligibility</h2>
          <div className="mem-box">
            <p className="mem-quote">"Only those mothers who are in the community and residing at Fulumu Village, Ambenob Ward 21, Ambenob LLG in Madang District of Madang Province are eligible for membership of the Business Group."</p>
            <div className="mem-tags">
              {['📍 Fulumu Village','🏘️ Ambenob Ward 21','🗂️ Ambenob LLG','🌏 Madang District','⚖️ Bau Customs Apply'].map(t => (
                <span key={t} className="mem-tag">{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Banking */}
        <section className="about-section">
          <div className="section-label">Financial Details</div>
          <h2 className="section-title">Banking Information</h2>
          <div className="bank-box">
            <div className="bank-grid">
              <div><div className="bk-lbl">Bank Name</div><div className="bk-val">National Banking Corporation (NBC)</div><div className="bk-sub">Papua New Guinea</div></div>
              <div><div className="bk-lbl">Account Name</div><div className="bk-val">Hubaall Women's Business</div><div className="bk-sub">Registered Business Group Account</div></div>
              <div><div className="bk-lbl">Account Number</div><div className="bk-val bk-acc">10001552</div><div className="bk-sub">Business Savings / Current Account</div></div>
            </div>
            <div className="bank-note">Account held in the name of the incorporated group · Authorised signatories as per Management Committee resolutions</div>
          </div>
        </section>

        {/* Addresses */}
        <section className="about-section">
          <div className="section-label">Where to Find Us</div>
          <h2 className="section-title">Registered Addresses</h2>
          <div className="addr-grid">
            <div className="addr-card">
              <div className="addr-lbl">Postal Address</div>
              <div className="addr-val">C/- P O Box 726<br/>Madang 2511, Madang<br/>Madang, Madang<br/><strong>Papua New Guinea</strong></div>
            </div>
            <div className="addr-card">
              <div className="addr-lbl">Principal Place of Business</div>
              <div className="addr-val">Fulumu Village, Ward 21<br/>Ambenob LLG<br/>Madang, Madang<br/><strong>Papua New Guinea</strong></div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="about-section">
          <div className="section-label">Official Documents</div>
          <h2 className="section-title">Certifications</h2>
          <div className="cert-grid">
            {CERTS.map(c => (
              <div key={c.name} className="cert-card" style={{'--cert-color': c.color}}>
                <div className="cert-icon">{c.icon}</div>
                <div className="cert-name">{c.name}</div>
                <div className="cert-num">{c.num}</div>
                <div className="cert-det">{c.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Dispute */}
        <section className="about-section">
          <div className="section-label">Governance</div>
          <h2 className="section-title">Dispute Settlement Authority</h2>
          <div className="dispute-box">
            <div>
              <div className="dsp-lbl">Appointed Authority</div>
              <div className="dsp-name">Mun Kingris</div>
              <div className="dsp-addr">C/- P O Box 726, Madang 2511, Madang, Madang, Papua New Guinea</div>
            </div>
            <div className="dsp-badge">⚖️<br/>Dispute<br/>Authority</div>
          </div>
        </section>

      </div>
    </div>
  );
}
