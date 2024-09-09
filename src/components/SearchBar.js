import React, { useState } from "react";
import { useFilters } from "../context/FiltersContext";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../context/IsMobileContext";

function SearchBar() {
  const isMobile = useIsMobile();
  const [pendingSearchTerm, setPendingSearchTerm] = useState("");
  const { setSearchTerm, setActiveItem, setCurrentPage } = useFilters();
  const navigate = useNavigate();

  const handleSearchMobile = (e) => {
    e.preventDefault();
    setSearchTerm(pendingSearchTerm);
    setActiveItem("products");
    navigate("/products");
    setCurrentPage(1);
    setPendingSearchTerm("");
  };

  return (
    <>
      {isMobile && (
        <Form className="p-3" onSubmit={handleSearchMobile}>
          <InputGroup size="lg">
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
    </>
  );
}

export default SearchBar;
