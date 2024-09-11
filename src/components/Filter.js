import React, { useState } from "react";
import { useFilters } from "../context/FiltersContext";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import { Button, Form } from "react-bootstrap";

function Filter() {
  const {
    categoryFilter,
    setCategoryFilter,
    brandFilter,
    setBrandFilter,
    sellerFilter,
    setSellerFilter,
    priceFilter,
    setPriceFilter,
    customPriceRange,
    setCustomPriceRange,
    setCurrentPage,
    availableBrands,
    availableCategories,
    availableSellers,
  } = useFilters();
  const [tempCategoryFilter, setTempCategoryFilter] = useState(categoryFilter);
  const [tempBrandFilter, setTempBrandFilter] = useState(brandFilter);
  const [tempSellerFilter, setTempSellerFilter] = useState(sellerFilter);
  const [tempPriceFilter, setTempPriceFilter] = useState(priceFilter);
  const [tempCustomPriceRange, setTempCustomPriceRange] =
    useState(customPriceRange);

  const [categorySearch, setCategorySearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const { Handle } = Slider;

  const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  };

  const handleCategoryChange = (category) => {
    setTempCategoryFilter((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand) => {
    setTempBrandFilter((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand]
    );
  };
  const handleSellerChange = (seller) => {
    setTempSellerFilter((prev) =>
      prev.includes(seller)
        ? prev.filter((item) => item !== seller)
        : [...prev, seller]
    );
  };

  const handlePriceCheckboxChange = (range) => {
    setTempPriceFilter((prev) =>
      prev.includes(range)
        ? prev.filter((item) => item !== range)
        : [...prev, range]
    );
  };

  const handleSliderChange = (value) => {
    setTempCustomPriceRange(value);
  };

  const saveFilters = () => {
    setCategoryFilter(tempCategoryFilter);
    setBrandFilter(tempBrandFilter);
    setSellerFilter(tempSellerFilter);
    setPriceFilter(tempPriceFilter);
    setCustomPriceRange(tempCustomPriceRange);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setCategoryFilter([]);
    setBrandFilter([]);
    setSellerFilter([]);
    setPriceFilter([]);
    setCustomPriceRange([0, 2000]);
    setTempCategoryFilter([]);
    setTempBrandFilter([]);
    setTempSellerFilter([]);
    setTempPriceFilter([]);
    setTempCustomPriceRange([0, 2000]);
    setCurrentPage(1);
  };

  const isAnyFilterApplied =
    categoryFilter.length > 0 ||
    brandFilter.length > 0 ||
    sellerFilter.length > 0 ||
    priceFilter.length > 0 ||
    (customPriceRange &&
      (customPriceRange[0] !== 0 || customPriceRange[1] !== 2000));

  const predefinedPriceRanges = [
    { label: " < 50", range: "0-50" },
    { label: "50 - 100", range: "50-100" },
    { label: "100 - 200", range: "100-200" },
    { label: "200 - 500", range: "200-500" },
    { label: "500 - 1.000", range: "500-1000" },
    { label: "1.000 - 1.500", range: "1000-1500" },
    { label: "1.500 - 2.000", range: "1500-2000" },
  ];

  const splittedCategories = [
    ...new Set(
      availableCategories.map((category) => category.split(/\/|#|<|>/)[0])
    ),
  ];
  const searchedCategories = splittedCategories.filter((category) =>
    category.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const searchedBrands = availableBrands.filter((brand) =>
    brand.toLowerCase().includes(brandSearch.toLocaleLowerCase())
  );
  return (
    <>
      <div className="d-none d-lg-flex p-1 flex-column">
        {isAnyFilterApplied && (
          <Button
            variant=""
            style={{
              backgroundColor: "#e6e6e6",
            }}
            className="mb-3"
            onClick={resetFilters}
          >
            Reset Filters
          </Button>
        )}
        {/* Category Filter */}
        <div className="mb-3">
          <h5 className="mb-3">Categories</h5>
          <Form.Control
            type="text"
            className="mb-3"
            placeholder="Search categories.."
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
          ></Form.Control>
          <div style={{ maxHeight: "20rem", overflowX: "hidden" }}>
            {searchedCategories.map((category) => (
              <div
                className={`p-2 ${
                  tempCategoryFilter.includes(category) ? "text-primary" : ""
                }`}
                onClick={() => handleCategoryChange(category)}
                style={{ cursor: "pointer" }}
              >
                <i
                  className={`bi ${
                    tempCategoryFilter.includes(category)
                      ? "bi-check-lg"
                      : "bi-chevron-double-right"
                  } mr-2`}
                ></i>
                {capitalize(category)}
              </div>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div className="mb-3">
          <h5 className="mb-3">Brands</h5>
          <Form.Control
            type="text"
            className="mb-3"
            placeholder="Search brands.."
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
          ></Form.Control>
          <div style={{ maxHeight: "20rem", overflowX: "hidden" }}>
            {searchedBrands.map((brand) => (
              <div
                className={`p-2 ${
                  tempBrandFilter.includes(brand) ? "text-primary" : ""
                }`}
                onClick={() => handleBrandChange(brand)}
                style={{ cursor: "pointer" }}
              >
                <i
                  className={`bi ${
                    tempBrandFilter.includes(brand)
                      ? "bi-check-lg"
                      : "bi-chevron-double-right"
                  } mr-2`}
                ></i>
                {capitalize(brand)}
              </div>
            ))}
          </div>
        </div>
        {/* Seller Filter */}
        <div className="mb-3">
          <h5 className="mb-3">Sellers</h5>
          <div style={{ maxHeight: "20rem", overflowX: "hidden" }}>
            {availableSellers.map((seller) => (
              <div
                className={`p-2 ${
                  tempSellerFilter.includes(seller) ? "text-primary" : ""
                }`}
                onClick={() => handleSellerChange(seller)}
                style={{ cursor: "pointer" }}
              >
                <i
                  className={`bi ${
                    tempSellerFilter.includes(seller)
                      ? "bi-check-lg"
                      : "bi-chevron-double-right"
                  } mr-2`}
                ></i>
                {capitalize(seller)}
              </div>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="mb-3">
          <h5 className="mb-3">Price</h5>
          {predefinedPriceRanges.map(({ label, range }) => (
            <Form.Check
              key={range}
              className="mb-3"
              type="checkbox"
              label={`${label}`}
              checked={tempPriceFilter.includes(range)}
              onChange={() => handlePriceCheckboxChange(range)}
            />
          ))}
          <hr />
          <Form.Check
            className="mb-3"
            type="checkbox"
            label={"Price Range"}
            checked={tempCustomPriceRange && tempCustomPriceRange.length > 0}
            onChange={() =>
              setTempCustomPriceRange(
                tempCustomPriceRange && tempCustomPriceRange.length > 0
                  ? []
                  : [0, 2000]
              )
            }
          />
          {tempCustomPriceRange && tempCustomPriceRange.length > 0 && (
            <div>
              <Slider
                range
                min={0}
                max={2000}
                defaultValue={[0, 2000]}
                handle={handle}
                value={tempCustomPriceRange}
                onChange={handleSliderChange}
              />
              <div className="d-flex justify-content-between mt-2">
                <Form.Control
                  type="number"
                  value={tempCustomPriceRange[0]}
                  onChange={(e) =>
                    handleSliderChange([
                      Number(e.target.value),
                      tempCustomPriceRange[1],
                    ])
                  }
                />
                <p className="mt-3 m-1">-</p>
                <Form.Control
                  type="number"
                  value={tempCustomPriceRange[1]}
                  onChange={(e) =>
                    handleSliderChange([
                      tempCustomPriceRange[0],
                      Number(e.target.value),
                    ])
                  }
                />
              </div>
            </div>
          )}
        </div>
        <Button
          variant=""
          style={{
            backgroundColor: "#e6e6e6",
          }}
          className="mb-3"
          onClick={saveFilters}
        >
          Save Filters
        </Button>
      </div>
    </>
  );
}

export default Filter;
