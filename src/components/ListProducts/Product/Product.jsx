import React ,{useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { addItem ,deleteItem ,totalItemSum , totalItemRes, getAllProducts} from '../../../actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card , ListGroup, ListGroupItem} from 'react-bootstrap';

function Product({title,price,description,image,category,rate,cantidad}) {
  const dispatch = useDispatch();
  const [cartBtn , setCartbtn] = useState('Agregar al carrito')
<<<<<<< HEAD
  const [noProduct, setNoProduct]=useState('Product out of stock')
  const items= useSelector(state => state.filtered)
  console.log(items)
  const cart = useSelector(state => state.cart)
  console.log(cart)
  const allProducts=useSelector(state=>state.allProducts)
  console.log(allProducts)
=======
  const items= useSelector(state => state.productsReducer.filtered)
  const cart = useSelector(state => state.cartReducer.cart)
>>>>>>> 3964ec6cbffcce65ba54f8ee00d1428bfedfafa6
  
  const handleCart = (e)=>{
    e.preventDefault()
    console.log(e)
    const oneProduct = items?.filter(p => p.title === e.target.name)
    console.log(oneProduct)
    const itemCart = cart.filter(i => i.id === oneProduct[0].id)
    
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
  function handleNoProduct(e){
    e.preventDefault()
      allProducts.forEach(function (element) {
        if (element.cantidad === 0) {
          setNoProduct("Product out of stock");
        }
      }
    )
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
          <ListGroupItem>{rate}</ListGroupItem>
        </ListGroup>
        
         
      </Card.Body>
    </Card>
     
  )
      
    
  
  
  

}
  

export default Product;
{/* <Button disabled variant="primary" name={title} onClick={(e) => handleCart(e)}>{cartBtn}</Button>
        <Button variant="danger" onClick={handleNoProduct}>Product out of stock</Button></> */}