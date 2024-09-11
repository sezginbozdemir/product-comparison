// MobileMenu.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Offcanvas,
  Nav,
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "react-bootstrap";
import { useProducts } from "../context/ProductsContext";
import { useFilters } from "../context/FiltersContext";

function MobileMenu({ show, onHide, handleNavItemClick, setShowOffcanvas }) {
  const {
    setCategoryFilter,
    setBrandFilter,
    setPriceFilter,
    setCustomPriceRange,
    setActiveItem,
    availableCategories,
  } = useFilters();
  const { uniqueCategories } = useProducts();
  const navigate = useNavigate();

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
    setShowOffcanvas(false);
  };
  const splittedCategories = [
    ...new Set(
      uniqueCategories.map((category) => category.split(/\/|#|<|>/)[0])
    ),
  ];
  return (
    <Offcanvas
      className="custom-offcanvas"
      show={show}
      onHide={onHide}
      placement="start"
    >
      <Offcanvas.Header closeButton></Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="flex-column">
          <h5 className="mb-3 ml-3">Pages</h5>
          <Nav.Link
            className={"text-dark fs-5 border-top border-bottom"}
            onClick={(e) => handleNavItemClick("home", "/", e)}
          >
            <i class="bi bi-house"></i> Home
          </Nav.Link>
          <Nav.Link
            className={"text-dark fs-5  border-bottom"}
            onClick={(e) => handleNavItemClick("products", "/products", e)}
          >
            <i class="bi bi-basket"></i> Products
          </Nav.Link>
          <Nav.Link
            className={"text-dark fs-5 border-bottom"}
            onClick={(e) => handleNavItemClick("promotions", "/", e)}
          >
            <i class="bi bi-percent"></i> Deals
          </Nav.Link>
          <Nav.Link
            className={"text-dark fs-5 border-bottom"}
            onClick={(e) => handleNavItemClick("bestsellers", "/", e)}
          >
            <i class="bi bi-bookmark-star"></i> Best Sellers
          </Nav.Link>
          <Nav.Link
            className={"text-dark fs-5 border-bottom"}
            onClick={(e) => handleNavItemClick("new-releases", "/", e)}
          >
            <i class="bi bi-bag-check"></i> New Releases
          </Nav.Link>
          <hr className="mt-5 mb-5" />
          <Accordion className="mb-3" defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <AccordionHeader className="mb-3 border-bottom">
                Categories
              </AccordionHeader>
              <AccordionBody
                style={{
                  maxHeight: "30rem",
                  overflow: "scroll",
                }}
              >
                {splittedCategories.map((category, index) => (
                  <Nav.Link
                    key={index}
                    onClick={() => handleCategoryChange(category)}
                    className="text-secondary d-flex justify-content-between"
                  >
                    {category} <i class="bi bi-chevron-right"></i>
                  </Nav.Link>
                ))}
              </AccordionBody>
            </Accordion.Item>
          </Accordion>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default MobileMenu;
