import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import CartItem from "./cartItem";
import "../../styles/shoppingCart.css";
import { useTheme } from "../themeContext"; 

export const ShoppingCartOne = (props) => {
  const [textarea, setTextarea] = useState("");
  const { store, actions } = useContext(Context);
  const { theme } = useTheme();

  const textareaClick = () => {
    const note = textarea;
    console.log('Textarea clicked');
    actions.sendNoteToServer(note);
    setTextarea("");
  };
  // Function to render the items in the cart
  const renderCartItems = () => {
    if (!store.cart || store.cart.length === 0) {
        return <p className="cart">Your cart is empty.</p>;
    }

    return store.cart.map((item, index) => (
        <CartItem item={item} index={index} key={index} />
    ));
    }
    
  return (
    <div className="container min-height-100 shoppingcart-container" data-theme={theme}>
      <br />
      <div>
        <h1 className="cart-title">Shopping Cart</h1>
      </div>
      <div>
        <div className="cart-description">
          <div className="product-order1">
            <p>Product</p>
            <p className="price">Price</p>
          </div>
          <div className="product-order2">
            <p className="quantity">Quantity</p>
            <p className="price">Total</p>
          </div>
        </div>
        {renderCartItems()}
      </div>
      <div className="row">
        <form className="col-sm-6 col-md-6 col-lg-6" onSubmit={textareaClick}>
          <div className="cart-form">
            <label>Add a note to your order:</label>
            <br />
            <textarea
              className="form-control mt-2"
              id="exampleFormControlTextarea1"
              rows="6"
              value={textarea}
              onChange={(e) => setTextarea(e.target.value)}
            ></textarea>
          </div>
          <div className="d-flex mt-2">
            <input
              className="bg-dark form-shooping "
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <Link className="link" to="/terms">
              <p className="link-shopping ">
                I approve terms and conditions
              </p>
            </Link>
          </div>
        </form>
        <div className="btn-set-check col-sm-6 col-md-6 col-lg-6">
          <button
            className="btn-Check col-sm-6 col-md-6 col-lg-12 mb-3"
            type="submit"
            id="checkout"
            aria-label="checkout"
            onClick={() => props.onClick()} // Call the onClick function directly
          >
            Check Out
          </button>
          <Link className="link-shopping" to="/">
            <button className="btn-Check col-sm-6 col-md-6 col-lg-12" id="continueShopping" aria-label="continueShopping" type="submit">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
  }
