import Product from "../ListProducts/Product/Product";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

function ListProducts({ currentProducts }) {
  return (
    <Container>
      <Row>
        {currentProducts?.map((p) => (
          <Col sm={4}>
            <Product
              id={p.id}
              title={p.title}
              price={p.price}
              image={p.image}
              category={p.category}
              rate={p.rate}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ListProducts;
