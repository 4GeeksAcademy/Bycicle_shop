import React, { useState } from "react";
import { ShoppingCartOne } from "../component/shoopingCartOne";
import { ShoppingCartTwo } from "../component/shoopingCartTwo";
import { ShoppingCartThree } from "../component/shoopingCartThree";
import { ShoppingCartFour } from "../component/shoopingCartFour";
import "../../styles/shoppingCart.css";
import { useParams } from "react-router-dom";

export const ShoppingCart = () => {
  const [showShoopingCart, setShowShoppingCart] = useState('cartOne');
  const params = useParams();

  return (
    <div className="container">
      {showShoopingCart == 'cartOne' ? (
        <ShoppingCartOne onClick={() => setShowShoppingCart('cartTwo')} />
      ) : null}
      {showShoopingCart == 'cartTwo'  ? 
        <ShoppingCartTwo onClick={() => setShowShoppingCart('cartThree')}  />
      : null}
      {showShoopingCart == 'cartThree' ? 
      <ShoppingCartThree onClick={() => setShowShoppingCart('cartFour')}  />
      : null}
      {showShoopingCart == 'cartFour'  ? <ShoppingCartFour /> : null}
    </div>
  );
};