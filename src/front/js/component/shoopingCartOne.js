import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import CartItem from "./cartItem";
export const ShoppingCartOne = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [textarea, setTextarea] = useState("");
  const { store, actions } = useContext(Context);
  const textareaClick = () => {
    const note = textarea;
    console.log('Textarea clicked');
    actions.sendNoteToServer(note);
    setTextarea("");
  };
  // Function to render the items in the cart
  const renderCartItems = () => {
    if (!store.cart || store.cart.length === 0) {
        return <p>Your cart is empty.</p>;
    }

    return store.cart.map((item, index) => (
<<<<<<< HEAD
      <div key={index} className="shopping-cart">
        <div className="cart-details1">
          <div className="cart-details2">
            <img
              src={item.image_url}
              className="img-cart"
              alt={`Image of ${item.name}`}
            />
            <div>
              <p>{item.name}</p>
            </div>
          </div>
          <div className="flex-end">
            <p>{item.price} €</p>
          </div>
        </div>
        <div className="cart-details3 d-flex mb-4">
          <div className="set-btn">
            <button
              className="btn-detail1"
              onClick={() => actions.minusQuantity(quantity, setQuantity)}
            >
              -
            </button>
            <div className="form-outline">
              <input
                id="form1"
                min="0"
                name="quantity"
                value={quantity}
                onChange={(e) => actions.onChangeQuantity(setQuantity, e.target.value)}
                type="text"
                className="btn-detail-middle"
              />
            </div>
            <button
              className="btn-detail2"
              onClick={() => actions.plusQuantity(quantity, setQuantity)}
            >
              +
            </button>
          </div>
          <div>
            <p>{item.price} €</p>
          </div>
        </div>
      </div>
=======
        <CartItem item={item} index={index} key={index} />
>>>>>>> 830ae679760ec516d2d98a8b9ebc5e7a1ed22162
    ));
    }
  return (
    <div className="container min-height-100">
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
            <p>Quantity</p>
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
          <div className=" form-check cart-form-check mt-2">
            <input
              className="ship-check-input form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <Link className="link" to="/terms">
              <label className="link-shopping ">
                I approve terms and conditions
              </label>
            </Link>
          </div>
        </form>
        <div className="btn-set-check col-sm-6 col-md-6 col-lg-6">
          <button
            className="btn-Check col-sm-6 col-md-6 col-lg-12 mb-3"
            type="submit"
            onClick={() => props.onClick()} // Call the onClick function directly
          >
            Check Out
          </button>
          <Link className="link-shopping" to="/">
            <button className="btn-Check col-sm-6 col-md-6 col-lg-12" type="submit">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
  }
