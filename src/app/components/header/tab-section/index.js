import React, { useEffect, useState } from 'react';
import './style.css'; // Include the updated CSS file
import { GetCategoryDetails } from '../../services';

const TabSection = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const list = await GetCategoryDetails.getAllCategorySubCategoryList();
        setCategories(list.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleCategoryHover = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleCategoryLeave = () => {
    setActiveCategory(null);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-blue tabsection-menu">
      <div className="container">
        {/* Navbar Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded={dropdownVisible}
          aria-label="Toggle navigation"
          onClick={toggleDropdown}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${dropdownVisible ? 'show' : ''}`} id="navbarNavDropdown">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="categoriesTab"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded={dropdownVisible}
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown();
                }}
              >
                Categories
              </a>
              <div className={`dropdown-menu ${dropdownVisible ? 'show' : ''}`} aria-labelledby="categoriesTab">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="dropdown-submenu"
                    onMouseEnter={() => handleCategoryHover(category.id)}
                    onMouseLeave={handleCategoryLeave}
                  >
                    <a
                      className="dropdown-item dropdown-toggle"
                      href="#"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded={activeCategory === category.id}
                    >
                      {category.name}
                    </a>
                    {category.SubCategories && category.SubCategories.length > 0 && activeCategory === category.id && (
                      <div className="dropdown-menu show">
                        {category.SubCategories.map((subCategory) => (
                          <a
                            key={subCategory.id}
                            className="dropdown-item"
                            href={`/product/catalogsearch/result?category=${subCategory.id}`}
                          >
                            {subCategory.sub_name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <a className="dropdown-item" href="https://www.youtube.com/watch?v=UAPpNfXqFCo&feature=youtu.be">How to Buy Designs (తెలుగు)</a>
                <a className="dropdown-item" href="https://www.youtube.com/watch?v=di3FWmT3Q">How to Buy Designs (ಕನ್ನಡ)</a>
                <a className="dropdown-item" href="/catalog">Catalog</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TabSection;
