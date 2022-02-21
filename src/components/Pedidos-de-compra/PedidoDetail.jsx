import React ,{ useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePedido } from "../../actions/index";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button , Modal} from "react-bootstrap";
import {FaShippingFast} from "react-icons/fa";
import {RiShoppingBasket2Line} from "react-icons/ri"
import {BsCheck2Circle} from "react-icons/bs"
import Swal from 'sweetalert2'

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
    <><div className="titulo">
      <h6><RiShoppingBasket2Line></RiShoppingBasket2Line>Su compra:</h6>
    </div>
    <div className="container-status">
        <div className="datos-container">
          <div className="datos-estado">
            <div className="estado"> <h6>Estado:</h6>
            <p> {status}</p>
            </div>
            <div className="pagado"> <h6>Pagado:</h6>
              <p>{pagado ? "Si" : "No"}</p>
            </div>
          </div>
          <div className="detalle">
            {/* <div ><h4>Detalle:</h4></div>  */}
            {productos.map((prod) => {
              return (
                <div key={prod.producto}>
                  <h5>Producto:</h5>
                  
                  <span>{prod.producto} <BsCheck2Circle></BsCheck2Circle></span>
                  <br />
                  <h5>Cantidad:</h5>
                  <span>{prod.cantidad} <BsCheck2Circle></BsCheck2Circle></span>
                  <br />
                  <h5>Precio unitario: </h5>
                  <span> $ {prod.precioUnitario} <BsCheck2Circle></BsCheck2Circle></span>
                  <br />
                  <h5>Subtotal unitario: </h5>
                  <span> $ {prod.total} <BsCheck2Circle></BsCheck2Circle></span>
                </div>
              );

            })}
          
        

        
          <div><h5>SubTotal compra:</h5><span> $ {totalPedido} <BsCheck2Circle></BsCheck2Circle></span></div>
          <div><h5>Descuentos:</h5> <span>0% <BsCheck2Circle></BsCheck2Circle></span></div>
          <div className="total"><h3>Total:  </h3> <span> $ {totalPedido} <BsCheck2Circle></BsCheck2Circle></span></div>
        
        </div>
        </div>
        <div className="boton-ubicacion">
        <button className="boton" style={{background:"green"}}onClick={handleBtnCompra}>Comprar</button>
        <button className="boton" style={{background:"red"}}onClick={handleBtnCancelar}>Cancelar compra</button>
        </div>
        {/* <Button variant="success" onClick={handleBtnCompra}>
          Pagar
        </Button><Button variant="danger" onClick={handleBtnCancelar}>
          Cancelar compra
        </Button> */}
        <PopUp
          show={show}
          onHide={() => setShow(false)} />

      </div>
      </>
      
  ) : (
    <div class="d-flex justify-content-center">
      <br />
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
  
  );
}

          
export default PedidosCompra;
        
