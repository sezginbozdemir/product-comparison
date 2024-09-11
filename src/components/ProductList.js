import React, { useState } from "react";
import ProductCard from "./ProductCard";
import CompactPagination from "./CompactPagination";
import MobileFilterMenu from "./MobileFilters";
import { useFilters } from "../context/FiltersContext";
import { useIsMobile } from "../context/IsMobileContext";
import { useProducts } from "../context/ProductsContext";
import { Row, Alert, Button, Dropdown } from "react-bootstrap";

function ProductList() {
  const { products, setProducts } = useProducts();
  const { filteredProducts, currentProducts, searchTerm, searchPerformed } =
    useFilters();
  const isMobile = useIsMobile();
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState("random");
  const handleShowFilter = () => setShowFilter(true);
  const handleCloseFilter = () => setShowFilter(false);

  const handleSort = (event) => {
    const sortValue = event.target.getAttribute("value");
    setSortBy(sortValue);

    const sortedProducts = () => {
      switch (sortValue) {
        case "priceLowToHigh":
          return [...products].sort((a, b) => {
            const priceA = a.newPrice ? a.newPrice : a.productPrice;
            const priceB = b.newPrice ? b.newPrice : b.productPrice;
            return priceA - priceB;
          });
        case "priceHighToLow":
          return [...products].sort((a, b) => {
            const priceA = a.newPrice ? a.newPrice : a.productPrice;
            const priceB = b.newPrice ? b.newPrice : b.productPrice;
            return priceB - priceA;
          });
        default:
          return [...products].sort(() => Math.random() - 0.5);
      }
    };

    setProducts(sortedProducts());
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        {isMobile && (
          <Button variant="" className="mb-3" onClick={handleShowFilter}>
            Filters <i className="bi bi-funnel"></i>
          </Button>
        )}
        <Dropdown className="mb-3">
          <Dropdown.Toggle variant="">
            <i class="bi bi-filter-right"></i> Sort by
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item value="priceLowToHigh" onClick={handleSort}>
              <i class="bi bi-sort-numeric-up-alt"></i> Price: Low to High
            </Dropdown.Item>
            <Dropdown.Item value="priceHighToLow" onClick={handleSort}>
              <i class="bi bi-sort-numeric-down-alt"></i> Price: High to Low
            </Dropdown.Item>
            <Dropdown.Item value="random" onClick={handleSort}>
              <i class="bi bi-shuffle"></i> Random
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {searchPerformed && (
        <Alert
          className=""
          variant={filteredProducts.length > 0 ? "info" : "warning"}
        >
          {filteredProducts.length > 0 ? (
            <p className="m-0">
              <i className="bi bi-arrow-right-circle"></i> Showing results for:
              "{searchTerm}"
            </p>
          ) : (
            <p className="m-0">
              <i className="bi bi-ban"></i> No results found for: "{searchTerm}"
            </p>
          )}
        </Alert>
      )}
      <Row className="row row-cols-2 row-cols-sm-3 row-cols-md-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.productCode} product={product} />
        ))}
      </Row>

      <CompactPagination />

      {/* Mobile Filter Menu */}
      <MobileFilterMenu show={showFilter} onHide={handleCloseFilter} />
    </>
  );
}

export default ProductList;
