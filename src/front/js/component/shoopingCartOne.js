import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const ShoppingCartOne = (props) => {
    const { store, actions } = useContext(Context);
	const [quantity, setQuantity] = useState(1);
	const [textarea, setTextarea] = useState("");

	const plusQuantity = () => {
		setQuantity(quantity + 1);
	};

	const minusQuantity = () => {
		if (quantity < 2) return;
		setQuantity(quantity - 1);
	};

	const onChangeQuantity = (e) => {
		setQuantity(e.target.value);
	};

	//function to send the textarea text from the input to the order table
	const textareaClick = (event) => {
        // prevent the default form submission behavior
        event.preventDefault();
		// actions.
    };

	return (
		<div className="container min-height-100">
			<br />
			<div>
              	<h1 className="cart-title">Shopping Cart</h1>
            </div>
			<div>
				<div className="cart-description">
					<div className="product-order1">
						<p>Product</p>
						<p className="price" >Price</p>
					</div>
					<div className="product-order2">
						<p>Quantity</p>
						<p className="price">Total</p>
					</div>
				</div>
				<div className="shopping-cart">
					<div className="cart-details1">
						<div className="cart-details2">
							<img
								src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp"
								className="img-cart"
								alt="Generic placeholder image"
							/>
							<div>
								<p>name</p>
								<p className="smaller-p">d</p>
							</div>
						</div>	
						<div className="flex-end">
							<p>€</p>
						</div>
					</div>	
					<div className="cart-details3">
						<div className="set-btn">
							<button className="btn-cart1" onClick={minusQuantity}>-</button>
							<input
								className="btn-middle"
								min="0"
								name="quantity"
								value={quantity}
								onChange={onChangeQuantity}
								type="text"
							/>
							<button className="btn-cart2" onClick={plusQuantity}>+</button>
						</div>
						<div>
							<p>€</p>
						</div>
					</div>
				</div>
			</div>
			<div className="subtotal mt-2">
				<p>Subtotal:</p>
			</div>
			<div className="row">
				<form className="col-sm-6 col-md-6 col-lg-6" onSubmit={textareaClick}>
					<div className="cart-form">
						<label>Add a note to your order:</label>
						<br />
						<textarea className="form-control mt-2" id="exampleFormControlTextarea1" rows="4"  value={textarea} onChange={(e) => setTextarea(e.target.value)}></textarea>
					</div>
					<div className=" form-check cart-form-check mt-2">
						<input className="ship-check-input form-check-input" type="checkbox" value="" id="flexCheckDefault" />
						<label className="form-check-label my-form-check-label">
							I approve terms and conditions
						</label>
					</div>
				</form>
				<div className="btn-set-check col-sm-6 col-md-6 col-lg-6">
					<button
						className="btn-Check col-sm-6 col-md-6 col-lg-12 mb-3"
						type="submit"
						onClick={() => {
							// Call the callback function passed from the parent component
							props.onClick();
						  }}
					>
						Check Out
					</button>
				<Link to="/">
					<button className="btn-Check col-sm-6 col-md-6 col-lg-12" type="submit">Continue Shopping</button>
				</Link>
				</div>
			</div>
		</div>
	);
};