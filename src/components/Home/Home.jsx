import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import ListProducts from '../../components/ListProducts/ListProducts'
import {getAllProducts, getCategories, filterByCategory, orderByPrice, orderByRate} from '../../actions/index';
import NavBar from '../../components/NavBar/NavBar';
import Product from "../ListProducts/Product/Product";
import Paginado from '../Paginado/Paginado';
import './styles.css';




const Home = () => {

    //paginado
     const dispatch=useDispatch();
     const productsAll = useSelector((state) => state.productsReducer.filtered)
    //  console.log(productsAll)
     const categories= useSelector((state)=> state.productsReducer.categories)
     console.log(categories)
     const filtered=useSelector((state)=>state.productsReducer.filtered)
     console.log(filtered)
     const sortedPrice=useSelector((state)=>state.productsReducer.price)
     console.log(sortedPrice)
     const sortedRate=useSelector((state)=>state.productsReducer.rate)
     console.log(sortedRate)

    
  const [orden, setOrden]=useState("");
  const [currentPage, setCurrentPage]=useState(1);
  const [productsPerPage, setProductsPerPage]=useState(10);
  const indexOfLastProduct=currentPage * productsPerPage;
  const indexOfFirstProduct= indexOfLastProduct- productsPerPage;
  const currentProducts=filtered.slice(indexOfFirstProduct, indexOfLastProduct);
   
  console.log(currentProducts)
  const pagination=(pageNumbers)=>{
    setCurrentPage(pageNumbers)
  }

  useEffect(()=>{
     if(productsAll.length === 0) dispatch(getAllProducts())
  },[dispatch])

useEffect(()=>{
    dispatch(getCategories())
}, [dispatch])
// useEffect(()=>{
//     dispatch(filterByCategory())
// },[dispatch])
  
function handleClick(e){
    e.preventDefault();
    dispatch(getAllProducts())//resetea para que traiga todos los games de nuevo cuando se buggea

}

function handleFilterByCategories(e){
    e.preventDefault()
    dispatch(filterByCategory(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
}
function handleOrderByPrice(e){
    e.preventDefault();
    dispatch(orderByPrice(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}

function handleOrderByRate(e){
    e.preventDefault();
    dispatch(orderByRate(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}

    return (
        <>
        <Container >

  
  
  <h4>Show all the products</h4><button type="button" class="btn btn-primary" onClick={handleClick}>Products</button>

            <div className="filters">
                <label>Choose products by categories:</label>
                <select  
                name="filterbycategories" defaultValue={"default"}
                onChange={(e)=>handleFilterByCategories(e)}>
                    
                <option value= "all">All Categories</option>
                {
                categories?.map((category)=>{
                    return (
                    
                        <option key={category.id} value={category.nombre}>{category.nombre}</option>
                        
                    )
                })}
                </select>
                
            </div>
            <div className="orders">
                <div className="orderprice">
                <label>Order by price:</label>
                <select onChange={handleOrderByPrice}>
                    <option value="asc">Increasing Price</option>
                    <option value="desc">Decreasing Price</option>

                </select>
                </div>
                <div className="orderrate">
                <label>Order by rate:</label>
                <select onChange={handleOrderByRate}>
                    <option value="asc">Increasing Rate</option>
                    <option value="desc">Decreasing Rate</option>

                </select>
                </div>
            </div>


            <Paginado
                productsPerPage={productsPerPage}
                productsAll={productsAll.length}
                pagination={pagination} 
                />

           <div className= 'home'>
            {currentProducts?.map(p => {
                return (
                    
                     <Link to={'/home/' + p.id }>
                    <Product key={p.id} title={p.title} price={p.price} 
                    image={p.image} category={p.category} rate={p.rate} />
                    </Link>
                   
                    
                );
            })}
           </div>
       
        </Container>
        </>
    )
}

export default Home;