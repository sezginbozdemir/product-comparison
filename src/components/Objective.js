import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons CSS

const Objective = () => {
  return (
    <Container className="mt-5">
      <Row className="text-center">
        <Col sm="12" md="4">
          <div className="mb-4">
            <i
              className="bi bi-check-circle"
              style={{ fontSize: "50px", color: "#28a745" }}
            ></i>
          </div>
          <h4>Reliable Price Comparisons</h4>
          <p>Independent and trustworthy</p>
        </Col>
        <Col sm="12" md="4">
          <div className="mb-4">
            <i
              className="bi bi-shop"
              style={{ fontSize: "50px", color: "#007bff" }}
            ></i>
          </div>
          <h4>All Your Stores in One Place</h4>
          <p>Explore new products easily</p>
        </Col>
        <Col sm="12" md="4">
          <div className="mb-4">
            <i
              className="bi bi-tag"
              style={{ fontSize: "50px", color: "#dc3545" }}
            ></i>
          </div>
          <h4>Best Prices Guaranteed</h4>
          <p>Discover the top deals</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Objective;
