import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import {
  getAllProducts,
  getCategories,
  filterByCategory,
  orderByPrice,
  orderByRate,
} from "../../actions/index";
import Product from "../../components/ListProducts/Product/Product";
import Paginado from "../../components/Paginado/Paginado";
import "./styles.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const Home = ({
  allProducts,
  categories,
  filtered,
  getAllProducts,
  getCategories,
  filterByCategory,
  orderByPrice,
  orderByRate,
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

  const pagination = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  useEffect(() => {
    getCategories();
    getAllProducts();
  }, [getCategories, getAllProducts]);

  function handleClick(e) {
    e.preventDefault();
    getAllProducts();
    //resetea para que traiga todos los games de nuevo cuando se buggea
  }

  function handleFilterByCategories(e) {
    e.preventDefault();
    filterByCategory(e.target.value);
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleOrderByPrice(e) {
    e.preventDefault();
    orderByPrice(e.target.value);
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleOrderByRate(e) {
    e.preventDefault();
    orderByRate(e.target.value);
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <>
      <Container>
        <h4>Show all the products</h4>
        <button type="button" className="btn btn-primary" onClick={handleClick}>
          Products
        </button>

        <div className="filters">
          <label>Choose products by categories:</label>
          <select
            name="filterbycategories"
            defaultValue={"default"}
            onChange={(e) => handleFilterByCategories(e)}
          >
            <option value="all">All Categories</option>
            {categories &&
              categories.length &&
              categories.map((category) => {
                return (
                  <option key={category.id} value={category.nombre}>
                    {category.nombre}
                  </option>
                );
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
          allProducts={allProducts.length}
          pagination={pagination}
        />

        <div className="home">
          {currentProducts &&
            currentProducts.length &&
            currentProducts.map((p) => {
              return (
                <Product
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  price={p.price}
                  image={p.image}
                  category={p.category}
                  rate={p.rate}
                />
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
    },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    allProducts: state.productsReducer.allProducts,
    categories: state.productsReducer.categories,
    filtered: state.productsReducer.filtered,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
