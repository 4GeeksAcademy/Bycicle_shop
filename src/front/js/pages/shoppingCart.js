import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { ShoppingCartOne } from "../component/shoopingCartOne";
import "../../styles/shoppingCart.css";

export const ShoppingCart = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");

  // call function checkout
  const handleCheckout = () => {
    actions.checkout(email);
  }

  return (
    <div className="min-height-100 container">
      <ShoppingCartOne onClick={handleCheckout} />
    </div>
  );
};