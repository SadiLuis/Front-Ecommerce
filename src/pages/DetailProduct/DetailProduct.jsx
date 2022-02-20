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
      
      if(items.length > 0) setShow(true)
      else {
        let pedido = {
          pedidos:[{
            productoId: id,
            cantidad: 1,
          }]
        }
         dispatch(postPedido(pedido));
          navigate("/pedido/detail/"+id);
      }
    }
  };

  const handleOneProduct = async()=>{
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
    <div style={{ 
      backgroundColor: "pink",
      height: "100vh",
      width: "100vw",
      display: "flex",
      border: "1px solid black",
      
    }} >
      <Card className="text-center" style={{ 
        width: "40%",
        height: "70%",
        right: "13%",
        margin: "auto",
        backgroundColor: "pink",
        border: "1px solid #ddd",
        borderRadius: "15px",
        padding: "20px",
        marginTop: "20px",
        marginBottom: "20px",
      

     }} >
        <Card.Img variant="top" src={image} />
        <Card.Body >
          <Card.Title
          >{title}
          </Card.Title>
          <Card.Title
          > 
          Precio: $ {price}
          </Card.Title>
        </Card.Body>
      </Card>
      <Card className="text-center" style={{ 
        width: "25%",
        height: "50%",
        right: "28%",
        backgroundColor: "pink",
        border: "1px solid #ddd",
        borderRadius: "15px",
        padding: "20px",
        marginTop: "20px",
        marginBottom: "20px",
      }}
      >
        <Card.Body>
          <Card.Text  style={{
          backgroundColor: "pink",
          border: "1px solid #ddd",
          borderRadius: "15px",
        }}  >{description}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush"
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "15px",
        }}
        >
          <ListGroupItem>Categoria: {category}</ListGroupItem>
          <ListGroupItem>Rate: {rate}</ListGroupItem>
          <ListGroupItem>Stock: {cantidad}</ListGroupItem>
        </ListGroup>
       

          <Button variant="primary" onClick={ handlebtnCompra}>Comprar</Button>

        
      </Card>
          <Button variant="primary" onClick={ handlebtnCompra}
          style={{
            position: "absolute",
            bottom: "17%",
            left: "41%",
            transform: "translate(-50%, -50%)",
            border: "1px solid #ddd",
            borderRadius: "15px",
            padding: "15px",
            fontSize: "20px",
          }}
          >
            Comprar
          </Button>
      {cantidad === 0 ? (
        
        <div   style={{
          position: "absolute",
          top: "77%",
          left: "10%",
          transform: "translate(-50%, -50%)",
          border: "1px solid #ddd",
          borderRadius: "15px",
          padding: "20px",

        }}>
          <Button variant="danger"
          style={{
            position: "absolute",
            top: "77%",          
            left: "10%",
            transform: "translate(-50%, -50%)",
            border: "1px solid #ddd",
            borderRadius: "15px",
            padding: "15px",
  
          }}
          >
            Product out of stock
          </Button>
        </div>
      ) : inCart ? (
        <Button variant="primary" onClick={() => deleteItem(parseInt(id))}
        style={{
          position: "absolute",
          top: "77%",          
          left: "10%",
          transform: "translate(-50%, -50%)",
          border: "1px solid #ddd",
          borderRadius: "15px",
          padding: "15px",

        }}
        >
          Quitar del carrito
        </Button>
      ) : (
        <Button variant="primary" onClick={() => addItem(parseInt(id))}
        style={{
          position: "absolute",
          top: "77%",          
          left: "10%",
          transform: "translate(-50%, -50%)",
          border: "1px solid #ddd",
          borderRadius: "15px",
          padding: "15px",

        }}
        >
          Añadir al carrito
        </Button>
      )}
      {/* <Link to="/comment"> Quieres dejar un comentario?</Link> */}
      <Card />
      <PedidoPopUp
       show={show}
       onHide={() => setShow(false)}
       />

      
      {/* <CommentListScreen /> */}

    </div>

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
