// import { useContext } from "react";
// import { Badge, Container, Nav, Navbar } from "react-bootstrap";
// import { Link } from "react-router-dom";
import React from "react";

// import { useContext } from 'react';
// import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
//import { searchByName } from '../../actions';
import CartBtn from "../ShoppingCart/CartBtn";
// import styles from "./NavBar.css";

export default function NavBar() {
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
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="ºnavbar-brand">Henry Ecommerce</span>
        <div className="navlink">
          <ul className="list">
            <li className="list-item">
              <NavLink to="/home">Home </NavLink>
              <NavLink to="/login">Log in </NavLink>
              <CartBtn />
              {/* <NavLink to="/cart">
              </NavLink> */}
            </li>
          </ul>
        </div>
        <SearchBar />
      </div>
    </nav>
  );
}
