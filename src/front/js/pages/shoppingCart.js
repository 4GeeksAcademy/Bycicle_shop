import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { ShoppingCartOne } from "../component/shoopingCartOne";
import { useTheme } from "../themeContext";
import "../../styles/shoppingCart.css";

export const ShoppingCart = (props) => {
  const { store, actions } = useContext(Context);
  const cart = store.orders;
  const { theme } = useTheme(); // Access theme

  // Define the handleCheckout function
  const handleCheckout = () => {
    // Call the checkout function from the actions object
    actions.checkout();
  }

  return (
    <div className="min-height-100 container-fluid shoppingcart-container " data-theme={theme}>
      <ShoppingCartOne cart={cart} actions={actions} onClick={() => handleCheckout(cart)} />
    </div>
  );
};