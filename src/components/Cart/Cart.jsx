import React  from 'react';
import {useSelector } from 'react-redux';
import Item from './Item/Item';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Container , Button ,Row , Col} from 'react-bootstrap';

function Cart() {
  
  const items = useSelector(state => state.cart)
  const total = useSelector(state => state.precioTotal)
  console.log(items)

  
  
   const emptyCart = ()=>{
    return(
    
      <Container className='py-4'>
      <Row>
        <h3>Su Carrito esta vacío</h3>
      </Row>
      </Container>
     
    )
  }

  return (
    <Container>
  <Container className='py-5 my-6 bg-light rounded-3'>
    {items.length === 0 && emptyCart()}
    { items?.map(i => (<Item 
    key={i.id} title={i.title} 
    image={i.image}
     price={i.price} 
     id={i.id}
     stock={i.cantidad}
     quantity={i.quantity}/>))} 
  </Container>
  <div style={{display:'flex' , flexDirection:'column' , justifyContent:'flex-start' , textAlign:'end'}}>
  <h1>Total</h1>
  <h3>{total}</h3>
  </div>
  </Container>
  )
  
}

export default Cart;