import React, {  useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const ShoppingCartTwo = (props) => {
    const { store } = useContext(Context);
	const [firstName, setFirstName] = useState("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
    const [save, setSave] = useState(false);
    const [textMe, setTextMe] = useState(false);

	//function to send the data form the input to the ShiipingAddress table
    const shippingClick = (event) => {
        // prevent the default form submission behavior
        event.preventDefault();
        //actions. (firstName, lastname, email, address, city, zipcode, phone, save, textMe) 
    };
	
	return (
		<div className="row mt-3">
			<div className="col-6">
				<div className="shipping-paragraf">
					<p>Already have an account on our website? <Link className="shipping-link" to="/login"><strong>Click here to log in</strong></Link></p>
					<p>Do you have a discount coupon? <strong>Click here and enter the code</strong></p>
				</div>
			<div className="shipping-container my-3">
				<h1>Shipping address</h1>
					<form onSubmit={shippingClick}>
						<div className=" row my-3">
							<div className="col-6">
								<label className="form-label">First Name</label>
								<input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
							</div>
							<div className="col-6">
								<label className="form-label">Last Name</label>
								<input type="text" className="form-control" id="lastName" value={lastname} onChange={(e) => setLastname(e.target.value)} required/>
							</div>
						</div>
						<div className="mb-3">
							<label className="form-label">Address</label>
							<input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required/>
						</div>
						<div className="row my-3">
							<div className="col-6">
								<label className="form-label">Zip code</label>
								<input type="text" className="form-control" id="zipCode" value={zipcode} onChange={(e) => setZipcode(e.target.value)}required/>
							</div>
							<div className="col-6">
								<label className="form-label">City</label>
								<input type="text" className="form-control" id="city" value={city} onChange={(e) => setCity(e.target.value)} required/>
							</div>
						</div>
						<div className="mb-3">
							<label className="form-label">Phone</label>
							<input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
						</div>
						<div className="mb-3">
							<label className="form-label">Email</label>
							<input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
						</div>
					</form>
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
				<div className="row m-2">
						<form className="col-6" onSubmit={shippingClick}>
							<div className="form-check shipping-form-check-label">
								<input type="checkbox" className="form-check-input" id="save" checked={save} onChange={(e) => setSave(e.target.value)}/>
								<label className="form-check-label">Save this information for the next time</label>
							</div>
							<div className="mb-3 form-check shipping-form-check-label">	
								<input type="checkbox" className="form-check-input" id="textMe" checked={textMe} onChange={(e) => setTextMe(e.target.value)}/>
								<label className="form-check-label">Text me with news and offers</label>
							</div>
						</form>
						<div className="btn-shipping col-6" >
							<Link to="/shoppingCart">
								<button className="btn-Check" type="submit" onClick={() => {
									// Call the callback function passed from the parent component
									props.onClick();
								}}>
									Continue Shipping
								</button>
							</Link>
							<br/>
						<br/>
						</div>	
				</div>
				<br/>
		</div>
			);
		};
