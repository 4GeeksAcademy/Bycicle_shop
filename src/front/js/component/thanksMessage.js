import React, { useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useTheme } from "../themeContext";
import "../../styles/shoppingCart.css"

export const ThanksMessage = () => {
    const navigate = useNavigate();
    const { theme } = useTheme(); 

    //function to return to main page after showing the thanks messsage after 4 seconds
    useEffect(() => {
        setTimeout(() => {
          navigate('/')
        }, 4000)
      }, [])

	return (
		<div className="container" data-theme={theme}>
			<div className="thanks">
                <div className="thanks-message">
                    <p>Thank you for purchasing with us!</p>
                    <p>You will receive an email with purchase confirmation and invoice.</p>
                </div>
            </div>
		</div>
	);
};