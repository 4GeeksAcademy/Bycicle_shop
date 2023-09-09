import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

export const Footer = () => (
	
	<div className="container-fluid fixed-bottom d-flex">
		<div className="col-sm-8 col-md-8 col-lg-9">
			<div className="develop">
				<div>
					<i className="fa-regular fa-copyright"></i>
				</div>
				<div>
					<p>Develop by Aleksander Klenin/ Mariana Plácito</p>
					<p>4Geeks 2023</p>
				</div>
			</div>	
		</div>
		<div className="footerLinks col-sm-4 col-md-4 col-lg-3 d-flex">
			<Link className="link" to="/">	
				<p><i className="fa-regular fa-comment-dots"></i></p>
			</Link>
			<Link className="link" to="/">	
				<p className="terms">terms & conditions</p>
			</Link>
		</div>	
    </div>
);