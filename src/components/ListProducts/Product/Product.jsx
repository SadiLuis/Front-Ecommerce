
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Product({title,price,description,image,category}) {
  return (
   <div>
    <p>{title}</p>
    <img src={image} alt={`imagen de ${title}`}/>
    <span>Precio:{price}</span>
    <p>{description}</p>
    <span>categoria:{category}</span>
  </div>
  )

}

export default Product;
