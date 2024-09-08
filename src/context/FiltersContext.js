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
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);
  const [customPriceRange, setCustomPriceRange] = useState([0, 2000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const productsPerPage = 21;
  const { products } = useProducts();

  useEffect(() => {
    searchTerm ? setSearchPerformed(true) : setSearchPerformed(false);
  }, [searchTerm]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const titleMatch = product.titlu
        ? product.titlu.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const categoryMatch = categoryFilter.length
        ? categoryFilter.includes(product.categorie)
        : true;
      const brandMatch = brandFilter.length
        ? brandFilter.includes(product.brand)
        : true;
      const priceMatch = priceFilter.length
        ? priceFilter.some((range) => {
            const [min, max] = range.split("-").map(Number);
            const price = parseFloat(product["pret*"]);
            return price >= min && price <= max;
          })
        : true;
      const customPriceMatch =
        customPriceRange.length === 2
          ? (() => {
              const price = parseFloat(product["pret*"]);
              return (
                price >= customPriceRange[0] && price <= customPriceRange[1]
              );
            })()
          : true;
      return (
        titleMatch &&
        categoryMatch &&
        brandMatch &&
        priceMatch &&
        customPriceMatch
      );
    });
  }, [
    products,
    searchTerm,
    categoryFilter,
    brandFilter,
    priceFilter,
    customPriceRange,
  ]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

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
        priceFilter,
        setPriceFilter,
        customPriceRange,
        setCustomPriceRange,
        currentPage,
        setCurrentPage,
        handleSetCategoryFilter,
        filteredProducts,
        currentProducts,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
export const useFilters = () => useContext(FiltersContext);
