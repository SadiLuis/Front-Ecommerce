import React, { useEffect, useState } from "react";
import { login } from "../../actions/index";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Swal from "sweetalert2";

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
      setForm(initialForm);
      const { nombre, rol } = user;
      Swal.fire({
        text: `Welcome ${nombre}`,
        icon: "success",
      });
      if (rol === "1") return navigate("/dashboard/user");
      if (rol === "2") return navigate("/dashboard/admin");
    }
  }, [isAuth, navigate, user]);

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
