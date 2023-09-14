import React, { useState } from "react";
import { ShoppingCartOne } from "../component/shoopingCartOne";
import { ShoppingCartTwo } from "../component/shoopingCartTwo";
import { ShoppingCartThree } from "../component/shoopingCartThree";
import { ShoppingCartFour } from "../component/shoopingCartFour";
import "../../styles/shoppingCart.css";
import { useParams } from "react-router-dom";

export const ShoppingCart = () => {
  const [shoppingCartOneDetails, setShoppingCartOneDetails] = useState(true);
  const [shoppingCartTowDetails, setShoppingCartTowDetails] = useState(false);
  const [shoppingCartThreeDetails, setShoppingCartThreeDetails] = useState(false);
  const [shoppingCartFourDetails, setShoppingCartFourDetails] = useState(false);
  const params = useParams();

  // Function to handle the click event and show ShoppingCartTowDetails
  const onCheckOutClick1 = () => {
    setShoppingCartTowDetails(true);
    setShoppingCartOneDetails(false);
  };

   // Function to handle the click event and show ShoppingCartTowDetails
   const onCheckOutClick2 = () => {
    setShoppingCartThreeDetails(true);
    setShoppingCartTowDetails(false);
  };

  // Function to handle the click event and show ShoppingCartTowDetails
  const onCheckOutClick3 = () => {
    setShoppingCartFourDetails(true);
    setShoppingCartThreeDetails(false);
  };

  return (
    <div className="container">
      {shoppingCartOneDetails ? (
        <ShoppingCartOne onCheckOutClick1={onCheckOutClick1} />
      ) : null}
      {shoppingCartTowDetails ? 
        <ShoppingCartTwo onCheckOutClick2={onCheckOutClick2} />
      : null}
      {shoppingCartThreeDetails ? 
      <ShoppingCartThree onCheckOutClick3={onCheckOutClick3} />
      : null}
      {shoppingCartFourDetails ? <ShoppingCartFour /> : null}
    </div>
  );
};