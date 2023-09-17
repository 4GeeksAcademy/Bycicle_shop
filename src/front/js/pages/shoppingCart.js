import React, { useEffect, useState } from "react";
import { ShoppingCartOne } from "../component/shoopingCartOne";
import { ShoppingCartTwo } from "../component/shoopingCartTwo";
import { ShoppingCartThree } from "../component/shoopingCartThree";
import { ShoppingCartFour } from "../component/shoopingCartFour";
import { ThanksMessage } from "../component/thanksMessage";
import "../../styles/shoppingCart.css";
import { useParams } from "react-router-dom";

export const ShoppingCart = () => {
  const [showShoppingCart, setShowShoppingCart] = useState('cartOne');
  const params = useParams();

  // Function to return the previous page
  const handlePreviousClick = () => {
    if (showShoppingCart === 'cartThree') {
      setShowShoppingCart('cartTwo');
      } else if (showShoppingCart === 'cartFour') {
        setShowShoppingCart('cartThree');
    }
  };

  useEffect(() => {
    setShowShoppingCart('cartOne')
  }, [])

  return (
    <div className="min-height-100 container">
      {showShoppingCart === 'cartOne' ? (
        <ShoppingCartOne onClick={() => setShowShoppingCart('cartTwo')}  />
      ) : null}
      {showShoppingCart === 'cartTwo' ? (
        <ShoppingCartTwo onClick={() => setShowShoppingCart('cartThree')} />
      ) : null}
      {showShoppingCart === 'cartThree' ? (
        <ShoppingCartThree onClick={() => setShowShoppingCart('cartFour')} onPreviousClick={() => handlePreviousClick()} />
      ) : null}
      {showShoppingCart === 'cartFour' ? (
        <ShoppingCartFour onClick={() => setShowShoppingCart('thanksMessage')} onPreviousClick={() => handlePreviousClick()} />
      ) : null}
      {showShoppingCart === 'thanksMessage' ? <ThanksMessage /> : null}
    </div>
  );
};