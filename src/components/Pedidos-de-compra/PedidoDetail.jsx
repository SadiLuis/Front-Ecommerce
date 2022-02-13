import React ,{ useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePedido } from "../../actions/index";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button , Modal} from "react-bootstrap";

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
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Detalle de envio
          </Modal.Title>
        </Modal.Header>
          <img src={detailSend.avatar} alt="Profile" style={{width:'100px'}}/>
        <Modal.Body>
          <h4>Nombre</h4>
          <p>{detailSend.nombre}</p>
          <h4>Pais</h4>
          <p>{detailSend.pais}</p>
          <h4>Provincia</h4>
          <p>{detailSend.provincia}</p>
          <h4>Direccion</h4>
          <p>{detailSend.direccion}</p>
          </Modal.Body>
        <Modal.Footer>
         
          <Button  onClick={ ()=> navigate("/pedido/payment")}>Confirmar</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  

  return status ? (
    <div>
      <div>
        <div>Estado: {status}</div>
        <div>Pagado: {pagado ? "Si" : "No"}</div>
        <div>
          <h3>Productos disponibles</h3>
          {productos.map((prod) => {
            return (
              <div key={prod.producto}>
                <h5>Descripcion</h5>
                <span>{prod.producto}</span>
                <h5>Cantidad</h5>
                <span>{prod.cantidad}</span>
                <h5>Precio unitario</h5>
                <span>{prod.precioUnitario}</span>
                <h5>Subtotal unitario</h5>
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
      </Button>
      <Button variant="danger" onClick={handleBtnCancelar}>
        Cancelar compra
      </Button>
      <PopUp
        show={show}
        onHide={() => setShow(false)}
      />
    </div>
  ) : (
    <span>Loading...</span>
  );
};

export default PedidosCompra;
