import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom'

export const ThanksMessage = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

<<<<<<< HEAD
    //function to return to main page after showing the thanks messsage after 4 seconds
    useEffect(() => {
        setTimeout(() => {
          navigate('/')
        }, 4000)
      }, [])

=======
 //useEfect /
 //navigate to main page
 //useEffect(() => {
  //  setTimeout(() => { navigate('/') }, 3000)
//}, [])
>>>>>>> ab14ff5 (adding the scrooling)
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