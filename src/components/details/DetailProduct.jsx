import React ,{useEffect ,useState} from 'react';
import {useDispatch , useSelector} from 'react-redux';
import { Link ,useParams} from 'react-router-dom';
import {getOneProduct,addItem ,deleteItem ,totalItemSum,totalItemRes } from '../../actions/index';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Card , ListGroup , ListGroupItem ,Button} from 'react-bootstrap'

function DetailProduct() {
   const dispatch = useDispatch();
   const [cartBtn , setCartbtn] = useState('Agregar al carrito')
   const detailProduct = useSelector(state => state.productsReducer.details);
   const item = useSelector(state => state.cartReducer.cart)
   const {id} = useParams()

   useEffect(()=>{
    dispatch(getOneProduct(id))
   
  },[dispatch , id])

   console.log(detailProduct)
 

  const handleCart = (detailProduct)=>{
    const itemProduct= item.filter(i => i.id === detailProduct.id)
   console.log(itemProduct)
    if(cartBtn === 'Agregar al carrito'){
      dispatch(totalItemSum(detailProduct.price))
      dispatch(addItem(detailProduct))
      setCartbtn('Eliminar del carrito')
    }else{
      dispatch(totalItemRes(detailProduct.price * itemProduct[0].quantity ))
       dispatch(deleteItem(detailProduct.id))
      setCartbtn('Agregar al carrito')
    }
    
  }

  return( 
    <div>
  <Card className="text-center" style={{ width: '50rem' }}>
    <Card.Img variant="top" src={detailProduct.image} />
    <Card.Body>
    <Card.Title>{detailProduct.title}</Card.Title>
    <Card.Title> Price : $ {detailProduct.price}</Card.Title>
    </Card.Body>
  </Card>
  <br />
  <Card className="text-center" style={{ width: '50rem' }}>
    <Card.Body>
      <Card.Text>
       {detailProduct.description}
      </Card.Text>
     
    </Card.Body>
    <ListGroup className="list-group-flush">
    <ListGroupItem>Category: {detailProduct.category}</ListGroupItem>
    <ListGroupItem>Rate: {detailProduct.rate}</ListGroupItem>
    <ListGroupItem>Stock: {detailProduct.cantidad}</ListGroupItem>
   
  </ListGroup>
  <Link  className=' btn btn-lg btn-block btn-primary' to={`/home/buy`}>
     comprar
  </Link>
  <br />
  <Button variant="primary" onClick={()=> handleCart(detailProduct)}>{cartBtn}</Button>
  <br />
  </Card>
  </div>
  )
}

export default DetailProduct;