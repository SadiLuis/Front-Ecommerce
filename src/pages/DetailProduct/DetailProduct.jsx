import React, { useEffect, useState } from "react";
import { useSelector , useDispatch} from "react-redux";
import { Link, useParams , useNavigate} from "react-router-dom";
import { addItem, deleteItem } from "../../actions/index";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, ListGroup, ListGroupItem, Button ,Modal} from "react-bootstrap";
import { BASEURL } from "../../assets/URLS";
import { postPedido } from "../../actions";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function DetailProduct({ cartProducts, addItem, deleteItem }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [inCart, setInCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { image, price, description, title, category, rate, cantidad } =
    product;
  const [show , setShow] = useState(false)
  const isAuth = useSelector((state) => state.loginReducer.isAuth);
  let items =
    useSelector((state) => {
      let completeProducts = state.productsReducer.cart.products;
      completeProducts = completeProducts.map((e) => {
        const finded = state.productsReducer.allProducts.find(
          (el) => el.id === e.id
        );
        return finded ? { ...finded, quantity: e.quantity } : null;
      });

      return completeProducts;
    }) || [];

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

  const handlebtnCompra = () => {
    if (!isAuth) {
      let result = window.confirm("Registrese para poder realizar una compra");
      if (result) navigate("/register");
    } else {
       setShow(true)
     
    }
  };

  const handleOneProduct =()=>{
    let pedido = {
      pedidos:[{
        productoId: id,
        cantidad: 1,
      }]
    }
      dispatch(postPedido(pedido));
      navigate("/pedido/detail/"+id);
  }

  const handleCartBtn =()=>{
    let pedidoCart = {
      pedidos: cartProducts.map((e) => ({
        productoId: e.id,
        cantidad: e.quantity,
      })),
    };
    pedidoCart.pedidos.push({
      productoId: id,
      cantidad: 1,
    })
    dispatch(postPedido(pedidoCart));
    navigate("/pedido/detail");
  }
  //console.log(items)
  
  const PedidoPopUp =(props)=> {
    return (
      <Modal
        {...props}
        size="xs"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            ¿ Desea agregar a la compra los productos del carrito ?
          </Modal.Title>
        </Modal.Header>
          
        <Modal.Body>
          <h5>Estos son los productos que estan en el carrito:</h5>
            {
            items?.map(el => (
              <div>
                <p>{el.title}</p>

              </div>
            ))
          }  
          </Modal.Body>
        <Modal.Footer>)
          <Button  onClick={handleOneProduct }>No</Button>
          <Button  onClick={ handleCartBtn}>Si</Button>
        </Modal.Footer>
      </Modal>
    )
  }


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
       
          <Button variant="primary" onClick={ handlebtnCompra}>Comprar</Button>
        
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
      <PedidoPopUp
       show={show}
       onHide={() => setShow(false)}
       />
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
