import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const ThanksMessage = () => {
    const { store, actions } = useContext(Context);


	return (
		<div className="container">
			<div className="thanks">
                <div className="thanks-message">
                    <p>Thank you for purchasing with us!</p>
                    <p>You will receive an email with purchase confirmation and invoice.</p>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
		</div>
	);
};