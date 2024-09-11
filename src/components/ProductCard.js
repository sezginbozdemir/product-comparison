import React from "react";
import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import {
  Card,
  Button,
  Col,
  OverlayTrigger,
  Tooltip,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
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
    window.location.href = product.productUrl;
  };
  const calculateDiscount = () => {
    if (product.newPrice) {
      const discount =
        ((product.productPrice - product.newPrice) / product.productPrice) *
        100;
      return Math.round(discount);
    }
    return null;
  };

  const discountPercentage = calculateDiscount();

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
        <Card
          style={{ textDecoration: "none" }}
          as={Link}
          to={product.productUrl}
        >
          <Card.Img
            variant="top"
            src={product.productImg}
            className="object-fit-cover"
            style={{ height: "11rem" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          {discountPercentage && (
            <Badge
              bg="danger"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                fontSize: "1rem",
              }}
            >
              -{discountPercentage}%
            </Badge>
          )}
          <Card.Body>
            <Card.Text className="small text-muted">{product.seller}</Card.Text>
            <Card.Title
              style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
              className="h6 overflow-hidden"
            >
              {product.productName}
            </Card.Title>
            <Card.Text className="small text-muted">{product.brand}</Card.Text>
            <Card.Text className="font-weight-bold">
              {product.newPrice ? (
                <>
                  <span className="text-danger font-weight-bold">
                    {product.newPrice} lei
                  </span>
                  <span
                    className="text-muted ml-2"
                    style={{ textDecoration: "line-through" }}
                  >
                    {product.productPrice} lei
                  </span>
                </>
              ) : (
                <span>{product.productPrice} lei</span>
              )}
            </Card.Text>
            <div className="d-flex justify-content-center">
              <Button
                href={product.productUrl}
                variant=""
                style={{
                  width: "90%",
                  backgroundColor: "#e6e6e6",
                }}
                className="mr-2"
              >
                Details
              </Button>
              <Button
                variant={isFavorite(product) ? "danger" : "secondary"}
                style={{
                  backgroundColor: !isFavorite(product) ? "#e6e6e6" : "",
                  border: !isFavorite(product) ? "0" : "",
                }}
                onClick={handleFavoriteClick}
              >
                <i className={`bi bi-heart-fill`}></i>
              </Button>
            </div>
          </Card.Body>
        </Card>
      </OverlayTrigger>
    </Col>
  );
}

export default ProductCard;
