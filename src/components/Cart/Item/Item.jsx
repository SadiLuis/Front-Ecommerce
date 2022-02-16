import React, { useState , useEffect } from "react";
import { addItem, deleteItem, restItem ,updateCart } from "../../../actions/index";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";

function Item({ id, title, price, image, stock, quantity }) {
  const [input, setInput] = useState(parseInt(quantity));
  
  let priceTotal = price * quantity;
  const dispatch = useDispatch();

  
 
  console.log(input)

  const handleChange = (e) => {
    // console.log(e);
    setInput(parseInt(e.target.value));
  };

  const handleButtonMas = () => {
    if (input < stock) {
      setInput((prev) => prev + 1);
      dispatch(addItem(id));
    } else {
      alert("Se supero el limite de stock , el limite es: " + stock);
      // setInput((prev) => prev - 1);
    }
  };

  const handleButtonMenos = (e) => {
    // e.preventDefault();
    if (input > 1) {
      setInput((prev) => prev - 1);
      dispatch(restItem(id));
   
   };
  }  
  const handleDelete = () => {
    // e.preventDefault();
    dispatch(deleteItem(id));
  };

  const fixedPrice = Math.round((priceTotal + Number.EPSILON) * 100) / 100;

  return (
    <Container className="py-4">
      <Button
        className="btn-close float-end"
        aria-label="Close"
        onClick={handleDelete}
      ></Button>
      <Row className="justify-content-center">
        <Col>
          <img
            src={image}
            alt={`imagen de ${title}`}
            height="200px"
            width="180px"
          />
        </Col>
        <Col>
          <Link to={`/home/${id}`}>
            <h4>{title}</h4>
          </Link>
        </Col>
        <Col>
          <h3>Cantidad</h3>
          <Button onClick={handleButtonMenos}>-</Button>
          <input
            type="number"
            value={input}
            min={1}
            max={stock}
            // defaultValue={input}
            onChange={handleChange}
            disabled
          />
          <Button onClick={handleButtonMas}>+</Button>
        </Col>
        <Col>
          <h3>Precio</h3>
          <h4>$ {fixedPrice}</h4>
        </Col>
      </Row>
    </Container>
  );
}

export default Item;
