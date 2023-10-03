import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { ShoppingCartOne } from "../component/shoopingCartOne";
import "../../styles/shoppingCart.css";

export const ShoppingCart = (props) => {
  const { store, actions } = useContext(Context);
  const cart = store.orders;

  // call function checkout
  const handleCheckout = (items) => {
    actions.checkout(items);
  }

  return (
    <div className="min-height-100 container">
       <ShoppingCartOne cart={cart} actions={actions} onClick={handleCheckout} />
    </div>
  );
};