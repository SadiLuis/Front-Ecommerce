import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { searchByName, logout } from "../../actions";
import CartBtn from "../ShoppingCart/CartBtn";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

<<<<<<< Updated upstream
function NavBar({ isAuth, user, searchByName, logout }) {
  const [name, setName] = useState("");
=======

function NavBar({  setCurrentPage, isAuth, user, searchByName, logout }) {
  
>>>>>>> Stashed changes
  const navigate = useNavigate();

  function handleChange(e) {
    setName(e.target.value);
  }

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) {
      alert("Type the product you are looking for");
    }

    searchByName(name);
    setName("");
  }

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand">Henry Ecommerce</span>
<<<<<<< Updated upstream
        <div className="navlink">
          <ul className="list">
            <li className="list-item">
              <NavLink to="/home">Home </NavLink>
=======
        {/* <div className="navlink"> */}
          {/* <ul className="list">
            <li className="list-item"> */}
              <NavLink to="/home"  style={{
                color: "white",
                textDecoration: "none",
                fontSize: "20px",
                
              }} 
              >
                Home 
              </NavLink>
>>>>>>> Stashed changes
              {isAuth && user ? (
                <>
                  <button onClick={handleLogout}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "white",
                    fontSize: "1.2rem",
                    marginLeft: "1rem"
                  }}
                  >
                    Log out 
                  </button>
                  <NavLink to="/profile"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "20px",
                    
                  }} 
                  >
                    Perfil
                  </NavLink>
                </>
              ) : (
                <NavLink to="/login"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "20px",
                  
                }} 
                >
                  Log in 
                </NavLink>
              )}
              {user && user.rol === "2" && (
                <NavLink to="/dashboard/admin"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "20px",
                  
                }} 
                >
                  Dashboard
                </NavLink>
              )}
<<<<<<< Updated upstream
              <NavLink to="/cart">
                <CartBtn />
              </NavLink>
            </li>
          </ul>
        </div>
=======
              {user && user.rol === "2" && (
                <NavLink to="/dashboard/sales"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "20px",
                  
                }} 
                >
                  Sales
                </NavLink>
              )}
              <NavLink to="/cart"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "20px",
                
              }} 
              >
                <CartBtn />
              </NavLink>
              <NavLink to="/contactform"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "20px",
                
              }} 
              >
                Contáctenos
              </NavLink>
            {/* </li>
          </ul> */}
        {/* </div> */}
>>>>>>> Stashed changes
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            vale={name}
            onChange={handleChange}
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            onClick={handleSubmit}
          >
            Search
          </button>
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
