import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: ''
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
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // Replace this URL with your actual Cloud Function URL after deployment
      const CLOUD_FUNCTION_URL = 'YOUR_CLOUD_FUNCTION_URL';
      
      const response = await fetch(CLOUD_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ fullname: '', email: '', message: '' });
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

      <section className="mapbox" data-mapbox>
        <figure>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199666.5651251294!2d-121.58334177520186!3d38.56165006739519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ac672b28397f9%3A0x921f6aaa74197fdb!2sSacramento%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1647608789441!5m2!1sen!2sbd"
            width="400" height="300" loading="lazy" title="Google Map"></iframe>
        </figure>
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
