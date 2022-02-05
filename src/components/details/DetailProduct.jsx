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

//    console.log(detailProduct)
//   let rate;
//   let count;
  
//   if(Object.keys(detailProduct).length){
//     rate = detailProduct.rating.rate;
//     count= detailProduct.rating.count
//   }


  const handleCart = (detailProduct)=>{
    if(cartBtn === 'Agregar al carrito'){
      dispatch(addItem(detailProduct[0]))
      setCartbtn('Eliminar del carrito')
    }else{
       dispatch(deleteItem(detailProduct[0].id))
      setCartbtn('Agregar al carrito')
    }
  }
  
  if (detailProduct.length > 0) {

  
  return( 
    <div>
  <Card className="text-center" style={{ width: '50rem' }}>
    <Card.Img variant="top" src={detailProduct[0].image} />
    <Card.Body>
    <Card.Title>{detailProduct[0].title}</Card.Title>
    <Card.Title> Precio : $ {detailProduct[0].price}</Card.Title>
    </Card.Body>
  </Card>
  <br />
  <Card className="text-center" style={{ width: '50rem' }}>
    <Card.Body>
      <Card.Text>
       {detailProduct[0].description}
      </Card.Text>
     
    </Card.Body>
    <ListGroup className="list-group-flush">
    <ListGroupItem>Categoria: {detailProduct[0].categoriaId}</ListGroupItem>
    <ListGroupItem>Rate: {detailProduct[0].rate}</ListGroupItem>
    <ListGroupItem>Count: {detailProduct[0].count}</ListGroupItem>
   
  </ListGroup>
  <Button variant="primary">Comprar</Button>
  <br />
  <Button variant="primary" onClick={()=> handleCart(detailProduct)}>{cartBtn}</Button>
  <br />
  </Card>
  </div>
  )
    }else {
        return (
            <h1>Loading Details...</h1>  
        )
    }
}

export default DetailProduct;