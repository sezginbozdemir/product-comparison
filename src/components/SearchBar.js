import React from "react";
import { useFilters } from "../context/FiltersContext";

function SearchBar() {
  const { searchTerm, setSearchTerm } = useFilters();
  return (
    <input
      className="form-control mr-2"
      type="search"
      placeholder="Search"
      aria-label="Search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchBar;
