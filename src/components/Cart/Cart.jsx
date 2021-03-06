import React ,{useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Item from "./Item/Item";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Row } from "react-bootstrap";
import { postPedido ,updateCart,getAllProducts } from "../../actions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let items =
    useSelector((state) => {
      let completeProducts = state.productsReducer.cart.products;
      completeProducts = completeProducts.map( (e) => {
        const finded =  state.productsReducer.allProducts.find(
          (el) => el.id === e.id
        );
        return finded ? { ...finded, quantity: e.quantity } : null;
      });

      return completeProducts;
    }) 
 
  const total = useSelector((state) => state.productsReducer.cart.precioTotal);
  const isAuth = useSelector((state) => state.loginReducer.isAuth);
  items = items.filter((e) => e);
  const products = useSelector((state) => state.productsReducer.allProducts)
  

  useEffect(() => {
   if(products.length === 0) dispatch(getAllProducts())
    
  },[dispatch,getAllProducts]);

  useEffect(()=> {
    dispatch(updateCart())
  },[dispatch,updateCart])


  const handlebtnCompra = () => {
    if (!isAuth) {
      let result = window.confirm("Registrese para poder realizar una compra");
      if (result) navigate("/register");
    } else {
      if(items.length > 0){
      let pedido = {
        pedidos: items.map((e) => ({
          productoId: e.id,
          cantidad: e.quantity,
        })),
      };
      dispatch(postPedido(pedido));
      navigate("/pedido/detail");
    }else{
      toast.warning('No hay ningun producto en el carrito',{
        position: "bottom-right",
      })
    }
    }
  };

  const emptyCart = () => {
    return (
      <Container className="py-4">
        <Row>
          <h3>Su Carrito esta vac??o</h3>
        </Row>
      </Container>
    );
  };

  return (
    <>
    {products.length > 0 ?
       ( 
         <div>
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
          <h3>$ {total}</h3>
          <Button
            className="align-self-end btn btn-lg btn-block btn-primary"
            onClick={handlebtnCompra}
          >
            Comprar
          </Button>
        </div>
      </Container>
     <ToastContainer />
      </div>
     ): (<h1>Loading...</h1>)
    }
     </>
  )
}

export default Cart;
