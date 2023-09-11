import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

export const Footer = () => {
	const [isHovering, setIsHovering] = useState(false);	

	//function that allow the legend of the button appear when the mose passes ouver the button
  const handleMouseOver = () => {
    setIsHovering(true);
  };
//function that hide the legend of the button appear when the mose passes ouver the button
  const handleMouseOut = () => {
    setIsHovering(false);
  };

	return (
		<div className="container-fluid big-box fixed-bottom d-flex">
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
				<Link className="link" to="/">	
					<i onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="fa-regular fa-comment-dots my-fa-comment-dots"></i>
				</Link>
				{ isHovering && (
					<div className="give">
						<p>Give us your feedback</p>
					</div>
				)}
				<Link className="link" to="/terms">	
					<p className="terms">terms & conditions</p>
				</Link>
			</div>	
		</div>
	);
};