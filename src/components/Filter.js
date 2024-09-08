import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS
import { Collapse } from "react-bootstrap"; // Import Collapse from react-bootstrap
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import { useProducts } from "../context/ProductsContext";
import { useFilters } from "../context/FiltersContext";

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

function Filter() {
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
  const [openFilter, setOpenFilter] = useState(null);
  const [tempCategoryFilter, setTempCategoryFilter] = useState(categoryFilter);
  const [tempBrandFilter, setTempBrandFilter] = useState(brandFilter);
  const [tempPriceFilter, setTempPriceFilter] = useState(priceFilter);
  const [tempCustomPriceRange, setTempCustomPriceRange] =
    useState(customPriceRange);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 992;
      setIsMobile(isMobileView);
      if (!isMobileView) {
        setOpenFilter(null);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

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
    setCurrentPage(1); // Reset pagination to page 1
    if (isMobile) setOpenFilter(null);
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
    setCurrentPage(1); // Reset pagination to page 1
    if (isMobile) setOpenFilter(null);
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
    <>
      {/* Mobile Filters */}
      <div className="d-lg-none filter-bar">
        {isAnyFilterApplied && (
          <div className="filter-item" onClick={resetFilters}>
            <span>Resetează Filtrele</span>
          </div>
        )}
        <div
          className="filter-item"
          onClick={() =>
            setOpenFilter(openFilter === "categories" ? null : "categories")
          }
        >
          <div
            className={`checkbox ${categoryFilter.length > 0 ? "checked" : ""}`}
          >
            {categoryFilter.length > 0 && <i className="fas fa-check"></i>}
          </div>
          <span>Categories</span>
        </div>
        <div
          className="filter-item"
          onClick={() =>
            setOpenFilter(openFilter === "brands" ? null : "brands")
          }
        >
          <div
            className={`checkbox ${brandFilter.length > 0 ? "checked" : ""}`}
          >
            {brandFilter.length > 0 && <i className="fas fa-check"></i>}
          </div>
          <span>Brands</span>
        </div>
        <div
          className="filter-item"
          onClick={() => setOpenFilter(openFilter === "price" ? null : "price")}
        >
          <div
            className={`checkbox ${
              priceFilter.length > 0 ||
              customPriceRange[0] !== 0 ||
              customPriceRange[1] !== 2000
                ? "checked"
                : ""
            }`}
          >
            {(priceFilter.length > 0 ||
              customPriceRange[0] !== 0 ||
              customPriceRange[1] !== 2000) && <i className="fas fa-check"></i>}
          </div>
          <span>Price</span>
        </div>
      </div>

      <div className="d-lg-none">
        <Collapse in={openFilter === "categories"}>
          <div className="p-3">
            {uniqueCategories.map((category, index) => (
              <div
                key={index}
                className={`filter-item ${
                  tempCategoryFilter.includes(category) ? "active" : ""
                }`}
                onClick={() => handleCategoryChange(category)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <i
                  className={`fas ${
                    tempCategoryFilter.includes(category)
                      ? "fa-check"
                      : "fa-angle-double-right"
                  } mr-2`}
                ></i>
                {capitalize(category)}
              </div>
            ))}
            <button className="btn btn-primary mt-3" onClick={saveFilters}>
              Salvează
            </button>
          </div>
        </Collapse>

        <Collapse in={openFilter === "brands"}>
          <div className="p-3">
            {uniqueBrands.map((brand, index) => (
              <div
                key={index}
                className={`filter-item ${
                  tempBrandFilter.includes(brand) ? "active" : ""
                }`}
                onClick={() => handleBrandChange(brand)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <i
                  className={`fas ${
                    tempBrandFilter.includes(brand)
                      ? "fa-check"
                      : "fa-angle-double-right"
                  } mr-2`}
                ></i>
                {capitalize(brand)}
              </div>
            ))}
            <button className="btn btn-primary mt-3" onClick={saveFilters}>
              Salvează
            </button>
          </div>
        </Collapse>

        <Collapse in={openFilter === "price"}>
          <div className="p-3">
            {predefinedPriceRanges.map(({ label, range, count }) => (
              <div key={range} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`price-${range}`}
                  checked={tempPriceFilter.includes(range)}
                  onChange={() => handlePriceCheckboxChange(range)}
                />
                <label className="form-check-label" htmlFor={`price-${range}`}>
                  {label} ({count})
                </label>
              </div>
            ))}
            <hr />
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="custom-price-range"
                checked={
                  tempCustomPriceRange && tempCustomPriceRange.length > 0
                }
                onChange={() =>
                  setTempCustomPriceRange(
                    tempCustomPriceRange && tempCustomPriceRange.length > 0
                      ? []
                      : [0, 2000]
                  )
                }
              />
              <label className="form-check-label" htmlFor="custom-price-range">
                Interval pret
              </label>
            </div>
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
                  <input
                    type="number"
                    value={tempCustomPriceRange[0]}
                    onChange={(e) =>
                      handleSliderChange([
                        Number(e.target.value),
                        tempCustomPriceRange[1],
                      ])
                    }
                    style={{
                      width: "45%",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={tempCustomPriceRange[1]}
                    onChange={(e) =>
                      handleSliderChange([
                        tempCustomPriceRange[0],
                        Number(e.target.value),
                      ])
                    }
                    style={{
                      width: "45%",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                  />
                </div>
              </div>
            )}
            <button className="btn btn-primary mt-3" onClick={saveFilters}>
              Salvează
            </button>
          </div>
        </Collapse>
      </div>

      {/* Desktop Filters */}
      <div className="d-none d-lg-block">
        <div className="mb-4 p-3">
          {isAnyFilterApplied && (
            <div className="text-right mb-3">
              <button className="btn btn-primary" onClick={resetFilters}>
                Resetează Filtrele
              </button>
            </div>
          )}
          {/* Category Filter */}
          <div className="mb-3">
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer" }}
            >
              <h5 className="mb-0">Categories</h5>
            </div>
            <Collapse in={openFilter === "categories" || !isMobile}>
              <div>
                {uniqueCategories.map((category, index) => (
                  <div
                    key={index}
                    className={`filter-item ${
                      tempCategoryFilter.includes(category) ? "active" : ""
                    }`}
                    onClick={() => handleCategoryChange(category)}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <i
                      className={`fas ${
                        tempCategoryFilter.includes(category)
                          ? "fa-check"
                          : "fa-angle-double-right"
                      } mr-2`}
                    ></i>
                    {capitalize(category)}
                  </div>
                ))}
                <button className="btn btn-primary mt-3" onClick={saveFilters}>
                  Salvează
                </button>
              </div>
            </Collapse>
          </div>

          {/* Brand Filter */}
          <div className="mb-3">
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer" }}
            >
              <h5 className="mb-0">Brands</h5>
            </div>
            <Collapse in={openFilter === "brands" || !isMobile}>
              <div>
                {uniqueBrands.map((brand, index) => (
                  <div
                    key={index}
                    className={`filter-item ${
                      tempBrandFilter.includes(brand) ? "active" : ""
                    }`}
                    onClick={() => handleBrandChange(brand)}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <i
                      className={`fas ${
                        tempBrandFilter.includes(brand)
                          ? "fa-check"
                          : "fa-angle-double-right"
                      } mr-2`}
                    ></i>
                    {capitalize(brand)}
                  </div>
                ))}
                <button className="btn btn-primary mt-3" onClick={saveFilters}>
                  Salvează
                </button>
              </div>
            </Collapse>
          </div>

          {/* Price Filter */}
          <div className="mb-3">
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ cursor: "pointer" }}
            >
              <h5 className="mb-0">Price</h5>
            </div>
            <Collapse in={openFilter === "price" || !isMobile}>
              <div>
                {predefinedPriceRanges.map(({ label, range, count }) => (
                  <div key={range} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`price-${range}`}
                      checked={tempPriceFilter.includes(range)}
                      onChange={() => handlePriceCheckboxChange(range)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`price-${range}`}
                    >
                      {label} ({count})
                    </label>
                  </div>
                ))}
                <hr />
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="custom-price-range"
                    checked={
                      tempCustomPriceRange && tempCustomPriceRange.length > 0
                    }
                    onChange={() =>
                      setTempCustomPriceRange(
                        tempCustomPriceRange && tempCustomPriceRange.length > 0
                          ? []
                          : [0, 2000]
                      )
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="custom-price-range"
                  >
                    Interval pret
                  </label>
                </div>
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
                      <input
                        type="number"
                        value={tempCustomPriceRange[0]}
                        onChange={(e) =>
                          handleSliderChange([
                            Number(e.target.value),
                            tempCustomPriceRange[1],
                          ])
                        }
                        style={{
                          width: "45%",
                          borderRadius: "5px",
                          padding: "5px",
                        }}
                      />
                      <span>-</span>
                      <input
                        type="number"
                        value={tempCustomPriceRange[1]}
                        onChange={(e) =>
                          handleSliderChange([
                            tempCustomPriceRange[0],
                            Number(e.target.value),
                          ])
                        }
                        style={{
                          width: "45%",
                          borderRadius: "5px",
                          padding: "5px",
                        }}
                      />
                    </div>
                  </div>
                )}
                <button className="btn btn-primary mt-3" onClick={saveFilters}>
                  Salvează
                </button>
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
