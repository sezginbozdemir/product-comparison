import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer mt-5 py-4">
      <Container>
        <Row>
          <Col xs={12} md={6} lg={3}>
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Blog</li>
              <li>Investor Relations</li>
            </ul>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <h5>Customer Support</h5>
            <ul className="list-unstyled">
              <li>Contact Us</li>
              <li>Shipping Information</li>
              <li>FAQs</li>
              <li>Order Tracking</li>
            </ul>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <h5>Legal</h5>
            <ul className="list-unstyled">
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
              <li>Legal Notices</li>
            </ul>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <h5>Stay Connected</h5>
            <ul className="list-unstyled">
              <li>Newsletter Sign-Up</li>
              <li>Follow Us on Social Media</li>
              <li>Subscribe to Our Blog</li>
              <li>Download Our App</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
