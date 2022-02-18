import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register, updateUser ,postCart} from "../../actions/index";
import style from "./styles/Register.module.css";
import Swal from "sweetalert2";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {getCartLocalStorage} from '../../helpers/localstorage'

const initialForm = {
  nombre: "",
  usuario: "",
  contrasena: "",
  confirm_contrasena: "",
  email: "",
  pais: "",
  provincia: "",
  direccion: "",
  telefono: "",
};

const validateform = function (form) {
  const errors = {};
  if (!form.nombre.trim()) {
    errors.nombre = "Campo requerido";
  }
  if (!form.usuario.trim()) {
    errors.usuario = "Campo requerido";
  }
  if (!form.contrasena.trim()) {
    errors.contrasena = "Campo requerido";
  }
  if (!form.email.trim()) {
    errors.email = "Campo requerido";
  }
  if (!form.pais.trim()) {
    errors.pais = "Campo requerido";
  }
  if (!form.provincia.trim()) {
    errors.provincia = "Campo requerido";
  }
  if (!form.direccion.trim()) {
    errors.direccion = "Campo requerido";
  }
  if (!form.telefono.trim()) {
    errors.telefono = "Campo requerido";
  }
  if (form.confirm_contrasena !== form.contrasena) {
    errors.telefono = "Las contraseñas no coinciden";
  }
  return errors;
};

function Createform({ updateUser, register, isAuth, user, edit = false }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(
    edit ? { ...user, confirm_contrasena: "", contrasena: "" } : initialForm
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newform = { ...form, [name]: value };
    setForm(newform);
    const errors = validateform(newform, edit);
    setErrors(errors);
    return newform;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateform(form, edit);

    if (Object.keys(errors).length) {
      return Swal.fire({
        text: `El formulario contiene errores`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }

    const userForm = { ...form };
    delete userForm.confirm_contrasena;

    edit ? updateUser(userForm) : register(userForm);
  };
  const cartDB = async() =>{
    const localS = getCartLocalStorage()
    const cartdb = await localS.products?.map( (el) =>  postCart(el))
    console.log(localS)
    return cartdb
   }

  useEffect(() => {
    // Si ya está logueado que lo redireccione al dashboard
    if (isAuth && user && !edit) {
      setForm(initialForm);
      const { nombre, rol } = user;
      Swal.fire({
        text: `Welcome ${nombre}`,
        icon: "success",
        confirmButtonText: "Ok",
      });
      cartDB()
      if (rol === "1") return navigate("/dashboard/login");
      if (rol === "2") return navigate("/dashboard/admin");
    }
  }, [isAuth, navigate, user, edit]);

  return (
    <div className={style.bkg}>
      <h1 className={style.register}>{edit ? "NUEVOS DATOS" : "REGISTRO"}</h1>
      <div className={style.container}>
        <div className={style.form}>
          <form onSubmit={handleSubmit}>
            <div className={style.section}>
              <h4>Nombre</h4>
              <input
                type="text"
                name="nombre"
                className={style.input}
                onChange={handleChange}
                placeholder="Juan Perez"
                value={form.nombre}
                autoComplete="off"
              />
              {errors.nombre && <p className={style.error}>{errors.nombre}</p>}
            </div>
            <div className={style.section}>
              <h4>Correo electrónico</h4>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="juanito@gmail.com"
                value={form.email}
                className={style.input}
                autoComplete="off"
              />
              {errors.email && <p className={style.error}>{errors.email}</p>}
            </div>
            <div className={style.section}>
              <h4>País</h4>
              <input
                type="text"
                name="pais"
                className={style.input}
                onChange={handleChange}
                placeholder="Argentina"
                value={form.pais}
                autoComplete="off"
              />
              {errors.pais && <p className={style.error}>{errors.pais}</p>}
            </div>
            <div className={style.section}>
              <h4>Provincia</h4>
              <input
                type="text"
                name="provincia"
                className={style.input}
                onChange={handleChange}
                placeholder="Buenos Aires"
                value={form.provincia}
                autoComplete="off"
              />
              {errors.provincia && (
                <p className={style.error}>{errors.provincia}</p>
              )}
            </div>
            <div className={style.section}>
              <h4>Dirección</h4>
              <input
                type="text"
                name="direccion"
                className={style.input}
                onChange={handleChange}
                placeholder="Av. Occidental y Manuelita Cañizares"
                value={form.direccion}
                autoComplete="off"
              />
              {errors.direccion && (
                <p className={style.error}>{errors.direccion}</p>
              )}
            </div>
            <div className={style.section}>
              <h4>Teléfono</h4>
              <input
                type="tel"
                name="telefono"
                className={style.input}
                onChange={handleChange}
                placeholder="0912345678"
                value={form.telefono}
                autoComplete="off"
              />
              {errors.telefono && (
                <p className={style.error}>{errors.telefono}</p>
              )}
            </div>
            <div className={style.section}>
              <h4>Usuario</h4>
              <input
                type="text"
                name="usuario"
                className={style.input}
                onChange={handleChange}
                placeholder="JuanPerez001"
                value={form.usuario}
                autoComplete="off"
              />
              {errors.usuario && (
                <p className={style.error}>{errors.usuario}</p>
              )}
            </div>
            <div className={style.section}>
              <h4>Contraseña</h4>
              <input
                type="password"
                name="contrasena"
                className={style.input}
                onChange={handleChange}
                placeholder="**************"
                value={form.contrasena}
                autoComplete="off"
              />
              {errors.contrasena && (
                <p className={style.error}>{errors.contrasena}</p>
              )}
            </div>
            <div className={style.section}>
              <h4>Confirmar contraseña</h4>
              <input
                type="password"
                name="confirm_contrasena"
                className={style.input}
                onChange={handleChange}
                placeholder="**************"
                value={form.confirm_contrasena}
                autoComplete="off"
              />
              {errors.confirm_contrasena && (
                <p className={style.error}>{errors.confirm_contrasena}</p>
              )}
            </div>
            <input
              type="submit"
              value={edit ? "Guardar cambios" : "Registrarse"}
            />
          </form>
        </div>
      </div>
      {!edit && (
        <div>
          <Link to="/login">Ya tienes una cuenta? Login</Link>
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ register, updateUser }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.loginReducer.isAuth,
    user: state.loginReducer.userDetail,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Createform);
