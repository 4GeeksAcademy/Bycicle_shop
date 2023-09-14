import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Order = (props) => {
	const { store } = useContext(Context);	

	return (
		<div>
            <div className="details-data">
                <p>Order: Nº</p>
                <p>Date: </p>
                <p>Price: </p>
                <p>Product: </p>
            </div>
        </div>                       
	);
};