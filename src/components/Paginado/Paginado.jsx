import React from "react";
import styles from "./Paginado.module.css";

export default function Paginado({ productsPerPage, filtered, pagination }) {
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
                    <span onClick={() => pagination(number)}>{number}</span>
                  </ul>
                </div>
              );
            })}
        </ul>
      </ul>
    </nav>
  );
}
