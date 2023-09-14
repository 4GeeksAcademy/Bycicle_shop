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
					<div class="col-1">
						<button
							class="shipping-dropdown-toggle"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseCredit"
							aria-expanded="false"
							aria-controls="collapseExample"
						>
							<input class="ship-check-input" type="radio" name="flexRadioDefault" />
						</button>
					</div>
					<div class="col-11">
						<label class="ship-check-label">
							<div>
							<p>Credit Card</p>
							</div>
						</label>
					</div>
					<div class="collapse" id="collapseCredit">
									<form className="shipping-collapse card card-body" >
											<div className="mb-3">
												<input type="text" className="form-control shipping-form" id="cardNumber" placeholder="Card Number" required/>
											</div>
										<div className="mb-3">
											<input type="text" className="form-control shipping-form" id="nameCard" placeholder="Name on Card" required/>
										</div>
										<div className="row my-1">
											<div className="col-6">
												<input type="text" className="form-control shipping-form" id="date" placeholder="Expiration date (MM/YY)" required/>
											</div>
											<div className="col-6">
												<input type="text" className="form-control shipping-form" id="securityNumber" placeholder="Security Number" required/>
											</div>
										</div>
									</form>
								</div>
								</div>
								<div className="shipping-check row mt-3">
									<div className="col-1">
										<button
											class="shipping-dropdown-toggle"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapsePaypal"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											<input class="ship-check-input" type="radio" name="flexRadioDefault" />
										</button>
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
									<div class="collapse" id="collapsePaypal">
									<div className="shipping-collapse card card-body" >
										<p>
											After clicking "pay", you will be redirected to PayPal to complete your purchase securely.
										</p>
									</div>
								</div>
							</div>		
					</div>
					<div className="shipping-check row mt-3">
						<div className="col-1">
								<button
											class="shipping-dropdown-toggle"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseklama"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											<input class="ship-check-input" type="radio" name="flexRadioDefault" />
										</button>
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
									<div class="collapse" id="collapseklama">
									<div className="shipping-collapse card card-body" >
										<p>
											After clicking "pay", you will be redirected to klama to complete your purchase securely.
										</p>
									</div>
									</div>	
					</div>	
					<div className="shipping-check row mt-3">
						<div className="col-1">
						<button
											class="shipping-dropdown-toggle"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseMyBank"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											<input class="ship-check-input" type="radio" name="flexRadioDefault" />
										</button>
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
									<div class="collapse" id="collapseMyBank">
									<div className="shipping-collapse card card-body" >
										<p>
											After clicking "pay", you will be redirected to MyBank to complete your purchase securely.
										</p>
									</div>
									</div>	
					</div>	
					<div className="shipping-check row mt-3">
						<div className="col-1">
						<button
											class="shipping-dropdown-toggle"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseGiropay"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											<input class="ship-check-input" type="radio" name="flexRadioDefault" />
										</button>
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
									<div class="collapse" id="collapseGiropay">
									<div className="shipping-collapse card card-body" >
										<p>
											After clicking "pay", you will be redirected to Giropay to complete your purchase securely.
										</p>
									</div>
									</div>	
					</div>	
					<div className="shipping-check row mt-3">
						<div className="col-1">
						<button
											class="shipping-dropdown-toggle"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseBlik"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											<input class="ship-check-input" type="radio" name="flexRadioDefault" />
										</button>
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
									<div class="collapse" id="collapseBlik">
									<div className="shipping-collapse card card-body" >
										<p>
											After clicking "pay", you will be redirected to Blik to complete your purchase securely.
										</p>
									</div>
									</div>	
					</div>	
					<div className="shipping-check row mt-3">
						<div className="col-1">
						<button
											class="shipping-dropdown-toggle"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapsePrxelewy24"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											<input class="ship-check-input" type="radio" name="flexRadioDefault" />
										</button>
									</div>
									<div className="col-11">
										<label className="ship-check-label">
											<div>
											<p>Prxelewy24</p>
											</div>
											<div>
											<p><strong><i className="fa-solid fa-credit-card"></i></strong></p>
											</div>
										</label>
									</div>	
									<div class="collapse" id="collapsePrxelewy24">
									<div className="shipping-collapse card card-body" >
										<p>
											After clicking "pay", you will be redirected to Prxelewy24 to complete your purchase securely.
										</p>
									</div>
								</div>	
						</div>	
					<br />
					<div className="shipping-container my-3">
						<h1>Billing address</h1>
					<div className="shipping-check row mt-3">
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
					<div class="shipping-check row mt-3">
						<div class="col-1">
							<button
								class="shipping-dropdown-toggle"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#collapseExample"
								aria-expanded="false"
								aria-controls="collapseExample"
							>
								<input class="ship-check-input" type="radio" name="flexRadioDefault" />
							</button>
						</div>
						<div class="col-11">
							<label class="ship-check-label">
								<div>
									<p>Use a different billing address</p>
								</div>
							</label>
						</div>
						<div class="collapse" id="collapseExample">
									<form className="shipping-collapse card card-body" >
										<div className="row my-3">
											<div className="mb-3">
												<input type="text" className="form-control" id="email" placeholder="Country/region" required/>
											</div>
											<div className="col-6">
												<input type="email" className="form-control" id="firstName" aria-describedby="emailHelp" placeholder="First Name" required/>
											</div>
											<div className="col-6">
												<input type="password" className="form-control" id="lastName" placeholder="Last Name" required/>
											</div>
										</div>
										<div className="mb-3">
											<input type="password" className="form-control" id="address" placeholder="Address" required/>
										</div>
										<div className="row my-3">
											<div className="col-6">
												<input type="password" className="form-control" id="zipCode" placeholder="Zip code" required/>
											</div>
											<div className="col-6">
												<input type="password" className="form-control" id="city" placeholder="City" required/>
											</div>
										</div>
										<div className="mb-3">
											<input type="password" className="form-control" id="phone" placeholder="Phone" required/>
										</div>
									</form>
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
				<br /><br /><br /><br /><br /><br />
		</div>
			);
		};
