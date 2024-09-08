import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS
import { useFavorites } from "../context/FavoritesContext";

function ProductCard({ product }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent click event from triggering the card link
    e.preventDefault(); // Prevent the default anchor behavior
    isFavorite(product) ? removeFavorite(product) : addFavorite(product);
  };

  return (
    <div className="col mb-4">
      <a href={product.url} className="card-link">
        <div className="card h-100 product-card">
          <img
            src={product["urluri imagine"]}
            className="card-img-top"
            alt={product.titlu}
            style={{
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
            }}
          />
          <div className="card-body text-center">
            <h5 className="card-title h6 truncate-text">{product.titlu}</h5>
            <p className="card-text small text-muted truncate-text">
              {product.brand}
            </p>
            <p className="card-text font-weight-bold truncate-text">
              {product["pret*"]} lei
            </p>
            <div className="d-flex justify-content-center">
              <a
                href={product.url}
                className="btn btn-sm btn-primary mr-2 details-button"
              >
                Detalii
              </a>
              <button
                className={`btn btn-sm ${
                  isFavorite(product) ? "btn-danger" : "btn-outline-primary"
                } favorite-button`}
                onClick={handleFavoriteClick}
              >
                <i className={`fas fa-heart favorite-icon`}></i>
              </button>
            </div>
          </div>
        </div>
        <div className="hover-text">Mergi către magazin</div>
      </a>
    </div>
  );
}

export default ProductCard;
