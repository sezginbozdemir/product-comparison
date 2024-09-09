import React from "react";
import { useFilters } from "../context/FiltersContext";
import { Button, ButtonGroup } from "react-bootstrap";

const CompactPagination = () => {
  const { currentPage, setCurrentPage, productsPerPage, filteredProducts } =
    useFilters();
  const pageNumbers = [];
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const maxPageNumbersToShow = 4;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  let startPage = Math.max(
    currentPage - Math.floor(maxPageNumbersToShow / 2),
    1
  );
  let endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);

  if (endPage - startPage < maxPageNumbersToShow - 1) {
    startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="d-flex justify-content-center mb-5 mt-4">
      <ButtonGroup>
        {currentPage > 1 && (
          <Button
            onClick={() => paginate(currentPage - 1)}
            variant="outline-secondary"
          >
            <i className="bi bi-chevron-left"></i>
          </Button>
        )}
        {startPage > 1 && (
          <>
            <Button onClick={() => paginate(1)} variant="outline-secondary">
              1
            </Button>
            {startPage > 2 && <Button variant="outline-secondary">...</Button>}
          </>
        )}
        {pageNumbers.map((num) => (
          <Button
            key={num}
            onClick={() => paginate(num)}
            variant={currentPage === num ? "secondary" : "outline-secondary"}
          >
            {num}
          </Button>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <Button variant="outline-secondary">...</Button>
            )}
            <Button
              onClick={() => paginate(totalPages)}
              variant="outline-secondary"
            >
              {totalPages}
            </Button>
          </>
        )}
        {currentPage < totalPages && (
          <Button
            onClick={() => paginate(currentPage + 1)}
            variant="outline-secondary"
          >
            <i className="bi bi-chevron-right"></i>
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
};

export default CompactPagination;
