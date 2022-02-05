import React,{ useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ListProducts from '../../components/ListProducts/ListProducts';

import ReactPaginate from "react-paginate";

import './styles.css';
//import { getAllProducts } from '../../actions';

function Home() {
    //paginado
    const[products, setProducts]=useState("");//puede que  haga falta el slice
    const[pageNumber, setPageNumber]=useState(0)

    const productsPerPage=10;
    const pagesVisited= pageNumber * productsPerPage;

    const displayProducts=products.slice(pagesVisited, pagesVisited + productsPerPage).map(product=>{
        return (
            <Container className='mt-3 home'>
                 <ListProducts />
            </Container>
        );
    })
    const pageCount= Math.ceil(products.length/productsPerPage);
    const changePage= ({selected})=>{
        setPageNumber(selected)

    }



//paginado
    return (
        <div className='mt-3 home'>{displayProducts}
        <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previouslinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        />
             
        </div>
    );
}

export default Home;
