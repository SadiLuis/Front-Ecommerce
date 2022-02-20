import React, { useState , useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { searchByName, logout,updateCart } from "../../actions";
import CartBtn from "../ShoppingCart/CartBtn";
import SearchBar from '../SearchBar/SearchBar';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

function NavBar({  setCurrentPage, isAuth, user, searchByName, logout,updateCart }) {
  const [flag , setFlag] = useState(false)
  const navigate = useNavigate();

  const handleLogout = () => {
    setFlag(true)
    logout();
    navigate("/home");
  };

 useEffect(() => {
   if(flag) updateCart()
   setFlag(false)
 })

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand">Henry Ecommerce</span>
        {/* <div className="navlink"> */}
          {/* <ul className="list">
            <li className="list-item"> */}
              <NavLink to="/home">Home </NavLink>
              {isAuth && user ? (
                <>
                  <button onClick={handleLogout}>Log out </button>
                  <NavLink to="/profile">Perfil</NavLink>
                </>
              ) : (
                <NavLink to="/login">Log in </NavLink>
              )}
              {user && user.rol === "2" && (
                <NavLink to="/dashboard/admin">Dashboard</NavLink>
              )}
              {user && user.rol === "2" && (
                <NavLink to="/dashboard/sales">Sales</NavLink>
              )}
              <NavLink to='/register' >Registrarse </NavLink>
              <NavLink to="/contactform">Contáctenos</NavLink>
              <NavLink to="/cart">
                <CartBtn />
              </NavLink>
            {/* </li>
          </ul> */}
        {/* </div> */}
        <form className="d-flex">
         <SearchBar/>
        </form>
      </div>
    </nav>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      searchByName,
      logout,
      updateCart
    },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.loginReducer.isAuth,
    user: state.loginReducer.userDetail,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
