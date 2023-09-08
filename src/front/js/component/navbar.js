import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import "../../styles/navbar.css";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-dark navbar-expand-lg fixed-top ">
        	<div className="container-fluid ">
				<figure>
		  			<img src={logo} className="img" alt="logo" /> 
				</figure>
				<div>
					<div className="mb-3">
						<button className="language">English - Euro <i className="fa-solid fa-chevron-down"></i></button>
					</div>
            		<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            			<span className="navbar-toggler-icon"></span>
           			</button>
            		<div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            			<div className="navbar-nav">
							<Link to="/">
								<button className="btn" href="#">Contact Us</button>
							</Link>
							<Link to="/">
								<button className="btn ms-3" href="#">About Us</button>
							</Link>
							<div className="dropdown ms-3">
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
							<Link to="/">
								<i className="icon fa-solid fa-magnifying-glass ms-3"></i>
							</Link>
							<Link to="/">
								<i className="icon fa-regular fa-user ms-3"></i>
							</Link>
							<Link to="/">
								<i className="icon fa-solid fa-cart-shopping ms-3" tabIndex="-1" ></i>
							</Link>
            			</div>
        			</div>
    			</div>
			</div>
		</nav>
	);
};
