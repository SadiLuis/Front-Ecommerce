import React ,{useEffect ,useState} from 'react';
import {useDispatch , useSelector} from 'react-redux';
import { useParams} from 'react-router-dom';
import {getOneProduct,addItem ,deleteItem} from '../../actions/index';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Card , ListGroup , ListGroupItem ,Button} from 'react-bootstrap'

function DetailProduct() {
   const dispatch = useDispatch();
   const [cartBtn , setCartbtn] = useState('Agregar al carrito')
   const detailProduct = useSelector(state => state.details);
   const {id} = useParams()

   useEffect(()=>{
    dispatch(getOneProduct(id))
   
  },[dispatch , id])

   console.log(detailProduct)
  let rate;
  let count;
  
  if(Object.keys(detailProduct).length){
    rate = detailProduct.rating.rate;
    count= detailProduct.rating.count
  }

  const handleCart = (detailProduct)=>{
    if(cartBtn === 'Agregar al carrito'){
      dispatch(addItem(detailProduct))
      setCartbtn('Eliminar del carrito')
    }else{
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
    <Card.Title> Precio : $ {detailProduct.price}</Card.Title>
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
    <ListGroupItem>Categoria: {detailProduct.category}</ListGroupItem>
    <ListGroupItem>Rate: {rate}</ListGroupItem>
    <ListGroupItem>Count: {count}</ListGroupItem>
   
  </ListGroup>
  <Button variant="primary">Comprar</Button>
  <br />
  <Button variant="primary" onClick={()=> handleCart(detailProduct)}>{cartBtn}</Button>
  <br />
  </Card>
  </div>
  )
}

export default DetailProduct;