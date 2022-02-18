import React, { useEffect, useState } from "react";
import { login } from "../../actions/index";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import style from './Style/LoginAdm.module.css'
import img from './Style/img/pc.jpg'

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

const Login = ({ login, isAuth, user }) => {
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

  useEffect(() => {
    // Si ya está logueado que lo redireccione al dashboard
    if (isAuth && user) {
      const { rol } = user;
      setForm(initialForm);
      rol === "2" ? navigate("/dashboard/admin") : navigate("/home");
    }
  }, [isAuth, navigate, user]);

  return (
    <>
        <img src={img} alt="logo" className={style.img}/>
      <Form onSubmit={handleSubmit}  className={style.conteiner} >
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2" className={style.label} >
            Email
          </Form.Label>
          <Col sm="10">
          <input
          type="email"
          onChange={handleChange}
          name="email"
          value={form.email}
          className={style.email}
        />
          </Col>
          {error.email && <span>{error.email}</span>}
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2" className={style.label} >
            Contraseña
          </Form.Label>
          <Col sm="10">
          <input
          type="password"
          onChange={handleChange}
          name="contrasena"
          value={form.contrasena}
          className={style.contraseña}
        />
          </Col>
          {error.contrasena && <span>{error.contrasena}</span>}
        </Form.Group>

        <input type="submit" value="Ingresar" className={style.btn} />


          <h4>Aún no te has registrado? </h4>
        <Link to="/register"  className={style.btn} >Registrarse</Link>

      </Form>

  

      
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
