import React from "react";
import styles from "./Paginado.module.css";

export default function Paginado({ productsPerPage, productsAll, pagination }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(productsAll / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <ul className={styles.paginado}>
          {pageNumbers &&
            pageNumbers.map((number) => {
              return (
                <div key={number}>
                  <li className={styles.number} key={number}>
                    <span onClick={() => pagination(number)}>{number}</span>
                  </li>
                  <li className="page-item disabled"></li>
                </div>
              );
            })}
        </ul>
      </ul>
    </nav>
  );
}
