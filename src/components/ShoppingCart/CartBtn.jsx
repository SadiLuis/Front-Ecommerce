import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";

function CartBtn() {

  const item = useSelector(state => state.cartReducer.cart)

  return (
    <div>
      
        <BsCart3 />
        {item.length}
     
    </div>
  );
}

export default CartBtn;
