
import React , {useEffect , useState} from 'react';
import {getAllProducts} from '../../actions/index';
import { useDispatch ,useSelector } from 'react-redux';
import Product from '../ListProducts/Product/Product';

function ListProducts () {
  const productsApi = useSelector(state => state.allProducts)
  const dispatch = useDispatch()
 
 useEffect(()=>{
   dispatch(getAllProducts())
  
 },[dispatch])
 
 console.log(productsApi)
  return(
  <div>
    {
     productsApi?.map(p => (
     <Product key={p.id} title={p.title} price={p.price} 
     description={p.description} image={p.image} category={p.category} />))
    }
  </div>
  )

}

export default ListProducts;
