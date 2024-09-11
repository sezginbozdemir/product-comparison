import React, { useState } from "react";
import ProductCard from "./ProductCard";
import CompactPagination from "./CompactPagination";
import MobileFilterMenu from "./MobileFilters";
import { useFilters } from "../context/FiltersContext";
import { useIsMobile } from "../context/IsMobileContext";
import { Row, Alert, Button } from "react-bootstrap";

function ProductList() {
  const { filteredProducts, currentProducts, searchTerm, searchPerformed } =
    useFilters();
  const isMobile = useIsMobile();
  const [showFilter, setShowFilter] = useState(false);
  const handleShowFilter = () => setShowFilter(true);
  const handleCloseFilter = () => setShowFilter(false);

  return (
    <>
      {isMobile && (
        <Button variant="" className="mb-3" onClick={handleShowFilter}>
          Filters <i className="bi bi-funnel"></i>
        </Button>
      )}

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
