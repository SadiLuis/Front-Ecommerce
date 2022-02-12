import React ,{useEffect ,useState} from 'react';
import {useDispatch , useSelector} from 'react-redux';
<<<<<<< Updated upstream
import { Link ,useParams} from 'react-router-dom';
import {getOneProduct,addItem ,deleteItem ,totalItemSum,totalItemRes, getAllProducts } from '../../actions/index';
=======
import { Link ,useParams , useNavigate} from 'react-router-dom';
import {getOneProduct,addItem ,deleteItem ,totalItemSum,totalItemRes } from '../../actions/index';
>>>>>>> Stashed changes

import 'bootstrap/dist/css/bootstrap.min.css';
import {Card , ListGroup , ListGroupItem ,Button} from 'react-bootstrap'

function DetailProduct() {
   const dispatch = useDispatch();
   const [cartBtn , setCartbtn] = useState('Agregar al carrito')
   const detailProduct = useSelector(state => state.productsReducer.details);
   const item = useSelector(state => state.cartReducer.cart)
   const {id} = useParams()
   const navigate = useNavigate()

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
  

  const handleButton =()=>{
    if(!localStorage.token_ecommerce){

      let result = window.confirm('No estas registrado para realizar la compra . ¿Quiere crear una cuenta?')
      if(result) navigate('/register')

    }else{
      navigate('/home/pedidos')
     
    }
  }

  return( 
    <div>
      
    

  <><Card className="text-center" style={{ width: '50rem' }}>
          <Card.Img variant="top" src={detailProduct.image} />
          <Card.Body>
            <Card.Title>{detailProduct.title}</Card.Title>
            <Card.Title> Precio: $ {detailProduct.price}</Card.Title>
          </Card.Body>
        </Card><br /><Card className="text-center" style={{ width: '50rem' }}>
            <Card.Body>
              <Card.Text>
                {detailProduct.description}
              </Card.Text>

            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Categoria: {detailProduct.category}</ListGroupItem>
              <ListGroupItem>Rate: {detailProduct.rate}</ListGroupItem>
              <ListGroupItem>Stock: {detailProduct.cantidad}</ListGroupItem>

            </ListGroup>
            <Link to={`home/buy/${detailProduct.id}`}>
              <Button variant="primary">Comprar</Button>
            </Link>
            <br />
            
            <br />
          </Card></>


          {detailProduct.cantidad===0?
   
<<<<<<< Updated upstream
     <div>
          <Link to={'/home'}>
            <Button variant="danger">Product out of stock</Button>
          </Link>
          <Button disabled variant="primary" onClick={() => handleCart(detailProduct)}>{cartBtn}</Button>
        </div>
        // </>
      
      
      : <Button  variant="primary" onClick={() => handleCart(detailProduct)}>{cartBtn}</Button> 

      
  }
=======
  </ListGroup>
  <Button variant="primary" onClick={handleButton}>Continuar compra</Button>
  <br />
  <Button variant="primary" onClick={()=> handleCart(detailProduct)}>{cartBtn}</Button>
  <br />
  </Card>
>>>>>>> Stashed changes
  </div>
  )
}
export default DetailProduct;
