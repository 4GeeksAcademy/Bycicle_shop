import React, {  useState, useContext } from "react";
import { Context } from "../store/appContext";

export const ShoppingCartThree = (props) => {
    const { store } = useContext(Context);
	const [subscribe, setSubscribe] = useState(false);
    const [privacy, setPrivacy] = useState(false);

	//function to send the data form the input to the database
    const handleClick = (event) => {
        // prevent the default form submission behavior
        event.preventDefault();
        actions.signup(fullName, username, email, password, subscribe, privacy) 
    };
	
	return (
		<div className="row mt-3">
			<div className="col-6">
				<br />
				<div className="shipping-container m-0'">
					<h1>Shipping method</h1>
					<div className="shipping-check row mt-5">
						<div className="col-1">
							<input className="ship-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />	
						</div>
						<div className="col-11">
							<label className="ship-check-label">
								<div>
									<p>Free Shipping (3-10 working days)</p>
								</div>
								<div>
									<p><strong>Free</strong></p>
								</div>
							</label>
						</div>
					</div>
					<div className="shipping-check row mt-3">
						<div className="col-1">
							<input className="ship-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
						</div>
						<div className="col-11">
							<label className="ship-check-label">
								<div>
									<p>UPS (Faster, higher rate of delivery)</p>
								</div>
								<div>
									<p><strong>€</strong></p>
								</div>
							</label>
						</div>	
					</div>	
				</div>
			</div>
					<div className="col-6">
						<div className="shipping-order row">
							<h2>Your order</h2>
							<div className="shipping-details shipping-details-title row">
								<p className="col-6">Product</p>
								<div className="col-6 ship">
									<p>Subtotal</p>
								</div>
							</div>
							<div className="shipping-details row">
								<p className="col-6">name</p>
								<div className="col-6 ship">
									<p>€</p>
								</div>
							</div>
							<div className="shipping-details row">
								<p className="col-6">Shipping</p>
								<div className="col-6 ship">
									<p>in the next setp</p>
								</div>
							</div>
							<div className="shipping-details row">
								<p className="col-6">total</p>
								<div className="col-6 ship">
									<p>€</p>
									<p>(includes VAT)</p>
								</div>
							</div>
						</div>
				</div>		
				<div className="last-ship row">
					<div className="btn-shipping col-6" >
							<button className="btn-Check" type="submit" onClick={() => {
								// Call the callback function passed from the parent component
								props.onClick();
							}}>
								Continue to payment
							</button>
					</div>	
					<div className="return-shipping col-6">
						<div className="return-second" onClick={() => { props.onPreviousClick()}} >
							<i className="fa-solid fa-arrow-left"></i> Previous Page
						</div>
					</div>  
				</div>
		</div>
			);
		};
