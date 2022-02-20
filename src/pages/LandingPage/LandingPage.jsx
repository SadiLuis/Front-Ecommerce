import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import LogoHome from "../../assets/home.png";
import LogoLogin from "../../assets/login.png";
import LogoContact from "../../assets/contacto.png";
import CarBuy from "../../assets/carro3.png";

function LandingPage() {
  return (
    <section className={styles.contain}>
      <div className={styles.subcontain}>
        <div className={styles.partLeft}>
          <div className={styles.curveExt}>
            <div>
              <Link to={"/home"}>
                <img
                  className={styles.logoHome}
                  src={LogoHome}
                  alt="Logo Home"
                />
              </Link>
            </div>

            <span className={styles.separate1}></span>

            <div>
              <Link to={"/login"}>
                <img
                  className={styles.logoLogin}
                  src={LogoLogin}
                  alt="Logo Login"
                />
              </Link>
            </div>

            <span className={styles.separate2}></span>

            <div>
              <Link to={"/contactform"}>
                <img
                  className={styles.logoContact}
                  src={LogoContact}
                  alt="Logo Contact"
                />
              </Link>
            </div>

            <div className={styles.curveIn}></div>
          </div>

          <div className={styles.containCircle}>
            <div>
              <img className={styles.imageCar} src={CarBuy} alt="Car Buy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
