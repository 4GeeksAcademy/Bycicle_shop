import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Order = (props) => {
	const { store } = useContext(Context);	

	return (
		<div className="order">
            <h4>Orders</h4>
                <div className="details-data">
                    <p>Order: Nº{props.orders.id} </p>
                    <p>Date: {props.orders.date} </p>
                    <p>Price: {props.orders.price} </p>
                    <p>Product: {/*{props.orders.name} x {props.orders.quantity}*/} </p>
                </div>
        </div>                       
	);
};