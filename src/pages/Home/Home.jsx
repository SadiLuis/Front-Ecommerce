import React, { useState, useEffect } from "react";
import { Container , Button } from "react-bootstrap";
import {
  getAllProducts,
  getCategories,
  filterByCategory,
  orderByPrice,
  orderByRate,
  getCartDB,
  postCart,
  updateCart

  
 
} from "../../actions/index";
import Product from "../../components/ListProducts/Product/Product";
import Paginado from "../../components/Paginado/Paginado";
import Ofertas from '../../components/ofertas/Ofertas'
import style from './Home.module.css';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {IoPlayBackSharp} from 'react-icons/io5';
import {IoPlayForwardSharp} from 'react-icons/io5'
import getHeaderToken from '../../helpers/getHeaderToken';

const Home = ({
  allProducts,
  categories,
  filtered,
  getAllProducts,
  getCategories,
  filterByCategory,
  orderByPrice,
  orderByRate,
  isAuth,
  user,
  getCartDB,
  updateCart
  
}) => {
  //paginado
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filtered.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  // console.log(currentProducts);
  
  const pagination = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };
  //setea currentpage en 1
  useEffect(() => {
    setCurrentPage(1);
  }, [setCurrentPage,filtered]);

  useEffect(() => {
    if(isAuth) getCartDB(user.id)
  
    getCategories();
   if(filtered.length === 0) getAllProducts();
  }, [getCategories, getAllProducts]);

  useEffect(() => {
    async function db(){
      await  postCart() 
    }
    isAuth && db()
    updateCart()
}, [isAuth]);

  function handleClick(e) {
    e.preventDefault();
    getAllProducts();
    //resetea para que traiga todos los produtos de nuevo cuando se buggea
  }

  function handleFilterByCategories(e) {
    e.preventDefault();
    filterByCategory(e.target.value);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleOrderByPrice(e) {
    e.preventDefault();
    orderByPrice(e.target.value);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleOrderByRate(e) {
    e.preventDefault();
    orderByRate(e.target.value);
    setOrden(`Ordenado ${e.target.value}`);
  }

  const nextPage = ()=>{
    if(indexOfLastProduct < filtered.length ){
      setCurrentPage(prev => prev + 1)
    }
}
const previousPage = ()=>{
    if(indexOfFirstProduct > 0 ){
      setCurrentPage(prev => prev - 1)
    }
}

  return (
    <>
      <Container className={style.containerHome}>
        <Ofertas />
        <h4 className={style.h4}>Productos Disponibles</h4>
        <div className={style.containerPage}>
          <div className={style.container}>
        <IoPlayBackSharp className={style.prev} type='button' onClick={previousPage} />
        <Paginado
          productsPerPage={productsPerPage}
          filtered={filtered.length}
          pagination={pagination}
          page = {currentPage}
        />
        <IoPlayForwardSharp className={style.next} type='button' onClick={nextPage} />
        </div>
        </div>
         <div className={style.containerF}>
         <Button variant='primary'  onClick={handleClick}>
          Productos
        </Button>
        <div className={style.filters}>
          <label className={style.label}>filtrar por categoria:</label>
          <select
          className={style.selectors}
            name="filterbycategories"
            defaultValue={"default"}
            onChange={(e) => handleFilterByCategories(e)}
          >
            <option value="all">Todas las categorias</option>
            {categories?.map((category) => {
              return (
                <option key={category.id} value={category.nombre}>
                  {category.nombre}
                </option>
              );
            })}
          </select>
        </div>
        <div className={style.orders}>
          <div className="orderprice">
            <label>Ordenar por precio:</label>
            <select className={style.selectors} onChange={handleOrderByPrice}>
              <option value="asc">Menor precio</option>
              <option value="desc">Mayor precio</option>
            </select>
          </div>
          <div className="orderrate">
            <label>ordenar por clasificación:</label>
            <select className={style.selectors} onChange={handleOrderByRate}>
              <option value="asc">Menor </option>
              <option value="desc">Mayor </option>
            </select>
          </div>
        </div>
        </div>
        {/* <SearchBar
        setCurrentPage={setCurrentPage}
        /> */}
        <div className={style.containerDiv}>
          {currentProducts &&
            currentProducts.length &&
            currentProducts.map((p) => {
              return (
                // <Link to={"/home/" + p.id}>
                <Product
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  price={p.price}
                  image={p.image}
                  category={p.category}
                  rate={p.rate}
                />
                // </Link>
              );
            })}
        </div>
      </Container>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllProducts,
      getCategories,
      filterByCategory,
      orderByPrice,
      orderByRate,
      getCartDB,
      updateCart
     
    },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    allProducts: state.productsReducer.allProducts,
    categories: state.productsReducer.categories,
    filtered: state.productsReducer.filtered,
    isAuth: state.loginReducer.isAuth,
    user: state.loginReducer.userDetail,
    
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
