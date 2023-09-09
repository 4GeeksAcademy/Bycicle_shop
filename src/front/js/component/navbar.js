import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import "../../styles/navbar.css";

export const Navbar = (props) => {
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [hideButtons, sethideButtons] = useState(true);

  // Function to toggle the display of additional buttons
  const toggleAdditionalButtons = () => {
    setShowAdditionalButtons(!showAdditionalButtons);
  };
  // Function to hide the previous buttons
  const hideButton = () => {
    sethideButtons(!hideButtons);
  };

				return (
					<nav className="navbar navbar-dark navbar-expand-lg fixed-top">
					<div className="container-fluid d-flex">
						<figure className="col-sm-4 col-md-3 col-lg-1 col-xl-1">
						<img src={logo} className="img" alt="logo" />
						</figure>
						<div className="menu col-sm-8 col-md-12 col-lg-12 col-xl-12">
						<div className="mb-3 language">
							<button className="btnlanguage">English - Euro <i className="fa-solid fa-chevron-down"></i></button>
						</div>
						<button onClick={() => { toggleAdditionalButtons(); hideButton(); }} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className={`collapse navbar-collapse justify-content-end ${showAdditionalButtons ? "active" : ""}`} id="navbarNavAltMarkup">
							<div className="navbar-nav">
							<Link className="link" to="/">
								<button className="btn" href="#">Contact Us</button>
							</Link>
							<Link className="link" to="/">
								<button className="btn" href="#">About Us</button>
							</Link>
							<div className="link dropdown">
								<button className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
									Products
								</button>
									<ul className="dropdown-menu">
										<li><button className="dropdown-item" href="#">Road Bikes</button></li>
										<li><button className="dropdown-item" href="#">Mountain Bikes</button></li>
										<li><button className="dropdown-item" href="#">Hybrid Bikes</button></li>
										<li><button className="dropdown-item" href="#">Speciality Bikes</button></li>
										<li><button className="dropdown-item" href="#">BMX Bikes</button></li>
										<li><button className="dropdown-item" href="#">Kid's Bikes</button></li>
										<li><button className="dropdown-item" href="#">Other types</button></li>
									</ul>
							</div>
							{hideButtons && (
								<>
								<Link className="link" to="/">
								<i className="icon fa-solid fa-magnifying-glass"></i>
							</Link>
							<Link className="link" to="/">
								<i className="icon fa-regular fa-user"></i>
							</Link>
							<Link className="link" to="/">
								<i className="icon fa-solid fa-cart-shopping" tabIndex="-1" ></i>
							</Link>
							</>
							)}
							{showAdditionalButtons && (
								<>
								<Link className="link" to="/">
									<i className="icon fa-solid fa-magnifying-glass"></i> Search
								</Link>
								<Link className="link" to="/">
									Login
								</Link>
								<Link className="link" to="/">
									Register
								</Link>
								<Link className="link" to="/">
									<i className="icon fa-solid fa-cart-shopping" tabIndex="-1"></i> Cart
								</Link>
								<Link className="link" to="/">	
									<p>Give us your feedback</p>
								</Link>
								</>
							)}
							</div>
						</div>
						</div>
					</div>
				</nav>
				);
				};