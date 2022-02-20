import React, { useState, useEffect } from "react";
import { addItem, deleteItem } from "../../../actions";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import style from './Products.module.css'
import Swal from "sweetalert2";
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
 
}) {
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setInCart(cart?.find((el) => el.id === id));
  }, [cart, id]);
   
  const handleAdd = () =>{
    addItem(id)
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Producto agregado al carrito',
      showConfirmButton: false,
      timer: 1500
    })
  }

  const handleDelete = () =>{
    deleteItem(id)
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Producto eliminado del carrito',
      showConfirmButton: false,
      timer: 1500
    })

  }

  

  return (
    <div className={style.cardContainer}>
      <Link style={{textDecoration:'none'}}to={"/home/" + id}>
        <div className={style.productImg}>
        <img className={style.img} src={image} />
        </div>
           
          <h3 className={style.containerName}>{title}</h3>
          <Card.Text>{description}</Card.Text>
          <div className={style.containerRating}>
            <p> {category}</p>
            <p>Calificación  {rate}</p>
            <p> $ {price}</p>
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
    isAuth: state.loginReducer.isAuth
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
