

import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

// import { useContext } from 'react';
// import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { searchByName } from '../../actions';
import { BsCart3 } from "react-icons/bs";
import styles from "./NavBar.css"




export default function NavBar(){
  const dispatch=useDispatch();
  const [name, setName]=useState("");
  
  function handleInputChange(e){
    e.preventDefault();
    setName(e.target.value)
  }
  function handleSubmit(e){
    e.preventDefault();
    if(!name){
      alert("Type the product you are looking for")
    }
    dispatch(searchByName(name))
    setName("")
  }
    return (
        
        <nav class="navbar navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand">Henry Ecommerce</a>
    <div className='navlink'>
        <ul className='list'>
            <li className='list-item'>
    <NavLink  to="/home" >Home </NavLink>
    <NavLink  to="/login" >Log in </NavLink>
    <NavLink  to="/cart" >Cart<BsCart3></BsCart3> </NavLink>
    </li>
    </ul>
    </div>
    <form class="d-flex"> 
       <input class="form-control me-2" type="search"   onChange={handleInputChange} placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success" type="submit" onClick={handleSubmit}
      
      >Search</button> 
     </form>
    
    
  </div>
</nav>
       
    )
}





