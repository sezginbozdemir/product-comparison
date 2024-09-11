import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import ProductCard from "./ProductCard";
import Nothing from "../utils/nothing";

function Favorites() {
  const { favorites } = useFavorites();
  return (
    <div className="container">
      <p className="text-center mb-4 fs-2">Favorite Products</p>
      {favorites.length > 0 ? (
        <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
          {favorites.map((product) => (
            <ProductCard key={product.productCode} product={product} />
          ))}
        </div>
      ) : (
        Nothing()
      )}
    </div>
  );
}

export default Favorites;
