import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

export const ThanksMessage = () => {
    const navigate = useNavigate()

    //function to return to main page after showing the thanks messsage after 4 seconds
    useEffect(() => {
        setTimeout(() => {
          navigate('/')
        }, 4000)
      }, [])

	return (
		<div className="container">
			<div className="thanks">
                <div className="thanks-message">
                    <p>Thank you for purchasing with us!</p>
                    <p>You will receive an email with purchase confirmation and invoice.</p>
                </div>
            </div>
		</div>
	);
};