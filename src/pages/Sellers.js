import React from "react";
import { Col, Card, Row } from "react-bootstrap";

const sellerLogos = [
  "bricolaj.png",
  "gimi.webp",
  "mind.png",
  "hiris.webp",
  "it.png",
  "nichiduta.jpg",
  "perfect.webp",
  "sins.webp",
];
const banners = [
  "banner-2.png",
  "banner-3.png",
  "banner-4.png",
  "banner-5.png",
];

function Sellers() {
  return (
    <>
      <h4 className="text-center">Top Sellers</h4>
      <Row>
        <div className="d-flex flex-wrap mt-3">
          {sellerLogos.map((logo, index) => (
            <Col key={index} md={3} className="mb-4">
              <Card
                style={{
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  transition: "0.3s",
                }}
              >
                <Card.Img
                  variant="top"
                  src={`/seller-logos/${logo}`}
                  style={{ height: "6rem", objectFit: "contain" }}
                />
              </Card>
            </Col>
          ))}
        </div>
      </Row>
      <h4 className="text-center mt-4 mb-4">Promotions</h4>
      <div className="d-flex flex-wrap mt-5 justify-content-center">
        {banners.map((banner, index) => (
          <Row key={index} md={3} className="mb-4 mr-2 ml-2">
            <Card
              style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "0.3s",
                width: "100%",
              }}
            >
              <Card.Img
                variant="top"
                src={`/banners/${banner}`}
                style={{
                  height: "100%",
                }}
              />
            </Card>
          </Row>
        ))}
      </div>
    </>
  );
}

export default Sellers;
