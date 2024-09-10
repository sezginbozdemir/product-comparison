import React from "react";
import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { Card, Button, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent click event from triggering the card link
    e.preventDefault(); // Prevent the default anchor behavior
    isFavorite(product) ? removeFavorite(product) : addFavorite(product);
  };
  const [showTooltip, setShowTooltip] = useState(false);
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    console.log(showTooltip);
    setShowTooltip(false);
  };
  const handleTooltipClick = () => {
    window.location.href = product.url;
  };

  return (
    <Col className="mb-4">
      <OverlayTrigger
        placement="top"
        offset={[0, -100]}
        show={showTooltip}
        overlay={
          <Tooltip
            onMouseEnter={handleMouseEnter}
            onClick={handleTooltipClick}
            className="tooltip-custom"
          >
            Go to Product
          </Tooltip>
        }
      >
        <Card style={{ textDecoration: "none" }} as={Link} to={product.url}>
          <Card.Img
            variant="top"
            src={product["urluri imagine"]}
            className="object-fit-cover border rounded"
            style={{ height: "11rem" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <Card.Body>
            <Card.Title
              style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
              className="h6 overflow-hidden"
            >
              {product.titlu}
            </Card.Title>
            <Card.Text className="small text-muted">{product.brand}</Card.Text>
            <Card.Text className="font-weight-bold truncate-text">
              {product["pret*"]} lei
            </Card.Text>
            <div className="d-flex justify-content-center">
              <Button
                href={product.url}
                variant="secondary"
                style={{ width: "90%" }}
                className="mr-2"
              >
                Detalii
              </Button>
              <Button
                variant={isFavorite(product) ? "danger" : "outline-secondary"}
                onClick={handleFavoriteClick}
              >
                <i className={`bi bi-bag-heart-fill`}></i>
              </Button>
            </div>
          </Card.Body>
        </Card>
      </OverlayTrigger>
    </Col>
  );
}

export default ProductCard;
