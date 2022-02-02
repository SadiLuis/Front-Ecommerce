
import React from 'react'
// import { useContext } from 'react';
// import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { BsCart3 } from "react-icons/bs";




export default function NavBar(){
    return (
        <header>
            <div>
                <nav>
                    <ul className='list'> 
                    <li className='list-item'>
                        <h1> Henry Ecommerce</h1>
                <NavLink to= "/home" >Home </NavLink>   
                <NavLink to="/user">User</NavLink>
                <NavLink to= "/cart">Cart <BsCart3/></NavLink>
                <SearchBar/>
                </li>
                </ul>
                </nav>
            </div>
        </header>
    )
}



