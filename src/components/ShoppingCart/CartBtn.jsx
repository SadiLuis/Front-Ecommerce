import React from "react";
import { useSelector } from "react-redux";
import { BsCart3 } from "react-icons/bs";

function CartBtn() {
  const item = useSelector((state) => state.productsReducer.cart.products);

  return (
    <div>
      <BsCart3 />
      {item?.length}
    </div>
  );
}

export default CartBtn;
