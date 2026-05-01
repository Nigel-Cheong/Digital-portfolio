import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: '',
    website: '' // This is our disguised honeypot
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Honeypot check: If the disguised 'website' field is filled, it's likely a bot
    if (formData.website) {
      console.warn("Bot detected via honeypot.");
      setStatus({ type: 'success', message: 'Message sent successfully!' }); // Silently fail for the bot
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // Replace this URL with your actual Cloud Function URL after deployment
      const CLOUD_FUNCTION_URL = 'https://asia-southeast1-vibed-with-love.cloudfunctions.net/portfolio-contact-service';
      
      const response = await fetch(CLOUD_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ fullname: '', email: '', message: '', website: '' });
      } else {
        setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.fullname.trim() !== '' && 
                      formData.email.trim() !== '' && 
                      formData.message.trim() !== '';

  return (
    <article className="contact active" data-page="contact">
      <header>
        <h2 className="h2 article-title">Contact</h2>
      </header>

      <section className="contact-info-section" style={{ marginBottom: '35px' }}>
        <p style={{ color: 'var(--light-gray)', fontSize: 'var(--fs-6)', lineHeight: '1.6', marginBottom: '25px' }}>
          I'm always open to discussing new projects, cloud architecture challenges, or opportunities to innovate. Feel free to reach out via the form below or connect with me on professional platforms.
        </p>
        
        <ul className="social-list" style={{ justifyContent: 'flex-start', gap: '20px' }}>
          <li className="social-item">
            <a href="https://www.linkedin.com/in/nigelcheongsingapore" className="social-link" style={{ fontSize: '24px', color: 'var(--orange-yellow-crayola)' }}>
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </li>
          <li className="social-item">
            <a href="https://github.com/Nigel-Cheong" className="social-link" style={{ fontSize: '24px', color: 'var(--orange-yellow-crayola)' }}>
              <ion-icon name="logo-github"></ion-icon>
            </a>
          </li>
        </ul>
      </section>

      <section className="contact-form">
        <h3 className="h3 form-title">Contact Form</h3>
        
        {status.message && (
          <p className={`form-status ${status.type}`} style={{ 
            color: status.type === 'success' ? 'var(--orange-yellow-crayola)' : '#ff4b4b',
            marginBottom: '20px',
            fontSize: 'var(--fs-6)'
          }}>
            {status.message}
          </p>
        )}

        <form className="form" data-form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            {/* Disguised Honeypot field - hidden from users */}
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input 
                type="text" 
                id="website"
                name="website" 
                tabIndex="-1" 
                autoComplete="off"
                value={formData.website}
                onChange={handleInputChange}
              />
            </div>
            
            <input 
              type="text" 
              name="fullname" 
              className="form-input" 
              placeholder="Full name" 
              required 
              data-form-input 
              value={formData.fullname}
              onChange={handleInputChange}
            />
            <input 
              type="email" 
              name="email" 
              className="form-input" 
              placeholder="Email address" 
              required 
              data-form-input 
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <textarea 
            name="message" 
            className="form-input" 
            placeholder="Your Message" 
            required 
            data-form-input
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
          <button className="form-btn" type="submit" disabled={!isFormValid || isSubmitting} data-form-btn>
            <ion-icon name="paper-plane"></ion-icon>
            <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
          </button>
        </form>
      </section>
    </article>
  );
};

export default Contact;
