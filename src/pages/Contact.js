import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [form, setForm]   = useState({ name:'', email:'', subject:'', message:'' });
  const [sent, setSent]   = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.message) { setError('Please fill in your name and message.'); return; }
    // In production, wire to Supabase 'messages' table or Formspree
    console.log('Form submitted:', form);
    setSent(true);
    setError('');
  };

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-label">Get in Touch</div>
          <h1>Contact Us</h1>
          <p>Reach out to the Hubaall Women's Business Group for enquiries, partnerships, or project discussions.</p>
        </div>
      </section>

      <div className="container contact-page">

        <div className="contact-grid">

          {/* Info */}
          <div className="contact-info">
            <div className="section-label">Our Details</div>
            <h2 className="section-title" style={{fontSize:'1.8rem'}}>How to Reach Us</h2>

            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">📍</div>
                <div>
                  <div className="info-label">Physical Address</div>
                  <div className="info-value">Fulumu Village, Ward 21<br/>Ambenob LLG, Madang District<br/>Madang Province, Papua New Guinea</div>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">📬</div>
                <div>
                  <div className="info-label">Postal Address</div>
                  <div className="info-value">C/- P O Box 726<br/>Madang 2511<br/>Papua New Guinea</div>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">🏦</div>
                <div>
                  <div className="info-label">Banking Details</div>
                  <div className="info-value">
                    <strong>Bank:</strong> National Banking Corporation (NBC)<br/>
                    <strong>Account Name:</strong> Hubaall Women's Business<br/>
                    <strong>Account No:</strong> <span style={{color:'var(--purple)',fontWeight:700}}>10001552</span>
                  </div>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">🏛️</div>
                <div>
                  <div className="info-label">Registration</div>
                  <div className="info-value">
                    <strong>IPA Reg:</strong> 4-142028743<br/>
                    <strong>TIN:</strong> 502920847<br/>
                    <strong>Incorporated:</strong> 04 August 2025
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap card">
            {sent ? (
              <div className="form-success">
                <div className="success-icon">✅</div>
                <h3>Message Received!</h3>
                <p>Thank you for reaching out. The Hubaall Women's Business Group will respond to your enquiry as soon as possible.</p>
                <button className="btn btn-outline" onClick={() => { setSent(false); setForm({name:'',email:'',subject:'',message:''}); }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-header">
                  <h3>Send a Message</h3>
                  <p>We'll get back to you as soon as possible.</p>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input name="subject" placeholder="What is this regarding?" value={form.subject} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea name="message" placeholder="Write your message here…" value={form.message} onChange={handleChange} rows={6} required />
                </div>
                {error && <div className="form-error">⚠️ {error}</div>}
                <button type="submit" className="btn btn-primary" style={{width:'100%',justifyContent:'center',padding:'0.8rem'}}>
                  Send Message →
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
