import React ,{useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { addItem ,deleteItem } from '../../../actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card , ListGroup, ListGroupItem} from 'react-bootstrap';

function Product({title,price,description,image,category}) {
  const dispatch = useDispatch();
  const [cartBtn , setCartbtn] = useState('Agregar al carrito')
  const items= useSelector(state => state.filtered)
  const cart = useSelector(state => state.cart)
  
  const handleCart = (e)=>{
    e.preventDefault()
    console.log(e)
    let oneProduct = items?.filter(p => p.title === e.target.name)
    
    if(cartBtn === 'Agregar al carrito'){
      
      dispatch(addItem(oneProduct[0]))
      setCartbtn('Eliminar del carrito')
    }else{
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
    <ListGroupItem>{category}</ListGroupItem>
     
  </ListGroup>
  <Button variant="primary" name={title} onClick={(e)=> handleCart(e)}>{cartBtn}</Button>
  </Card.Body>
</Card>
  )

}

export default Product;
