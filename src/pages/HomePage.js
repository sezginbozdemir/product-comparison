import React from "react";
import Sellers from "./Sellers";
import ProductCarousel from "../components/ProductCarousel";
import Objective from "../components/Objective";
import { useFilters } from "../context/FiltersContext";
function HomePage() {
  const { filteredProducts } = useFilters();
  const carousels = [
    { title: "Electronics", filters: ["electronic", "electric"] },
    { title: "Fashion", filters: ["trico", "boxer"] },
    { title: "Home&Garden", filters: ["home", "acasa", "gradina"] },
    { title: "Toys", filters: ["jucar"] },
    { title: "Furnitures", filters: ["mobilier"] },
    { title: "Children", filters: ["copi", "bebe"] },
    { title: "Tools", filters: ["scule"] },
    { title: "PC", filters: ["pc", "laptop", "monitor"] },
  ];
  return (
    <div>
      <h1 className="text-center">Welcome to ShopSmart</h1>
      <p className="text-center">Your one-stop solution for smart shopping!</p>
      <Objective />
      {carousels.map(({ title, filters }) => (
        <ProductCarousel
          key={title}
          products={filteredProducts}
          filters={filters}
          title={title}
        />
      ))}
      <Sellers />
    </div>
  );
}

export default HomePage;
