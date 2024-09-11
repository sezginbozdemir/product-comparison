import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Papa from "papaparse";

function Vouchers() {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    Papa.parse("files/vouchers.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setVouchers(result.data);
      },
      error: (error) => {
        console.error("Error fetching or parsing CSV file:", error);
      },
    });
  }, []);

  return (
    <div className="mt-5">
      <h4 className="text-center mb-4">Vouchers</h4>
      <div className="container">
        {vouchers.map((voucher, index) => (
          <Row key={index} className="mb-4">
            <Col>
              <Card
                style={{
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  transition: "0.3s",
                }}
              >
                <Card.Img
                  variant="top"
                  src={voucher.Logo}
                  style={{ height: "7rem", objectFit: "contain" }}
                />
                <Card.Body className="d-flex">
                  <div
                    className="bg-danger p-5 border justify-content-center d-flex mr-3"
                    style={{ width: "20%" }}
                  >
                    <Card.Text className="text-light fs-2">
                      {" "}
                      {voucher.Discount}
                    </Card.Text>
                  </div>
                  <div style={{ width: "80%" }}>
                    <Card.Title>{voucher.Titlu}</Card.Title>
                    <Card.Text>{voucher.Valabilitate}</Card.Text>
                    <Card.Text className="text-light fs-3 bg-secondary text-center p-3">
                      {voucher.Cod}
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </div>
    </div>
  );
}

export default Vouchers;
