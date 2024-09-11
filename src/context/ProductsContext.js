import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchCsvData } from "../utils/fetchCsvData";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const urls = [
        "/files/bricolaj.csv",
        "/files/hiris.csv",
        "/files/it-galaxy.csv",
        "/files/mindblower.csv",
        "/files/nichiduta.csv",
        "/files/perfect-bijoux.csv",
        "/files/sevensins.csv",
        "/files/feed-mixed.csv",
      ];

      try {
        const allData = await Promise.all(
          urls.map(async (url) => {
            const data = await fetchCsvData(url);
            return data;
          })
        );

        const combinedData = allData.flat();

        setProducts(combinedData);
      } catch (error) {
        console.error("Error fetching CSV files", error);
      }
    }

    loadProducts();
  }, []);

  const uniqueCategories = [
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  const uniqueBrands = [
    ...new Set(products.map((product) => product.brand).filter(Boolean)),
  ];

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        uniqueCategories,
        uniqueBrands,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
