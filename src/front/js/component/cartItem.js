import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/shoppingCart.css"


const CartItem = ({ item, index }) => {
    const { store, actions } = useContext(Context);
    const [itemQuantity, setItemQuantity] = useState(1);

    const plusItemQuantity = () => {
        setItemQuantity(itemQuantity + 1);
    };

    const minusItemQuantity = () => {
        if (itemQuantity < 2) return;
        setItemQuantity(itemQuantity - 1);
    };

    const onChangeItemQuantity = (e) => {
        setItemQuantity(Number(e.target.value));
    };
    const handleDeleteItem = (index) => {
        actions.removeItemFromCart(index);
    };
    return store.cart.map((item, index) => (
        <div key={index} className="shopping-cart">
            <div className="cart-details1 col-6">
                <div className="cart-details2">
                    <img
                        src={item.image_url}
                        className="img-cart"
                        alt={item.name}
                    />
                    <div>
                        <p>{item.name}</p>
                    </div>
                </div>
                <div className="flex-end p-2">
                    <p>{item.price} €</p>
                </div>
            </div>
            <div className="cart-details3 col-6">
                <div className="set-btn">
                    <button
                        className="btn-price1"
                        onClick={minusItemQuantity}
                        id="minus"
                        aria-label="minus">
                        -
                    </button>
                        <input
                            id="form1"
                            aria-label="form1"
                            min="0"
                            name="quantity"
                            value={itemQuantity}
                            onChange={onChangeItemQuantity}
                            type="text"
                            className="btn-price-middle"
                        />
                    <button
                        className="btn-price2"
                        aria-label="plus"
                        onClick={plusItemQuantity}
                        id="plus"
                    >
                        +
                    </button>
                </div>
                <div className="ms-3">
                    <p>{(item.price * itemQuantity).toFixed(2)} €</p>
                </div>
                <i onClick={() => handleDeleteItem(index)} className="btn-delete-shopping fa-solid fa-trash-can"></i>
             </div>
        </div>
    ));
};

export default CartItem;
