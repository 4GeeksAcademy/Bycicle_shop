import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/delete_item_shopping_cart.css"
import removeItemFromCart from "../store/flux"


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
                <div className="flex-end">
                    <p>{item.price} €</p>
                </div>
            </div>
            <div className="cart-details3 d-flex mb-4">
                <div className="set-btn">
                    <button
                        className="btn-detail1"
                        onClick={minusItemQuantity}>
                        -
                    </button>
                    <div className="form-outline">
                        <input
                            id="form1"
                            min="0"
                            name="quantity"
                            value={itemQuantity}
                            onChange={onChangeItemQuantity}
                            type="text"
                            className="btn-detail-middle"
                        />
                    </div>
                    <button
                        className="btn-detail2"
                        onClick={plusItemQuantity}
                    >
                        +
                    </button>
                </div>
                <button
                    onClick={() => handleDeleteItem(index)}
                    className="btn-delete"
                >
                   <i class="fa-solid fa-trash-can"></i>
                </button>
                <div>
                    <p>{(item.price * itemQuantity).toFixed(2)} €</p>
                </div>
            </div>
        </div>
    ));
};

export default CartItem;
