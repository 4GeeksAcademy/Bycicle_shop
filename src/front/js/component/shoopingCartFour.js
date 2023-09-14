import React, {  useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const ShoppingCartFour = (props) => {
    const { store } = useContext(Context);
	

	return (
		<div className="row mt-3">
			<div className="col-6">
				<br />
				<div className="shipping-container my-3">
					<h1>Payment method</h1>
					<div className="shipping-check row mt-5">
						<div className="col-1">
								<input className="ship-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />	
						</div>
						<div className="col-11">
							<label className="ship-check-label">
								<div>
									<p>Credit Card</p>
								</div>
								<div>
									<p><strong><i className="fa-brands fa-cc-discover"></i> <i className="fa-brands fa-cc-visa"></i><i className="fa-brands fa-cc-mastercard"></i> <i className="fa-brands fa-cc-visa"></i> <i className="fa-brands fa-cc-mastercard"></i></strong></p>
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
									<p>Paypal</p>
								</div>
								<div>
									<p><strong><i className="fa-brands fa-cc-paypal"></i></strong></p>
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
									<p>Klama</p>
								</div>
								<div>
									<p><strong><i className="fa-solid fa-credit-card"></i></strong></p>
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
									<p>MyBank</p>
								</div>
								<div>
									<p><strong><i className="fa-solid fa-credit-card"></i></strong></p>
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
									<p>Giropay - Online Uberweisung</p>
								</div>
								<div>
									<p><strong><i className="fa-solid fa-credit-card"></i></strong></p>
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
									<p>Blik</p>
								</div>
								<div>
									<p><strong><i className="fa-solid fa-credit-card"></i></strong></p>
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
									<p>Prxelewy24</p>
								</div>
								<div>
									<p><i className="fa-solid fa-credit-card"></i></p>
								</div>
							</label>
						</div>	
					</div>	
					<br />
					<div className="shipping-container my-3">
						<h1>Billing address</h1>
					<div className="shipping-check row mt-5">
						<div className="col-1">
							<input className="ship-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />	
						</div>
						<div className="col-11">
							<label className="ship-check-label">
								<div>
									<p>Same as the shipping address</p>
								</div>
							</label>
						</div>
					</div>
					<div className="shipping-check row mt-3">
						<div className="dropdown col-1">
							<button
								className="shipping-dropdown-toggle dropdown-toggle dropdown-toggle-split"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false" 
								>
								<input className="ship-check-input" type="radio" name="flexRadioDefault"/>
							</button>
								<form className="dropdown-menu shipping-dropdown " >
									<div className="dropdown-item row my-3">
										<div className="dropdown-item mb-3">
											<input type="text" className="form-control" id="email" placeholder="Country/region" required/>
										</div>
										<div className="col-6">
											<input type="email" className="form-control" id="firstName" aria-describedby="emailHelp" placeholder="First Name" required/>
										</div>
										<div className="col-6">
											<input type="password" className="form-control" id="lastName" placeholder="Last Name" required/>
										</div>
									</div>
									<div className="dropdown-item mb-3">
										<input type="password" className="form-control" id="address" placeholder="Address" required/>
									</div>
									<div className="dropdown-item row my-3">
										<div className="col-6">
											<input type="password" className="form-control" id="zipCode" placeholder="Zip code" required/>
										</div>
										<div className="col-6">
											<input type="password" className="form-control" id="city" placeholder="City" required/>
										</div>
									</div>
									<div className="dropdown-item mb-3">
										<input type="password" className="form-control" id="phone" placeholder="Phone" required/>
									</div>
								</form>
							</div>
							<div className="col-11">
								<label className="ship-check-label">
									<div>
										<p>Use a different billing address</p>
									</div>
								</label>
							</div>
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
				<div className="last-ship row mt-3">
					<div className="btn-shipping col-6 m-0" >
						<Link to="/shoppingCart">
							<button className="btn-Check" type="submit">
								Pay
							</button>
						</Link>
					</div>	
					<div className="return-second col-6">
						<Link  className="return-second" to="/shoopingCart">
							<i className="fa-solid fa-arrow-left"></i> Previous Page
						</Link>
					</div>  
				</div>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
		</div>
			);
		};
