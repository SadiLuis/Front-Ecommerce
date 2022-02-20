import React from "react";
import styles from "./Paginado.module.css";

export default function Paginado({ productsPerPage, filtered, pagination ,page}) {
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(filtered / productsPerPage); i++) {
    pageNumbers.push(i + 1);
  }
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <ul className={styles.paginado}>
          {pageNumbers &&
            pageNumbers.map((number) => {
              return (
                <div key={number}>
                  <ul className={styles.number} key={number}>
                  <button className={page === number ? styles.pagBoton : styles.boton} onClick={()=>pagination(number)}>{number}</button>
                  </ul>
                </div>
              );
            })}
        </ul>
      </ul>
    </nav>
  );
}
