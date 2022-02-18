import React, { useEffect, useState } from "react";
import { login, postCart } from "../../actions/index";
import {useSelector} from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import {getCartLocalStorage} from '../../helpers/localstorage'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
   
const initialForm = {
  contrasena: "",
  email: "",
};

const validateForm = (form) => {
  const { email, contrasena } = form;
  const errors = {};

  if (email.trim().length === 0) {
    errors.email = "El email es requerido";
  }

  if (!contrasena.trim()) {
    errors.contrasena = "La contraseña es requerida";
  }

  return errors;
};

const Login = ({ login, isAuth, user , cart}) => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState({});
 
  const handleChange = (e) => {
    const { name, value } = e.target;

    const newForm = { ...form, [name]: value };

    setForm(newForm);
    setError(validateForm(newForm));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(form);
    setError(errors);

    if (Object.keys(errors).length) {
      return window.alert("El formulario contiene errrores");
    }
     login(form);
    
  };

 const cartDB = async() =>{
   const localS = getCartLocalStorage()
   const cartdb = await localS.products?.map( (el) =>  postCart(el))
   console.log(localS)
   return cartdb
  }
   
  useEffect(() => {
    // Si ya está logueado que lo redireccione al dashboard
    if (isAuth && user) {
      const { rol } = user;
      setForm(initialForm);
      rol === "2" ? navigate("/dashboard/admin") : navigate("/home");
      cartDB()
    }
  }, [isAuth, navigate, user,cartDB]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Correo:</label>
        <input
          type="email"
          onChange={handleChange}
          name="email"
          value={form.email}
        />
        {error.email && <span>{error.email}</span>}
        <label>Contraseña:</label>
        <input
          type="password"
          onChange={handleChange}
          name="contrasena"
          value={form.contrasena}
        />
        {error.contrasena && <span>{error.contrasena}</span>}
        <input type="submit" value="Ingresar" />
      </form>

      <div>
        <Link to="/register">Aún no tienes una cuenta? Registrate</Link>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ login }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.loginReducer.isAuth,
    user: state.loginReducer.userDetail,
    cart: state.productsReducer.cart.products,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
