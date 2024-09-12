import { Carousel, Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { useIsMobile } from "../context/IsMobileContext";

const ProductCarousel = ({ products, filters, title }) => {
  const isMobile = useIsMobile();
  const maxProducts = 40;
  const itemsPerSlide = isMobile ? 2 : 4;
  const sliderProducts = products
    .filter((product) =>
      filters.some((filter) =>
        product.category.toLowerCase().includes(filter.toLowerCase())
      )
    )
    .slice(0, maxProducts);

  const groupedProducts = [];
  for (let i = 0; i < sliderProducts.length; i += itemsPerSlide) {
    groupedProducts.push(sliderProducts.slice(i, i + itemsPerSlide));
  }

  return (
    <>
      <h4 className="p-3">{title}</h4>
      <Carousel interval={null} slide={false}>
        {groupedProducts.map((productGroup, index) => (
          <Carousel.Item key={index}>
            <Row className="justify-content-center">
              {productGroup.map((product) => (
                <Col
                  className="p-0"
                  style={{ maxHeight: "25rem" }}
                  key={product.id}
                  xs={6}
                  sm={6}
                  md={3}
                >
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default ProductCarousel;
