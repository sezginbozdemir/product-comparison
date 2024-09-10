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
        <Form className="p-4  bg-light" onSubmit={handleSearchMobile}>
          <InputGroup>
            <Form.Control
              type="search"
              placeholder="Search products.."
              value={pendingSearchTerm}
              onChange={(e) => setPendingSearchTerm(e.target.value)}
              className="mt-0"
              style={{ width: "87%", height: "2.7rem", borderColor: "#bfbfbf" }}
            />
            <Button
              variant="outline-secondary"
              type="submit"
              style={{
                width: "13%",
                borderColor: "#bfbfbf",
                height: "2.7rem",
                backgroundColor: "#f2f2f2",
              }}
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
