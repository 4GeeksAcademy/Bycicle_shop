import React, { useState } from "react";
import { ShoppingCartOne } from "../component/shoopingCartOne";
import { ShoppingCartTwo } from "../component/shoopingCartTwo";
import { ShoppingCartThree } from "../component/shoopingCartThree";
import { ShoppingCartFour } from "../component/shoopingCartFour";
import { ThanksMessage } from "../component/thanksMessage";
import "../../styles/shoppingCart.css";
import { useParams } from "react-router-dom";

export const ShoppingCart = () => {
  const [showShoppingCart, setShowShoppingCart] = useState('cartOne'); // Corrected variable name
  const params = useParams();

  // Function to return the previous page
  const PreviousPage = () => {
    if (showShoppingCart === 'cartThree') { // Corrected condition
      setShowShoppingCart('cartTow');
    } else if (showShoppingCart === 'cartFour') {
      setShowShoppingCart('cartThree');
    }
  };

  return (
    <div className="container">
      {showShoppingCart === 'cartOne' ? (
        <ShoppingCartOne onClick={() => setShowShoppingCart('cartTwo')} />
      ) : null}
      {showShoppingCart === 'cartTwo' ? (
        <ShoppingCartTwo onClick={() => setShowShoppingCart('cartThree')} />
      ) : null}
      {showShoppingCart === 'cartThree' ? (
        <ShoppingCartThree onClick={() => setShowShoppingCart('cartFour')} />
      ) : null}
      {showShoppingCart === 'cartFour' ? (
        <ShoppingCartFour onClick={() => setShowShoppingCart('thanksMessage')} />
      ) : null}
      {showShoppingCart === 'thanksMessage' ? <ThanksMessage /> : null}
    </div>
  );
};