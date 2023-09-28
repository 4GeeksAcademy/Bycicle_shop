import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { ShoppingCartOne } from "../component/shoopingCartOne";
import { useSearchParams } from "react-router-dom";
import "../../styles/shoppingCart.css";

export const ShoppingCart = () => {
  const { actions } = useContext(Context);
  const [searchParams] = useSearchParams();

  // call function checkout
  const handleCheckout = () => {
    actions.checkout();
  }

  return (
    <div className="min-height-100 container">
      <ShoppingCartOne onClick={handleCheckout} />
    </div>
  );
};