
import React , {useEffect , useState} from 'react';
import {getAllProducts} from '../../actions/index';
import { useDispatch ,useSelector } from 'react-redux';
import {Link } from 'react-router-dom'
import Product from '../ListProducts/Product/Product';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container , Row , Col} from 'react-bootstrap';
import CartBtn from '../ShoppingCart/CartBtn';

function ListProducts () {
  const productsApi = useSelector(state => state.filtered)
  const dispatch = useDispatch()
 
 useEffect(()=>{
   dispatch(getAllProducts())
  
 },[dispatch])
 
 //console.log(productsApi)
  return(
  <Container>
   
     <Row>
    {
     productsApi?.map(p => (
       <Col sm={4} >
        <Link to={'/home/' + p.id }>
        <Product key={p.id} title={p.title} price={p.price} 
        image={p.image} category={p.category} />
        </Link>
     </Col>
    ))}
    </Row>
  </Container>
     )
}

export default ListProducts;