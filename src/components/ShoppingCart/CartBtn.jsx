import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";

function CartBtn() {
  const item = useSelector((state) => state.cart);
  return (
    <div>
      <Link to="/cart">
        <BsCart3 />
        {item.length}
      </Link>
    </div>
  );
}

export default CartBtn;
