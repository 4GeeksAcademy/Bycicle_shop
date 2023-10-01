import { Context } from "../store/appContext";
import React, { useContext, useState, useEffect } from "react";
import { ShoppingCartOne } from "../component/shoopingCartOne";

export const ShoppingCart = () => {
  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Initial store.cart: ', store.cart);
    actions.getCartItems()
      .then(() => setLoading(false))
      .catch(error => {
        console.error('Error fetching cart data:', error);
        setLoading(false);
      });
  }, []);

  const handleCheckout = () => actions.checkout(store.cart);

  if (loading) return <div>Loading...</div>;

  console.log('store.cart before passing to ShoppingCartOne: ', store.cart);

  return (
    <div className="min-height-100 container">
      {store.cart.length === 0 && <p>No items in cart</p>}
      {store.cart.map((item, index) => (
        <div key={index}>
          <p>{item.product ? item.product.name : `Product ${item.bicycle_id}`}</p>
          <p>Quantity: {item.quantity}</p>
          <p>{item.product ? `Price: ${item.product.price}` : 'Price: Not available'}</p>
        </div>
      ))}
      <ShoppingCartOne
        key={store.cart.length}
        items={store.cart}
        onClick={handleCheckout}
      />
    </div>
  );
};
