import React , {useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {postPedido} from '../../actions/index'
import {useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table ,ListGroup, ListGroupItem ,Button} from 'react-bootstrap'
const PedidosCompra = () => {
  const navigate = useNavigate()
  const dispatch= useDispatch();
  const productsCart = useSelector(state => state.cartReducer.cart) 
  const total = useSelector(state => state.cartReducer.precioTotal)
  const [compra , setCompra] = useState({pedido:[{idProducto:productsCart.id , 
                                         cantidad:productsCart.quantity} ]})

  const handleBtnCompra= async(e) =>{
     e.preventDefault()
    await postPedido(compra)
     navigate('/home/buy')
  }
 
  return (
    <div>

  <Table striped bordered hover size="md">

  <thead>
    <tr>
      <th>ID</th>
      <th>PRODUCTO</th>
      <th>CANTIDAD</th>
      <th>PRECIO</th>
    </tr>
  </thead>
{
  productsCart?.map((el )=>(
     
  <tbody>
    <tr>
      <td>{el.id}</td>
      <td>{el.title}</td>
      <td>{el.quantity}</td>
      <td>{el.price}</td>
    </tr>
   
  </tbody>

  
  ))};
  </Table>
  <ListGroup>
  <ListGroup.Item>subTotal: {total}</ListGroup.Item>
  <ListGroup.Item>Descuentos:</ListGroup.Item>
  <ListGroup.Item>Total:</ListGroup.Item>
  
</ListGroup>
<Button variant="primary" onClick={handleBtnCompra}>Continuar compra</Button>
    </div>
  )
}

export default PedidosCompra