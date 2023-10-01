import { Context } from "../store/appContext";
import React, { useContext, useState, useEffect } from "react";
import { ShoppingCartOne } from "../component/shoopingCartOne";
import axios from "axios";

export const ShoppingCart = () => {
  const { store, actions } = useContext(Context);
  const token = localStorage.getItem('access_token');
  const { cart = [] } = store;
  //const [items, setItems] = useState("");
  //const [items, setItems] = useState({});
  const [items, setItems] = useState([]);
  useEffect(() => {
    const url = `${process.env.BACKEND_URL}/cart`;

    const token = localStorage.getItem('access_token');

    if (!token) {
        console.error('No token found!');
        return;
    }

    axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        setItems(response.data.shopping_cart_items || []);
    })
    .catch(error => {
        console.error('Error fetching cart data:', error);
    });
}, []);

  const handleCheckout = () => {
    actions.checkout(items);
  }

  console.log('ShoppingCartOne:', ShoppingCartOne);

  return (
    <div className="min-height-100 container">
      {cart.map((item, index) => (
        <div key={index}>
          <p>{item.product.name}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: {item.product.price}</p>
        </div>
      ))}
      <ShoppingCartOne
        key={cart.length}
        items={cart}
        setItems={cart} // cart
        onClick={handleCheckout}
      />

    </div>
  );
};
