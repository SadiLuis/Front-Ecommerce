import React ,{ useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePedido } from "../../actions/index";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button , Modal} from "react-bootstrap";
import {FaShippingFast} from "react-icons/fa";
import {RiShoppingBasket2Line} from "react-icons/ri"
import styles from "./PedidoDetail.css"

const PedidosCompra = () => {
  const [show , setShow] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pedidoDetail =
    useSelector((state) => state.pedidosReducer.pedidoDetail) || {};
  console.log(pedidoDetail);
  const { totalPedido, status, pagado, productos, pedidoId } = pedidoDetail;
  const detailSend = useSelector((state) => state.loginReducer.userDetail)


  const handleBtnCompra = async (e) => {
    e.preventDefault();
    setShow(true)
   
  };

  const handleBtnCancelar = async (e) => {
    e.preventDefault();
    dispatch(deletePedido(pedidoId));
    navigate("/home");
  };


  const PopUp =(props)=> {
    return (
      <div className="contenedor">
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="header">
        <Modal.Header closeButton >

          <div className="title">
          <Modal.Title id="contained-modal-title-vcenter">
          <div className="envio"><FaShippingFast></FaShippingFast>Detalles de envío</div>
          </Modal.Title>
          </div>
        </Modal.Header>
        </div>
        <div className="imagen-contenedor"> 
          <img src={detailSend.avatar} alt="Profile" style={{width:'100px'}}/>
          </div>
          <div className="body">
        <Modal.Body>
          <div className="datos-container">
          <div className="datos">
          <h6>Nombre:</h6>
          <p>{detailSend.nombre}</p>
          </div>
          <div className="datos">
          <h6>Pais:</h6>
          <p>{detailSend.pais}</p>
          </div>
          <div className="datos">
          <h6>Provincia:</h6>
          <p>{detailSend.provincia}</p>
          </div>
          <div className="datos">
          <h6>Direccion:</h6>
          <p>{detailSend.direccion}</p>
          </div>
          </div>
          </Modal.Body>
          </div>
        <Modal.Footer>
         
          <button className="boton" onClick={ ()=> navigate("/pedido/payment")}>Confirmar</button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
  
  

  return status ? (
    <><div className="título">
      <h6><RiShoppingBasket2Line></RiShoppingBasket2Line>Su compra:</h6>
    </div>
    <div className="container-status">
        <div className="datos-container">
          <div className="datos">
            <div> <h6>Estado:</h6>
              <p> {status}</p>
            </div>
            <div> <h6>Pagado:</h6>
              <p>{pagado ? "Si" : "No"}</p>
            </div>
          </div>
          <div>
            <h3>Productos disponibles:</h3>
            {productos.map((prod) => {
              return (
                <div key={prod.producto}>
                  <h5>Descripcion:</h5>
                  <span>{prod.producto}</span>
                  <h5>Cantidad:</h5>
                  <span>{prod.cantidad}</span>
                  <h5>Precio unitario $</h5>
                  <span>{prod.precioUnitario}</span>
                  <h5>Subtotal unitario $</h5>
                  <span>{prod.total}</span>
                </div>
              );

            })}
          </div>
        </div>

        <div>
          <div>SubTotal compra: {totalPedido}</div>
          <div>Descuentos: 0</div>
          <div>Total: {totalPedido}</div>
        </div>
        <Button variant="success" onClick={handleBtnCompra}>
          Pagar
        </Button><Button variant="danger" onClick={handleBtnCancelar}>
          Cancelar compra
        </Button><PopUp
          show={show}
          onHide={() => setShow(false)} />

      </div>
      </>
      
  ) : (
    <span>Loading...</span>
  
  );
}

          
export default PedidosCompra;
        
