import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

export const Footer = () => {

	return (
		<div className="container-fluid big-box d-flex">
			<div className="col-sm-8 col-md-8 col-lg-9">
				<div className="develop">
					<div>
						<i className="fa-regular fa-copyright my-fa-copyright"></i>
					</div>
					<div>
						<p>Develop by Aleksander Klenin/ Mariana Plácito</p>
						<p>4Geeks 2023</p>
					</div>
				</div>	
			</div>
			<div className="footerLinks col-sm-4 col-md-4 col-lg-3 d-flex">
				<Link className="link" to="/terms">	
					<p className="terms">terms & conditions</p>
				</Link>
			</div>	
		</div>
	);
};