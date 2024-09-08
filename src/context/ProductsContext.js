import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchCsvData } from "../utils/fetchCsvData";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function loadProducts() {
      try {
        const targetUrl =
          "https://emrengros.ro/getfile.php?filename=2performant-api.csv";
        const data = await fetchCsvData(targetUrl);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching CSV file", error);
      }
    }
    loadProducts();
  }, []);

  const uniqueCategories = [
    ...new Set(products.map((product) => product.categorie).filter(Boolean)),
  ];

  const uniqueBrands = [
    ...new Set(products.map((product) => product.brand).filter(Boolean)),
  ];

  return (
    <ProductsContext.Provider
      value={{ products, uniqueCategories, uniqueBrands }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export const useProducts = () => useContext(ProductsContext);
