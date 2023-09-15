import React, {  useState, useContext } from "react";
import { Context } from "../store/appContext";

export const ShoppingCartFour = (props) => {
    const { store, actions } = useContext(Context);
	const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [date, setDate] = useState("");
    const [securityNumber, setSecurityNumber] = useState("");
	const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("");
    const [address, setAdress] = useState("");
	const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");

	return (
		<div className="shipping-main row mt-3">
			<div className="col-6">
				<br />
				<div className="shipping-container">
					<h1>Payment method</h1>
					<div className="shipping-check row mt-5">
					<div className="col-1">
						<button
							className="shipping-dropdown-toggle"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseCredit"
							aria-expanded="false"
							aria-controls="collapseExample"
						>
							<input className="ship-check-input" type="radio" name="flexRadioDefault" />
						</button>
					</div>
					<div className="col-11">
						<label className="ship-check-label">
							<div>
							<p>Credit Card</p>
							</div>
						</label>
					</div>
					<div className="collapse" id="collapseCredit">
									<form className="shipping-collapse card card-body" >
											<div className="mb-3">
												<input type="text" className="form-control shipping-form" id="cardNumber" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required/>
											</div>
										<div className="mb-3">
											<input type="text" className="form-control shipping-form" id="nameCard" placeholder="Name on Card" value={cardName} onChange={(e) => setCardName(e.target.value)} required/>
										</div>
										<div className="row my-1">
											<div className="col-6">
												<input type="text" className="form-control shipping-form" id="date" placeholder="Expiration date (MM/YY)" value={date} onChange={(e) => setDate(e.target.value)}required/>
											</div>
											<div className="col-6">
												<input type="text" className="form-control shipping-form" id="securityNumber" placeholder="Security Number" value={securityNumber} onChange={(e) => setSecurityNumber(e.target.value)} required/>
											</div>
										</div>
									</form>
								</div>
								</div>
								<div className="shipping-check row mt-3">
									<div className="col-1">
										<button
											className="shipping-dropdown-toggle"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapsePaypal"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											<input className="ship-check-input" type="radio" name="flexRadioDefault" />
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
									<div className="collapse" id="collapsePaypal">
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
											className="shipping-dropdown-toggle"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseklama"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											<input className="ship-check-input" type="radio" name="flexRadioDefault" />
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
									<div className="collapse" id="collapseklama">
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
											className="shipping-dropdown-toggle"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseMyBank"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											<input className="ship-check-input" type="radio" name="flexRadioDefault" />
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
									<div className="collapse" id="collapseMyBank">
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
											className="shipping-dropdown-toggle"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseGiropay"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											<input className="ship-check-input" type="radio" name="flexRadioDefault" />
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
									<div className="collapse" id="collapseGiropay">
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
											className="shipping-dropdown-toggle"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseBlik"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											<input className="ship-check-input" type="radio" name="flexRadioDefault" />
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
									<div className="collapse" id="collapseBlik">
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
											className="shipping-dropdown-toggle"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapsePrxelewy24"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											<input className="ship-check-input" type="radio" name="flexRadioDefault" />
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
									<div className="collapse" id="collapsePrxelewy24">
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
					<div className="shipping-check row mt-3">
						<div className="col-1">
							<button
								className="shipping-dropdown-toggle"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#collapseExample"
								aria-expanded="false"
								aria-controls="collapseExample"
							>
								<input className="ship-check-input" type="radio" name="flexRadioDefault" />
							</button>
						</div>
						<div className="col-11">
							<label className="ship-check-label">
								<div>
									<p>Use a different billing address</p>
								</div>
							</label>
						</div>
						<div className="collapse" id="collapseExample">
									<form className="shipping-collapse card card-body" >
										<div className="row my-3">
											<div className="mb-3">
												<input type="text" className="form-control" id="email" placeholder="Country/region" value={country} onChange={(e) => setCountry(e.target.value)} required/>
											</div>
											<div className="col-6">
												<input type="text" className="form-control" id="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
											</div>
											<div className="col-6">
												<input type="text" className="form-control" id="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
											</div>
										</div>
										<div className="mb-3">
											<input type="text" className="form-control" id="address" placeholder="Address" value={address} onChange={(e) => setAdress(e.target.value)} required/>
										</div>
										<div className="row my-3">
											<div className="col-6">
												<input type="text" className="form-control" id="zipCode" placeholder="Zip code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required/>
											</div>
											<div className="col-6">
												<input type="text" className="form-control" id="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required/>
											</div>
										</div>
										<div className="mb-3">
											<input type="text" className="form-control" id="phone" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
										</div>
									</form>
									<br/>
							</div>
						</div>
					</div>
					</div>	
				<div className="col-6 mt-5">
						<div className="shipping-order row m-0">
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
				<div className="last-ship row m-3">
					<div className="btn-shipping col-6 m-0" >
						<button className="btn-Check" type="submit" onClick={() => {
									// Call the callback function passed from the parent component
									props.onClick();
								}}>
										Pay
							</button>
					</div>	
					<div className="return-shipping col-6">
						<div onClick={() => props.onPreviousClick()} >
							<i className="fa-solid fa-arrow-left"></i> Previous Page
						</div>
					</div>  
				</div>
		</div>
			);
		};
