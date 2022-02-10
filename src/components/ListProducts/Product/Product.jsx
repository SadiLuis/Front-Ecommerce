import React ,{useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { addItem ,deleteItem ,totalItemSum , totalItemRes} from '../../../actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card , ListGroup, ListGroupItem} from 'react-bootstrap';

function Product({title,price,description,image,category,rate}) {
  const dispatch = useDispatch();
  const [cartBtn , setCartbtn] = useState('Agregar al carrito')
  const items= useSelector(state => state.productsReducer.filtered)
  const cart = useSelector(state => state.cartReducer.cart)
  
  const handleCart = (e)=>{
    e.preventDefault()
    console.log(e)
    let oneProduct = items?.filter(p => p.title === e.target.name)
    let itemCart = cart.filter(i => i.id === oneProduct[0].id)
    if(cartBtn === 'Agregar al carrito'){
      dispatch(totalItemSum(oneProduct[0].price))
      dispatch(addItem(oneProduct[0]))
      setCartbtn('Eliminar del carrito')
    }else{
      dispatch(totalItemRes(oneProduct[0].price * itemCart[0].quantity))
       dispatch(deleteItem(oneProduct[0].id))
      setCartbtn('Agregar al carrito')
    }
    
  }
  return (
    <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={image} />
  <Card.Body>
    <Card.Title>{title}</Card.Title>
    <Card.Text>
      {description}
    </Card.Text>
    <ListGroup className="list-group-flush">
    <ListGroupItem>$ {price}</ListGroupItem>
    <ListGroupItem>Category: {category}</ListGroupItem>
    <ListGroupItem> Rate: {rate}</ListGroupItem>
  </ListGroup>
  <Button variant="primary" name={title} onClick={(e)=> handleCart(e)}>{cartBtn}</Button>
  </Card.Body>
</Card>
  )

}

export default Product;