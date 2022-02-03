
import React from 'react'
// import { useContext } from 'react';
// import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { BsCart3 } from "react-icons/bs";
import styles from "./NavBar.css"




export default function NavBar(){
    return (
        
        <nav class="navbar navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand">Henry Ecommerce</a>
    <div className='navlink'>
        <ul className='list'>
            <li className='list-item'>
    <NavLink  to="/home" >Home </NavLink>
    <NavLink  to="/user" >Log in </NavLink>
    <NavLink  to="/cart" >Cart<BsCart3></BsCart3> </NavLink>
    </li>
    </ul>
    </div>
    <form class="d-flex">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success" type="submit" >Search</button>
    </form>
    
  </div>
</nav>
       
    )
}



