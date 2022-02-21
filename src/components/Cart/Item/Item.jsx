import React, { useState , useEffect } from "react";
import { addItem, deleteItem, restItem ,deleteProductCart } from "../../../actions/index";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import style from './Item.module.css'
import { Container, Button, Row, Col } from "react-bootstrap";
import { useDispatch ,useSelector} from "react-redux";
import Swal from "sweetalert2";

function Item({ id, title, price, image, stock, quantity }) {
  const [input, setInput] = useState(parseInt(quantity));
  const cartDB = useSelector(state => state.productsReducer.carts)
  let priceTotal = price * quantity;
  const dispatch = useDispatch();

  
 
  console.log(input)

  const handleChange = (e) => {
    // console.log(e);
    setInput(parseInt(e.target.value));
  };

  const handleButtonMas = () => {
    if (input < stock) {
      setInput((prev) => prev + 1);
      dispatch(addItem(id));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Se supero el limite de stock!',
        footer: 'cantidad disponible '+ stock
      })
    }
  };

  const handleButtonMenos = (e) => {
    // e.preventDefault();
    if (input > 1) {
      setInput((prev) => prev - 1);
      dispatch(restItem(id));
   
   };
  }  
  const handleDelete =async () => {
    // e.preventDefault();
    dispatch(deleteItem(id));
   await  deleteProductCart(id,cartDB.id)
  };
  

  const fixedPrice = Math.round((priceTotal + Number.EPSILON) * 100) / 100;
  const fixTitle = title.length > 50 ? title.slice(0,50) + ' ...' : title 
  return (
    <Container className={style.container}>
      <Button 
        className= {style.button}
        aria-label="Close"
        onClick={handleDelete}
      >X</Button>
       <img className={style.Img}
            src={image}
            alt={`imagen de ${title}`} />
       
            <div className={style.name}>
          <Link className={style.text} to={`/home/${id}`}>
            <p >{fixTitle}</p>
          </Link>
            </div>
           <div className={style.cantidad}> 
          <h3>Cantidad</h3>
          <Button onClick={handleButtonMenos}>-</Button>
          <input
            type="number"
            value={input}
            min={1}
            max={stock}
            // defaultValue={input}
            onChange={handleChange}
            disabled
          />
          <Button onClick={handleButtonMas}>+</Button>
          </div >
          <div className={style.precio}>
          <h3>Precio</h3>
          <h4>$ {fixedPrice}</h4>
          </div>
       
    </Container>
  );
}

export default Item;
