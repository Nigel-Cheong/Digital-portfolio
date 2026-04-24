import React, { useState } from 'react';
import { aboutData } from '../data/aboutData';

const About = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const openModal = (testimonial) => {
    setSelectedTestimonial(testimonial);
  };

  const closeModal = () => {
    setSelectedTestimonial(null);
  };

  return (
    <article className="about active" data-page="about">
      <header>
        <h2 className="h2 article-title">About me</h2>
      </header>

      <section className="about-text">
        {aboutData.aboutMe.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      {/* Services */}
      <section className="service">
        <h3 className="h3 service-title">What i'm doing</h3>
        <ul className="service-list">
          {aboutData.services.map((service, index) => (
            <li className="service-item" key={index}>
              <div className="service-icon-box">
                <img src={service.icon} alt={service.title} width="40" />
              </div>
              <div className="service-content-box">
                <h4 className="h4 service-item-title">{service.title}</h4>
                <p className="service-item-text">{service.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h3 className="h3 testimonials-title">Testimonials</h3>
        <ul className="testimonials-list has-scrollbar">
          {aboutData.testimonials.map((testimonial, index) => (
            <li className="testimonials-item" key={index} onClick={() => openModal(testimonial)}>
              <div className="content-card" data-testimonials-item>
                <figure className="testimonials-avatar-box">
                  <img src={testimonial.avatar} alt={testimonial.name} width="60" data-testimonials-avatar />
                </figure>
                <h4 className="h4 testimonials-item-title" data-testimonials-title>{testimonial.name}</h4>
                <div className="testimonials-text" data-testimonials-text>
                  <p>{testimonial.content}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Testimonials Modal */}
      {selectedTestimonial && (
        <div className={`modal-container ${selectedTestimonial ? 'active' : ''}`} data-modal-container>
          <div className={`overlay ${selectedTestimonial ? 'active' : ''}`} data-overlay onClick={closeModal}></div>
          <section className="testimonials-modal">
            <button className="modal-close-btn" data-modal-close-btn onClick={closeModal}>
              <ion-icon name="close-outline"></ion-icon>
            </button>
            <div className="modal-img-wrapper">
              <figure className="modal-avatar-box">
                <img src={selectedTestimonial.avatar} alt={selectedTestimonial.name} width="80" data-modal-img />
              </figure>
              <img src="assets/images/icon-quote.svg" alt="quote icon" />
            </div>
            <div className="modal-content">
              <h4 className="h3 modal-title" data-modal-title>{selectedTestimonial.name}</h4>
              <time dateTime={selectedTestimonial.datetime}>{selectedTestimonial.date}</time>
              <div data-modal-text>
                <p>{selectedTestimonial.content}</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Clients */}
      <section className="clients">
        <h3 className="h3 clients-title">Clients</h3>
        <ul className="clients-list has-scrollbar">
          {aboutData.clients.map((client, index) => (
            <li className="clients-item" key={index}>
              <a href="#">
                <img src={client.logo} alt={client.name} />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default About;
