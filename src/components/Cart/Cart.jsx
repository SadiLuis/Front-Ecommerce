import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Item from "./Item/Item";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Row } from "react-bootstrap";
import { sumCart } from "../../actions";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let items = useSelector((state) => {
    let completeProducts = state.productsReducer.cart.products;
    completeProducts = completeProducts.map((e) => {
      const finded = state.productsReducer.allProducts.find(
        (el) => el.id === e.id
      );
      return finded ? { ...finded, quantity: e.quantity } : null;
    });

    return completeProducts;
  });
  const total = useSelector((state) => state.productsReducer.cart.precioTotal);
  const isAuth = useSelector((state) => state.loginReducer.isAuth);
  items = items.filter((e) => e);

  const handlebtnCompra = () => {
    if (!isAuth) {
      let result = window.confirm("Registrese para poder realizar una compra");
      if (result) navigate("/register");
    } else {
      navigate("/home/pedidos");
    }
  };

  const emptyCart = () => {
    return (
      <Container className="py-4">
        <Row>
          <h3>Su Carrito esta vacío</h3>
        </Row>
      </Container>
    );
  };

  useEffect(() => {
    dispatch(sumCart());
  }, [dispatch]);

  return (
    <>
      <Container>
        <Container className="py-4 bg-light rounded-3 ">
          {items.length === 0 && emptyCart()}
          {items?.map((i) => (
            <Item
              key={i.id}
              title={i.title}
              image={i.image}
              price={i.price}
              id={i.id}
              stock={i.cantidad}
              quantity={i.quantity}
            />
          ))}
        </Container>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            textAlign: "end",
          }}
        >
          <h1>Total</h1>
          <h3>{total}</h3>
          <Button
            className="align-self-end btn btn-lg btn-block btn-primary"
            onClick={handlebtnCompra}
          >
            Continuar compra
          </Button>
        </div>
      </Container>
    </>
  );
}

export default Cart;
