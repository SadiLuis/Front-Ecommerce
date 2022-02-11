import React from "react";
import styles from "./Paginado.module.css";

export default function Paginado({productsPerPage, productsAll, pagination}){
    const pageNumbers= []
<<<<<<< HEAD
    for (let i=0; i<Math.ceil(productsAll/productsPerPage); i++){
        pageNumbers.push(i + 1)
=======
    for (let i=1; i<=Math.ceil(productsAll/productsPerPage); i++){
        pageNumbers.push(i)
>>>>>>> 3964ec6cbffcce65ba54f8ee00d1428bfedfafa6
    }
    return (

        
        <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <ul className={styles.paginado}>
                        {pageNumbers && pageNumbers.map(number => {
                            return (
                                

                                <><li className={styles.number} key={number}>
                                    
                                    <a onClick={() => pagination(number)}>{number}</a>
                                    


                                </li><li class="page-item disabled">
                                    
                                        
                                        
                                        
                                    </li></>
                            );
                        })}
                    </ul>
                </ul>
            </nav>
        // <nav>
        //     <ul className={styles.paginado}>
        //         {pageNumbers && pageNumbers.map(number=>{
        //             return (
                        
        //                 <li className={styles.number} key={number}>
        //                     <a onClick={() => pagination(number)}>{number}</a>
                            

        //                 </li>
                    
        //             )
        //         })}
        //     </ul>
        // </nav>
    )
 }