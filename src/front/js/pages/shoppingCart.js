import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { ShoppingCartOne } from "../component/shoopingCartOne";
import { ThanksMessage } from "../component/thanksMessage";
import "../../styles/shoppingCart.css";

export const ShoppingCart = () => {
  const { actions } = useContext(Context);

    // call function checkout
  const handleCheckout = () => {
    actions.checkout(name, manufacturer, material, type, color, wheight, price, instock, quantity, reviews) ;
  }

  return (
    <div className="min-height-100 container">
        <ShoppingCartOne onClick={() => handleCheckout()} />
        <ThanksMessage /> 
    </div>
  );
};