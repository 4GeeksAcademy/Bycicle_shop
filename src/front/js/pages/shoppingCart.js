import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { ShoppingCartOne } from "../component/shoopingCartOne";
import "../../styles/shoppingCart.css";

export const ShoppingCart = (props) => {
  const { store, actions } = useContext(Context);
  const cart = store.orders;

  // Define the handleCheckout function
  const handleCheckout = () => {
    // Call the checkout function from the actions object
    actions.checkout();
    window.location.replace('https://checkout.stripe.com/c/pay/cs_test_a1lcvgOUs4PK6rUheEy10M4mhK1n8UKKfxqgAsFnMVBLRWvxPqMbv5cIGl#fidkdWxOYHwnPyd1blpxYHZxWjA0S3BPQD1HVFMxck5wf2pfc3BtMmQ0bmlGbW5XUWBEPFBTfHJoXUh2cHJic2xAYHd%2FMn9JS3JTNmZgX1Nua3BEcGNwVHFXQUBUd2FzdHJAf3FGVFRyUjRkNTVGaHVmRjREVCcpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl')
  }

  return (
    <div className="min-height-100 container">
      <ShoppingCartOne cart={cart} actions={actions} onClick={() => handleCheckout(cart)} />
    </div>
  );
};