import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const ShoppingCartOne = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [textarea, setTextarea] = useState("");
  const [items, setItems] = useState([]);
  const { store, actions } = useContext(Context);

  const plusQuantity = () => {
    setQuantity(quantity + 1);
  };

  const minusQuantity = () => {
    if (quantity < 2) return;
    setQuantity(quantity - 1);
  };

  const onChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

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
      <div key={index} className="shopping-cart">
        <div className="cart-details1">
          <div className="cart-details2">
            <img
              src={item.image_url}
              className="img-cart"
              alt="Generic placeholder image"
            />
            <div>
              <p>{item.name}</p>
              <p className="smaller-p">{item.description}</p>
            </div>
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
            <div className="shopping-cart">
              <div className="cart-details1">
                <div className="cart-details2">
                  <img
                    src={store.orders && store.orders.image_url}
                    className="img-cart"
                    alt="Generic placeholder image"
                  />
                  <div>
                    <p>name</p>
                    <p className="smaller-p">{store.orders && store.orders.name} </p>
                  </div>
                </div>
                <div className="flex-end">
                  <p>{store.orders && store.orders.price} €</p>
                </div>
              </div>
              <div className="cart-details3">
                <div className="set-btn">
                  <button className="btn-cart1" onClick={minusQuantity}>-</button>
                  <input
                    className="btn-middle"
                    min="0"
                    name="quantity"
                    value={store.orders && store.orders.quantity}
                    onChange={onChangeQuantity}
                    type="text"
                  />
                  <button className="btn-cart2" onClick={plusQuantity}>+</button>
                </div>
                <div>
                  <p>{store.orders && store.orders.price_id} €</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <form className="col-sm-6 col-md-6 col-lg-6" onSubmit={textareaClick}>
              <div className="cart-form">
                <label>Add a note to your order:</label>
                <br />
                <textarea className="form-control mt-2" id="exampleFormControlTextarea1" rows="4" value={textarea} onChange={(e) => setTextarea(e.target.value)}></textarea>
              </div>
              <div className=" form-check cart-form-check mt-2">
                <input className="ship-check-input form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <Link className="link" to="/terms">
                  <label className="form-check-label link-shopping my-form-check-label">
                    I approve terms and conditions
                  </label>
                </Link>
              </div>
            </form>
            <div className="btn-set-check col-sm-6 col-md-6 col-lg-6">
              <button
                className="btn-Check col-sm-6 col-md-6 col-lg-12 mb-3"
                type="submit"
                onClick={() => {
                  setItems(price_id); // It seems like 'price_id' is not defined here, please replace it with the correct value
                  // Call the callback function passed from the parent component
                  props.onClick(props.items);
                }}
              >
                Check Out
              </button>
              <Link className="link-shopping" to="/">
                <button className="btn-Check col-sm-6 col-md-6 col-lg-12" type="submit">Continue Shopping</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      {renderCartItems()}
    </div>
  );
};

