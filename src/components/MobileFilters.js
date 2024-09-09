// MobileFilterMenu.js
import React from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import { useFilters } from "../context/FiltersContext";
import { useProducts } from "../context/ProductsContext";

function MobileFilterMenu({ show, onHide }) {
  const {
    categoryFilter,
    setCategoryFilter,
    brandFilter,
    setBrandFilter,
    priceFilter,
    setPriceFilter,
    customPriceRange,
    setCustomPriceRange,
    setCurrentPage,
  } = useFilters();
  const { uniqueBrands, uniqueCategories } = useProducts();
  const [tempCategoryFilter, setTempCategoryFilter] =
    React.useState(categoryFilter);
  const [tempBrandFilter, setTempBrandFilter] = React.useState(brandFilter);
  const [tempPriceFilter, setTempPriceFilter] = React.useState(priceFilter);
  const [tempCustomPriceRange, setTempCustomPriceRange] =
    React.useState(customPriceRange);

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
    setPriceFilter(tempPriceFilter);
    setCustomPriceRange(tempCustomPriceRange);
    setCurrentPage(1);
    onHide();
  };

  const resetFilters = () => {
    setCategoryFilter([]);
    setBrandFilter([]);
    setPriceFilter([]);
    setCustomPriceRange([0, 2000]);
    setTempCategoryFilter([]);
    setTempBrandFilter([]);
    setTempPriceFilter([]);
    setTempCustomPriceRange([0, 2000]);
    setCurrentPage(1);
  };

  const isAnyFilterApplied =
    categoryFilter.length > 0 ||
    brandFilter.length > 0 ||
    priceFilter.length > 0 ||
    (customPriceRange &&
      (customPriceRange[0] !== 0 || customPriceRange[1] !== 2000));

  const predefinedPriceRanges = [
    { label: "Sub 50", range: "0-50", count: 4807 },
    { label: "50 - 100", range: "50-100", count: 685 },
    { label: "100 - 200", range: "100-200", count: 294 },
    { label: "200 - 500", range: "200-500", count: 54 },
    { label: "500 - 1.000", range: "500-1000", count: 6 },
    { label: "1.000 - 1.500", range: "1000-1500", count: 2 },
    { label: "1.500 - 2.000", range: "1500-2000", count: 2 },
  ];

  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filters</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {isAnyFilterApplied && (
          <Button
            variant="secondary"
            className="mb-3 text-light w-100"
            onClick={resetFilters}
          >
            Reset Filters
          </Button>
        )}
        <div className="mb-3">
          <h5 className="mb-3">Categories</h5>
          {uniqueCategories.map((category) => (
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
        <div className="mb-3">
          <h5 className="mb-3">Brands</h5>
          {uniqueBrands.map((brand) => (
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
        <div className="mb-3">
          <h5 className="mb-3">Price</h5>
          {predefinedPriceRanges.map(({ label, range, count }) => (
            <Form.Check
              key={range}
              className="mb-3"
              type="checkbox"
              label={`${label} (${count})`}
              checked={tempPriceFilter.includes(range)}
              onChange={() => handlePriceCheckboxChange(range)}
            />
          ))}
          <hr />
          <Form.Check
            className="mb-3"
            type="checkbox"
            label={"Price interval"}
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
          variant="secondary"
          className="mb-3 text-light w-100"
          onClick={saveFilters}
        >
          Save Filters
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default MobileFilterMenu;
