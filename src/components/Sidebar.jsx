import React, { useState } from 'react';
import { userData } from '../data/userData';

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <aside className={`sidebar ${isActive ? 'active' : ''}`} data-sidebar>
      <div className="sidebar-info">
        <figure className="avatar-box">
          <img src={userData.avatar} alt={userData.name} width="80" />
        </figure>

        <div className="info-content">
          <h1 className="name" title={userData.name}>{userData.name}</h1>
          <p className="title">{userData.title}</p>
        </div>

        <button className="info_more-btn" data-sidebar-btn onClick={toggleSidebar}>
          <span>Show Contacts</span>
          <ion-icon name="chevron-down"></ion-icon>
        </button>
      </div>

      <div className="sidebar-info_more">
        <div className="separator"></div>

        <ul className="contacts-list">
          {userData.contacts.map((contact, index) => (
            <li className="contact-item" key={index}>
              <div className="icon-box">
                <ion-icon name={contact.icon}></ion-icon>
              </div>

              <div className="contact-info">
                <p className="contact-title">{contact.title}</p>
                {contact.link ? (
                  <a href={contact.link} className="contact-link">{contact.value}</a>
                ) : contact.datetime ? (
                  <time dateTime={contact.datetime}>{contact.value}</time>
                ) : (
                  <address>{contact.value}</address>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="separator"></div>

        <ul className="social-list">
          {userData.socials.map((social, index) => (
            <li className="social-item" key={index}>
              <a href={social.link} className="social-link">
                <ion-icon name={social.icon}></ion-icon>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
