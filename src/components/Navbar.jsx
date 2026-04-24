import React from 'react';

const Navbar = ({ activePage, setActivePage }) => {
  const navItems = ['About', 'Resume', 'Portfolio', 'Blog', 'Contact'];

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {navItems.map((item) => (
          <li className="navbar-item" key={item}>
            <button
              className={`navbar-link ${activePage === item.toLowerCase() ? 'active' : ''}`}
              onClick={() => setActivePage(item.toLowerCase())}
              data-nav-link
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
