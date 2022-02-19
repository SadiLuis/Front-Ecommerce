import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./Profile.module.css";
import { Loader } from "../../components/Loader/Loader";
// import avatar from './utils/foto1.jpeg'
const Profile = () => {
  const user = useSelector((state) => state.loginReducer.userDetail);
  const {
    nombre,
    // avatar,
    usuario,
    email,
    pais,
    provincia,
    direccion,
    telefono,
  } = user || {};

  return user ? (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.cap}>
          <div className={styles.headerProfile}>
            <div className={styles.containerImage}>
              <div className={styles.image}></div>
            </div>
            <NavLink className={styles.edit_btn} to="/profile/edit">
              Editar
            </NavLink>
          </div>

          <div className={styles.Profile}>
            <h2>Mi Perfil</h2>
          </div>

          <div className={styles.containerInfo}>
            <div className={styles.titles}>
              <h5>Nombre</h5>
              <h5>Email</h5>
              <h5>Teléfono</h5>
              <h5>Usuario</h5>
              <h5>País</h5>
              <h5>Provincia</h5>
              <h5>Dirección</h5>
            </div>

            <div className={styles.infoProfile}>
              <h5>{nombre}</h5>
              <span className={styles.separate1} />
              <h5 className={styles.mail}>{email}</h5>
              <span className={styles.separate2} />
              <h5>{telefono}</h5>
              <span className={styles.separate3} />
              <h5>{usuario}</h5>
              <span className={styles.separate4} />
              <h5>{pais}</h5>
              <span className={styles.separate5} />
              <h5>{provincia}</h5>
              <span className={styles.separate6} />
              <h5>{direccion}</h5>
              <span className={styles.separate7} />
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Loader />
  );
};

export default Profile;
