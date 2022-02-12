import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addItem, deleteItem } from "../../actions/index";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { BASEURL } from "../../assets/URLS";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function DetailProduct({ cartProducts, addItem, deleteItem }) {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [inCart, setInCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { image, price, description, title, category, rate, cantidad } =
    product;

  useEffect(() => {
    async function getProduct() {
      try {
        const { data } = await axios.get(`${BASEURL}/products/${id}`);
        console.log(data);
        setProduct(data);
        // setInCart(cartProducts.find((el) => el.id === parseInt(id)));
      } catch (err) {
        setError(true);
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    getProduct();
  }, [id, cartProducts]);

  useEffect(() => {
    !error && setInCart(cartProducts.find((el) => el.id === parseInt(id)));
  }, [id, product, cartProducts, error]);

  return loading ? (
    <span>loading...</span>
  ) : error ? (
    <span>No se ha podido obtener la información del producto solicitado </span>
  ) : (
    <>
      <Card className="text-center" style={{ width: "50rem" }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Title> Precio: $ {price}</Card.Title>
        </Card.Body>
      </Card>
      <Card className="text-center" style={{ width: "50rem" }}>
        <Card.Body>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Categoria: {category}</ListGroupItem>
          <ListGroupItem>Rate: {rate}</ListGroupItem>
          <ListGroupItem>Stock: {cantidad}</ListGroupItem>
        </ListGroup>
        <Link to={`/home/buy/${id}`}>
          <Button variant="primary">Comprar</Button>
        </Link>
      </Card>
      {cantidad === 0 ? (
        <div>
          <Button variant="danger">Product out of stock</Button>
        </div>
      ) : inCart ? (
        <Button variant="primary" onClick={() => deleteItem(parseInt(id))}>
          Quitar del carrito
        </Button>
      ) : (
        <Button variant="primary" onClick={() => addItem(parseInt(id))}>
          Añadir al carrito
        </Button>
      )}
      <Card />
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addItem, deleteItem }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    cartProducts: state.productsReducer.cart.products,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct);
