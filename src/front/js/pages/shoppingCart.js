import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { ShoppingCartOne } from "../component/shoopingCartOne";
import "../../styles/shoppingCart.css";

export const ShoppingCart = () => {
  const { actions } = useContext(Context);
  const [items, setItems] = useState("");
  
  // call function checkout
  const handleCheckout = () => {
    actions.checkout(items);
  }

  return (
    <div className="min-height-100 container">
      <ShoppingCartOne onClick={handleCheckout} />
    </div>
  );
};