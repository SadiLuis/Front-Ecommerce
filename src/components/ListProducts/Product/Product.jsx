import React, { useState, useEffect } from "react";
import { addItem, deleteItem ,deleteProductCart, putCart } from "../../../actions";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import style from './Products.module.css'
import Swal from "sweetalert2";
import './styleProduct.css'

function Product({
  id,
  title,
  price,
  description,
  image,
  category,
  rate,
  cantidad,
  cart,
  addItem,
  deleteItem,
  cartDB
 
}) {
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setInCart(cart?.find((el) => el.id === id));
  }, [cart, id]);
   
  const handleAdd =async () =>{
    
    addItem(id)
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Producto agregado al carrito',
      showConfirmButton: false,
      timer: 1500
    })
  }

  const handleDelete = async() =>{
    if(cartDB.id)  await  deleteProductCart(id,cartDB.id)
    deleteItem(id)
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Producto eliminado del carrito',
      showConfirmButton: false,
      timer: 1500
    })

  }

  // Máxima cantidad de estrellas
const maxStars = 5;

// Obtenemos el valor completo
const starPercentage = (rate / maxStars) * 100;

// Redondeamos el resultado si es decimal
const starPercentageRounded = Math.round(starPercentage);

// Creamos el estilo para que las estrellas amarillas
// se vean según el número que recibimos.
const StarStyles = () => {
    return {
        width: starPercentageRounded + "%"
    };
};


  const fixTitle = title.length > 27 ? title.slice(0,27) + ' ...' : title 
  
  return (
    <div className={style.cardContainer}>
      <Link style={{textDecoration:'none'}}to={"/home/" + id}>
        <div className={style.productImg}>
        <img className={style.img} src={image} />
        </div>
           
          <h3 className={style.containerName}>{fixTitle}</h3>
          <Card.Text>{description}</Card.Text>
          <div className={style.containerRating}>
            <p className={style.precio}> $ {price}</p>
            <p> {category}</p>
            <div className="stars-gray">
        <div className="stars-yellow" style={StarStyles()}></div>
           
          </div>
          </div>
        
      </Link>

      {cantidad === 0 ? (
        <div className={style.containerBtn}>
          <Button className={style.boton} variant="danger">Product out of stock</Button>
        </div>
      ) : inCart ? (
        <div className={style.containerBtn}>
        <Button className={style.boton} variant="primary" onClick={handleDelete }>
          Quitar del carrito
        </Button>
        </div>
      ) :  (
        <div className={style.containerBtn}>
        <Button className={style.boton}  variant="primary" onClick={handleAdd}>
          Añadir al carrito
        </Button>
        </div>
      ) 
    }
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addItem, deleteItem }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    cart: state.productsReducer.cart.products,
    isAuth: state.loginReducer.isAuth,
    cartDB: state.productsReducer.carts
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
