import React from "react";
import ProductCard from "./ProductCard";
import CompactPagination from "./CompactPagination";
import { useFilters } from "../context/FiltersContext";

function ProductList() {
  const { filteredProducts, currentProducts, searchTerm, searchPerformed } =
    useFilters();

  return (
    <div>
      {searchPerformed && (
        <div className="search-results-info">
          {filteredProducts.length > 0 ? (
            <p>Showing results for: "{searchTerm}"</p>
          ) : (
            <p>No results found for: "{searchTerm}"</p>
          )}
        </div>
      )}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
        {currentProducts.map((product) => (
          <ProductCard key={product["id produs"]} product={product} />
        ))}
      </div>

      <CompactPagination />
    </div>
  );
}

export default ProductList;
