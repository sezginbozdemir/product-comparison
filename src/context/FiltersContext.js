import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useProducts } from "./ProductsContext";

const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [activeItem, setActiveItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);
  const [sellerFilter, setSellerFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);
  const [customPriceRange, setCustomPriceRange] = useState([0, 2000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const productsPerPage = 16;
  const { products } = useProducts();

  useEffect(() => {
    searchTerm ? setSearchPerformed(true) : setSearchPerformed(false);
  }, [searchTerm]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const titleMatch = product.productName
        ? product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const categoryMatch = categoryFilter.length
        ? categoryFilter.some(
            (filterCategory) =>
              filterCategory &&
              product.category &&
              product.category
                .toLowerCase()
                .includes(filterCategory.toLowerCase())
          )
        : true;
      const brandMatch = brandFilter.length
        ? brandFilter.includes(product.brand)
        : true;
      const sellerMatch = sellerFilter.length
        ? sellerFilter.includes(product.seller)
        : true;
      const priceMatch = priceFilter.length
        ? priceFilter.some((range) => {
            const [min, max] = range.split("-").map(Number);
            const price = parseFloat(product.productPrice);
            return price >= min && price <= max;
          })
        : true;
      const customPriceMatch =
        customPriceRange.length === 2
          ? (() => {
              const price = parseFloat(product.productPrice);
              return (
                price >= customPriceRange[0] && price <= customPriceRange[1]
              );
            })()
          : true;
      return (
        titleMatch &&
        categoryMatch &&
        brandMatch &&
        sellerMatch &&
        priceMatch &&
        customPriceMatch
      );
    });
  }, [
    products,
    searchTerm,
    categoryFilter,
    brandFilter,
    sellerFilter,
    priceFilter,
    customPriceRange,
  ]);
  const availableBrands = useMemo(() => {
    const brands = new Set();

    filteredProducts.forEach((product) => {
      brands.add(product.brand);
    });

    return Array.from(brands);
  }, [filteredProducts]);
  const availableSellers = useMemo(() => {
    const sellers = new Set();

    filteredProducts.forEach((product) => {
      sellers.add(product.seller);
    });

    return Array.from(sellers);
  }, [filteredProducts]);

  const availableCategories = useMemo(() => {
    const categories = new Set();

    filteredProducts.forEach((product) => {
      categories.add(product.category);
    });

    return Array.from(categories);
  }, [filteredProducts]);

  useEffect(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    setCurrentProducts(
      filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    );
  }, [filteredProducts, currentPage, productsPerPage]);

  const handleSetCategoryFilter = (newFilter) => {
    Array.isArray(newFilter)
      ? setCategoryFilter(newFilter)
      : typeof newFilter === "string" && newFilter
      ? setCategoryFilter([newFilter])
      : setCategoryFilter([]);
  };

  return (
    <FiltersContext.Provider
      value={{
        searchPerformed,
        setSearchPerformed,
        searchTerm,
        setSearchTerm,
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
        currentPage,
        setCurrentPage,
        handleSetCategoryFilter,
        filteredProducts,
        currentProducts,
        setCurrentProducts,
        productsPerPage,
        activeItem,
        setActiveItem,
        availableBrands,
        availableCategories,
        availableSellers,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
export const useFilters = () => useContext(FiltersContext);
