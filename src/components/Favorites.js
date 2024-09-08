import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import ProductCard from "./ProductCard";

function Favorites() {
  const { favorites } = useFavorites();
  return (
    <div className="container mt-4">
      <h1 className="text-center my-4">Favorite Products</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
        {favorites.length > 0 ? (
          favorites.map((product) => (
            <ProductCard key={product["id produs"]} product={product} />
          ))
        ) : (
          <div className="col">
            <p className="text-center">No favorite products found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
