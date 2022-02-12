import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePedido } from "../../actions/index";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const PedidosCompra = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pedidoDetail =
    useSelector((state) => state.pedidosReducer.pedidoDetail) || {};
  console.log(pedidoDetail);
  const { totalPedido, status, pagado, productos, pedidoId } = pedidoDetail;

  const handleBtnCompra = async (e) => {
    e.preventDefault();
    navigate("/pedido/payment");
  };

  const handleBtnCancelar = async (e) => {
    e.preventDefault();
    dispatch(deletePedido(pedidoId));
    navigate("/home");
  };

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
    </div>
  ) : (
    <span>Loading...</span>
  );
};

export default PedidosCompra;
