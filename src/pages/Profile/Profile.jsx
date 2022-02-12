import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.loginReducer.userDetail);
  const {
    nombre,
    avatar,
    usuario,
    email,
    pais,
    provincia,
    direccion,
    telefono,
  } = user || {};

  return user ? (
    <div>
      <div className="profile-photo">
        <img src={avatar} alt="Profile" />
      </div>
      <div>
        <h2>Nombre</h2>
        <p>{nombre}</p>
      </div>
      <div>
        <h2>Email</h2>
        <p>{email}</p>
      </div>
      <div>
        <h2>Telefono</h2>
        <p>{telefono}</p>
      </div>
      <div>
        <h2>Username</h2>
        <p>{usuario}</p>
      </div>
      <div>
        <h2>Pais</h2>
        <p>{pais}</p>
      </div>
      <div>
        <h2>Provincia</h2>
        <p>{provincia}</p>
      </div>
      <div>
        <h2>Direccion</h2>
        <p>{direccion}</p>
      </div>
      <NavLink to="/profile/edit">Editar perfil</NavLink>
    </div>
  ) : (
    <span>No hay datos</span>
  );
};

export default Profile;
