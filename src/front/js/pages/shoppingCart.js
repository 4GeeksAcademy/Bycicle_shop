import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { ShoppingCartOne } from "../component/shoopingCartOne";
import "../../styles/shoppingCart.css";

export const ShoppingCart = () => {
  const { actions } = useContext(Context);
  const [items, setItems] = useState([
    { price: 'price_1NuJw3BQV4wKuzoZTMjEgqOx', quantity: '1' },
    // Add more items as needed
  ]);

  // call function checkout
  const handleCheckout = () => {
    setItems(items);
    actions.checkout(items);
  }

  return (
    <div className="min-height-100 container">
      <ShoppingCartOne onClick={handleCheckout} />
    </div>
  );
};