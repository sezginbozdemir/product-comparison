import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS
import { useFilters } from "../context/FiltersContext";

const CompactPagination = () => {
  const { currentPage, setCurrentPage, productsPerPage, filteredProducts } =
    useFilters();
  const pageNumbers = [];
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const maxPageNumbersToShow = 5; // Adjust this number to show more/less pages

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    <nav>
      <ul className="pagination justify-content-center">
        {currentPage > 1 && (
          <li className="page-item">
            <button
              onClick={() => paginate(currentPage - 1)}
              className="page-link"
              aria-label="Previous"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
          </li>
        )}
        {startPage > 1 && (
          <>
            <li className="page-item">
              <button onClick={() => paginate(1)} className="page-link">
                1
              </button>
            </li>
            {startPage > 2 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
          </>
        )}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
            <li className="page-item">
              <button
                onClick={() => paginate(totalPages)}
                className="page-link"
              >
                {totalPages}
              </button>
            </li>
          </>
        )}
        {currentPage < totalPages && (
          <li className="page-item">
            <button
              onClick={() => paginate(currentPage + 1)}
              className="page-link"
              aria-label="Next"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default CompactPagination;
