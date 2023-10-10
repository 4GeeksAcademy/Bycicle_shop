import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import logo from "../../img/logo.png";
import "../../styles/resetPassword.css";

export const ResetPassword = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [hideContainer, setHideContainer] = useState(true);
  const [resetStatus, setResetStatus] = useState(false);
  const [token, setToken] = useState("");

  //function to send the data form the input to the database
  const handleResetPassword = (event) => {
    // prevent the default form submission behavior
    event.preventDefault();
    //call function resetPassword from flux
    actions.resetPassword(token, email);  
      setResetStatus(true) 
     // Update the UI
     setHideContainer(false);
};

  return (
    <div className="min-height-100 container reset-big-box">
      {/* Modal */}
      {resetStatus && (
        <div className="my-modal">
          <img src={logo} className="logo" alt="logo" />
          <div id="resetMessage"></div>
        </div>
      )}
      {hideContainer && (
        <>
          <div>
            <br />
            <h1 className="reset-title">Reset account password</h1>
          </div>
          <br />
          <div className="reset-box">
            <div>
              <p className="paragraf">Forgot your password? Enter your email.</p>
              <p className="paragraf">
                You will receive a link in your email to reset your password.
              </p>
              <br />
              <br />
              <input
                className="control reset-input"
                type="text"
                placeholder="Email"
                aria-label="default input example"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br />
            <div>
              {/* Button trigger modal and send email */}
              <button onClick={handleResetPassword} id="reset" aria-label="reset" className="btn-send">
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};