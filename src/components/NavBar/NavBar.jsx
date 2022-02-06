import React, { useState } from 'react'
//import { useDispatch } from 'react-redux';

// import { useContext } from 'react';
// import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
//import { searchByName } from '../../actions';
import CartBtn from '../ShoppingCart/CartBtn'
import styles from "./NavBar.css"




export default function NavBar(){
  // const dispatch=useDispatch();
  // const [name, setName]=useState("");
  
  // function handleInputChange(e){
  //   e.preventDefault();
  //   setName(e.target.value)
  // }
  // function handleSubmit(e){
  //   e.preventDefault();
  //   if(!name){
  //     alert("Type the product you are looking for")
  //   }
  //   dispatch(searchByName(name))
  //   setName("")
  // }
    return (
        
        <nav class="navbar navbar-dark bg-dark">
          <div class="container-fluid">
          <a class="navbar-brand">Henry Ecommerce</a>
          <div className='navlink'>
        <   ul className='list'>
            <li className='list-item'>
    <NavLink  to="/home" >Home </NavLink>
    <NavLink  to="/login" >Log in </NavLink>
    <NavLink  to="/cart" > <CartBtn /> </NavLink>
    </li>
    </ul>
    </div>
    
    <SearchBar />
    
    
  </div>
</nav>
       
    )
}




