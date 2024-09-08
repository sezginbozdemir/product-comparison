import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import SearchBar from "./SearchBar"; // Import the SearchBar component
import { useProducts } from "../context/ProductsContext";
import { useFilters } from "../context/FiltersContext";

function Navbar() {
  const {
    searchTerm,
    setSearchTerm,
    setCategoryFilter,
    setBrandFilter,
    setPriceFilter,
    setCustomPriceRange,
  } = useFilters();
  const { uniqueCategories } = useProducts();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to get the current pathname
  const [activeItem, setActiveItem] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [pendingSearchTerm, setPendingSearchTerm] = useState(searchTerm); // State to hold the pending search term
  const favoritesCount = favorites.length;
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCategoryChange = (category) => {
    // Reset all filters
    setBrandFilter([]);
    setPriceFilter([]);
    setCustomPriceRange([0, 2000]);

    // Set the chosen category filter and navigate to the products page

    category ? setCategoryFilter([category]) : setCategoryFilter([]);
    setActiveItem(category); // Set active item
    navigate("/products");
  };

  const handleNavItemClick = (item) => {
    setActiveItem(item);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(pendingSearchTerm); // Update the search term only when form is submitted
    navigate("/products"); // Navigate to the products page to show results
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-navbar">
        <div className="container">
          <Link
            className={`navbar-brand ${
              location.pathname === "/" ? "active" : ""
            }`}
            to="/"
          >
            <img src="smartshop.jpeg" alt="Logo" className="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {!isMobile && (
              <form
                className="form-inline mx-auto my-2 my-lg-0"
                onSubmit={handleSearch}
              >
                <input
                  className="form-control mr-sm-2 search-bar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={pendingSearchTerm}
                  onChange={(e) => setPendingSearchTerm(e.target.value)} // Update pending search term
                />
                <button className="btn search-button" type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            )}
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    activeItem === "favorites" ? "active" : ""
                  }`}
                  to="/favorites"
                  onClick={() => handleNavItemClick("favorites")}
                >
                  <i className="fas fa-heart"></i> Favorites ({favoritesCount})
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary second-nav">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#secondNavbarNav"
            aria-controls="secondNavbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="secondNavbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a
                  className={`nav-link dropdown-toggle ${
                    activeItem === "categories" ? "active" : ""
                  }`}
                  href="#"
                  id="categoriesDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={() => handleNavItemClick("categories")}
                >
                  <i className="fas fa-bars"></i> Categories
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="categoriesDropdown"
                >
                  {uniqueCategories.map((category, index) => (
                    <button
                      key={index}
                      className={`dropdown-item ${
                        activeItem === category ? "active" : ""
                      }`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  to="/"
                  onClick={() => handleNavItemClick("home")}
                >
                  Acasa
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/products" ? "active" : ""
                  }`}
                  to="/products"
                  onClick={() => handleNavItemClick("products")}
                >
                  Toate produsele
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeItem === "#" ? "active" : ""}`}
                  to="/"
                  onClick={() => handleNavItemClick("home")}
                >
                  Cupoane
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeItem === "#" ? "active" : ""}`}
                  to="/"
                  onClick={() => handleNavItemClick("home")}
                >
                  Promotii
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {isMobile && (
        <div className="mobile-search-bar">
          <SearchBar
            searchTerm={pendingSearchTerm}
            setSearchTerm={setPendingSearchTerm}
          />
        </div>
      )}
    </div>
  );
}

export default Navbar;
