import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isSelectActive, setIsSelectActive] = useState(false);

  const filteredProjects = portfolioData.projects.filter(project => 
    activeCategory === 'All' || project.category === activeCategory
  );

  return (
    <article className="portfolio active" data-page="portfolio">
      <header>
        <h2 className="h2 article-title">Portfolio</h2>
      </header>

      <section className="projects">
        {/* Filter list for large screens */}
        <ul className="filter-list">
          {portfolioData.categories.map((category) => (
            <li className="filter-item" key={category}>
              <button 
                className={activeCategory === category ? 'active' : ''} 
                onClick={() => setActiveCategory(category)}
                data-filter-btn
              >
                {category}
              </button>
            </li>
          ))}
        </ul>

        {/* Custom select for small screens */}
        <div className="filter-select-box">
          <button 
            className={`filter-select ${isSelectActive ? 'active' : ''}`} 
            onClick={() => setIsSelectActive(!isSelectActive)}
            data-select
          >
            <div className="select-value" data-selecct-value>{activeCategory}</div>
            <div className="select-icon">
              <ion-icon name="chevron-down"></ion-icon>
            </div>
          </button>

          <ul className="select-list">
            {portfolioData.categories.map((category) => (
              <li className="select-item" key={category}>
                <button 
                  onClick={() => {
                    setActiveCategory(category);
                    setIsSelectActive(false);
                  }}
                  data-select-item
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ul className="project-list">
          {filteredProjects.map((project, index) => (
            <li className="project-item active" key={index} data-filter-item data-category={project.category.toLowerCase()}>
              <a href={project.link}>
                <figure className="project-img">
                  <div className="project-item-icon-box">
                    <ion-icon name="eye-outline"></ion-icon>
                  </div>
                  <img src={project.image} alt={project.title} loading="lazy" />
                </figure>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-category">{project.category}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default Portfolio;
