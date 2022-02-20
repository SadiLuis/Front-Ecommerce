import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register, updateUser } from "../../actions/index";
import style from "./styles/Register.module.css";
import Swal from "sweetalert2";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";

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
      if (rol === "1") return navigate("/dashboard/user");
      if (rol === "2") return navigate("/dashboard/admin");
    }
  }, [isAuth, navigate, user, edit]);

  return (
    <div className={style.bkg}>
      <h1 className={style.register}>{edit ? "NUEVOS DATOS" : "REGISTRO"}</h1>
      <div>
        <div className={style.conteiner} >
          <Form className="rounded p-4 p-sm-3"  onSubmit={handleSubmit} >
          <Row className="mb-3" >
            <Form.Group className="mb-3" as={Col} md="4" >
              <Form.Label  className={style.section}> Nombre </Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className={style.input}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombre}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" as={Col} md="4" >
              <Form.Label className={style.section}> Usuario </Form.Label>
              <Form.Control
                type="text"
                name="usuario"
                value={form.usuario}
                onChange={handleChange}
                className={style.input}
              />
              <Form.Control.Feedback type="invalid">
                {errors.usuario}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" as={Col} md="4">
              <Form.Label className={style.section} > Contraseña </Form.Label>
              <Form.Control
                type="password"
                name="contrasena"
                value={form.contrasena}
                onChange={handleChange}
                className={style.input}
              />
              <Form.Control.Feedback type="invalid">
                {errors.contrasena}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" as={Col} md="4" >
              <Form.Label className={style.section} > Confirmar Contraseña </Form.Label>
              <Form.Control
                type="password"
                name="confirm_contrasena"
                value={form.confirm_contrasena}
                onChange={handleChange}
                className={style.input}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirm_contrasena}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group  className="mb-3" as={Col} md="4" >
              <Form.Label className={style.section}> Email </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={style.input}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>  
              </Form.Group>  

              <Form.Group className="mb-3" as={Col} md="4" >
              <Form.Label className={style.section}> País </Form.Label>
              <Form.Control
                type="text"
                name="pais"
                value={form.pais}
                onChange={handleChange}
                className={style.input}
               /> 
               <Form.Control.Feedback type="invalid">
                {errors.pais}
              </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" as={Col} md="4" >
              <Form.Label className={style.section} > Provincia </Form.Label>
              <Form.Control
                type="text"
                name="provincia"
                value={form.provincia}
                onChange={handleChange}
                className={style.input}
                />
                <Form.Control.Feedback type="invalid">
                {errors.provincia}
              </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" as={Col} md="4" >
              <Form.Label className={style.section}> Dirección </Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                className={style.input}
                />
                <Form.Control.Feedback type="invalid">
                {errors.direccion}
              </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" as={Col} md="4" >
              <Form.Label className={style.section}> Teléfono </Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                className={style.input}
                />
                <Form.Control.Feedback type="invalid">
                {errors.telefono}
              </Form.Control.Feedback>
              </Form.Group>
          </Row>


          <Form.Group className="mb-3">
            <Form.Check
              className={style.check}
              type="checkbox"
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group>

          <input
              type="submit"
              value={edit ? "Guardar cambios" : "Registrarse"}
              className={style.btn}
            />

      {!edit && (
        <div>
          <h5> Ya tienes cuenta?</h5>
          <Link to="/login" className={style.link} > Ingresar</Link>
        </div>
      )}
          </Form>
              

        </div>
       
      </div>
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

