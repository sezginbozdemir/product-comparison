import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useProducts } from "../context/ProductsContext";
import { useFilters } from "../context/FiltersContext";
import { useIsMobile } from "../context/IsMobileContext";
import {
  Nav,
  NavDropdown,
  Button,
  Container,
  Form,
  Navbar,
  InputGroup,
} from "react-bootstrap";
import MobileMenu from "./MobileMenu"; // Import the MobileMenu component

function Navigation() {
  const isMobile = useIsMobile();

  const {
    searchTerm,
    setSearchTerm,
    setCategoryFilter,
    setBrandFilter,
    setPriceFilter,
    setCustomPriceRange,
    setCurrentPage,
    activeItem,
    setActiveItem,
  } = useFilters();
  const { uniqueCategories } = useProducts();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const [pendingSearchTerm, setPendingSearchTerm] = useState(searchTerm);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const favoritesCount = favorites.length;

  const handleCategoryChange = (category) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setBrandFilter([]);
    setPriceFilter([]);
    setCustomPriceRange([0, 2000]);

    category ? setCategoryFilter([category]) : setCategoryFilter([]);
    setActiveItem("products");
    navigate("/products");
  };

  const handleNavItemClick = (item, path, e) => {
    e.preventDefault();
    setShowOffcanvas(false);

    window.scrollY === 0
      ? setActiveItem(item) &&
        navigate(path) &&
        setCurrentPage(1) &&
        setSearchTerm("")
      : window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

    setTimeout(() => {
      setActiveItem(item);
      setCurrentPage(1);
      navigate(path);
      setSearchTerm("");
    }, 500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(pendingSearchTerm);
    setActiveItem("products");
    navigate("/products");
    setCurrentPage(1);
    setPendingSearchTerm("");
  };

  return (
    <>
      <Navbar
        expand="lg"
        className={`bg-light ${isMobile ? "sticky-top" : ""}`}
      >
        <Container>
          <Navbar.Brand>
            {isMobile && (
              <Button
                className="border-0 mr-3 ml-3"
                variant=""
                onClick={() => setShowOffcanvas(true)}
              >
                <i className="bi bi-list fs-1"></i>
              </Button>
            )}
            <img
              src="smartshop.jpeg"
              onClick={(e) => handleNavItemClick("home", "/", e)}
              alt="Logo"
              style={{ width: "150px", height: "auto", cursor: "pointer" }}
            />
          </Navbar.Brand>
          {!isMobile && (
            <Form onSubmit={handleSearch}>
              <InputGroup style={{ width: "30rem", marginLeft: "20rem" }}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  value={pendingSearchTerm}
                  onChange={(e) => setPendingSearchTerm(e.target.value)}
                  className="mt-0"
                  style={{ width: "90%" }}
                />
                <Button
                  variant="outline-secondary"
                  type="submit"
                  style={{ width: "10%", borderColor: "#dee2e6" }}
                >
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Form>
          )}
          <Nav>
            <Nav.Link
              className={`mr-3 ${
                activeItem === "favorites" ? "text-danger" : "text-secondary"
              }`}
              onClick={(e) => handleNavItemClick("favorites", "/favorites", e)}
            >
              <i className="fas fa-heart"></i> Favorites ({favoritesCount})
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {!isMobile && (
        <Navbar
          sticky="top"
          expand="lg"
          style={{ background: "linear-gradient(to right, #ff5f6d, #ffc371)" }}
        >
          <Container>
            <Nav>
              <NavDropdown
                className="custom-dropdown"
                title="Categories"
                id="basic-nav-dropdown"
              >
                {uniqueCategories.map((category, index) => (
                  <NavDropdown.Item
                    key={index}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <Nav.Link
                className={`text-light ${
                  activeItem === "home" ? "border-bottom border-white" : ""
                }`}
                onClick={(e) => handleNavItemClick("home", "/", e)}
              >
                Home
              </Nav.Link>
              <Nav.Link
                className={`text-light ${
                  activeItem === "products" ? "border-bottom border-white" : ""
                }`}
                onClick={(e) => handleNavItemClick("products", "/products", e)}
              >
                Products
              </Nav.Link>
              <Nav.Link
                className={`text-light ${
                  activeItem === "promotions"
                    ? "border-bottom border-white"
                    : ""
                }`}
                onClick={(e) => handleNavItemClick("promotions", "/", e)}
              >
                Promotions
              </Nav.Link>
              <Nav.Link
                className={`text-light ${
                  activeItem === "coupons" ? "border-bottom border-white" : ""
                }`}
                onClick={(e) => handleNavItemClick("coupons", "/", e)}
              >
                Coupons
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      )}
      <MobileMenu
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        handleNavItemClick={handleNavItemClick}
        setShowOffcanvas={setShowOffcanvas}
      />
    </>
  );
}

export default Navigation;
