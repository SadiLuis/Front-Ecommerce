import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { searchByName, logout } from "../../actions";
import CartBtn from "../ShoppingCart/CartBtn";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

function NavBar({ isAuth, user, searchByName, logout }) {
  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

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
        <div className="navlink">
          <ul className="list">
            <li className="list-item">
              <NavLink to="/home">Home </NavLink>
              {isAuth && user ? (
                <>
                  <button onClick={logout}>Log out </button>
                  <NavLink to="/profile">Perfil</NavLink>
                </>
              ) : (
                <NavLink to="/login">Log in </NavLink>
              )}
              <NavLink to="/cart">
                <CartBtn />
              </NavLink>
            </li>
          </ul>
        </div>
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
