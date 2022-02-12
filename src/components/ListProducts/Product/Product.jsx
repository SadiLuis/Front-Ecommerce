import React, { useState, useEffect } from "react";
import { addItem, deleteItem } from "../../../actions";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function Product({
  id,
  title,
  price,
  description,
  image,
  category,
  rate,
  cantidad,
  cart,
  addItem,
  deleteItem,
}) {
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setInCart(cart.find((el) => el.id === id));
  }, [cart, id]);

  return (
    <Card style={{ width: "18rem" }}>
      <Link to={"/home/" + id}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <ListGroup className="list-group-flush">
            <ListGroupItem>$ {price}</ListGroupItem>
            <ListGroupItem>{category}</ListGroupItem>
            <ListGroupItem>{rate}</ListGroupItem>
          </ListGroup>
        </Card.Body>
      </Link>

      {cantidad === 0 ? (
        <div>
          <Button variant="danger">Product out of stock</Button>
        </div>
      ) : inCart ? (
        <Button variant="primary" onClick={() => deleteItem(id)}>
          Quitar del carrito
        </Button>
      ) : (
        <Button variant="primary" onClick={() => addItem(id)}>
          Añadir al carrito
        </Button>
      )}
    </Card>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addItem, deleteItem }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    cart: state.productsReducer.cart.products,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
