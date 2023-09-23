import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import logo from "../../img/logo.png";
import axios from "axios";
import "../../styles/resetPassword.css";

export const ResetPassword = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [hideContainer, setHideContainer] = useState(true);
  const [resetStatus, setResetStatus] = useState(null);

  const handleResetPassword = async () => {
    try {
      // Send a POST request to your server to initiate the password reset process
      const response = await axios.post("/resetPassword", { email }); // Use axios.post and include the email in the request body
      
      if (response.status === 200) {
        setResetStatus("Check your email for a password reset!");
      } else if (response.status === 404) {
        setResetStatus("Your email does not exist.");
      } else {
        setResetStatus("Error sending reset email.");
      }
    } catch (error) {
      setResetStatus("Error sending reset email.");
    }
    setHideContainer(false);
  };

  return (
        <div className="min-height-100 container reset-big-box">
         {/* Modal */}
          {resetStatus && (
            <div className="my-modal">
              <img src={logo} className="logo" alt="logo" />
              <p>{resetStatus}</p>
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
                      onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <br />
                  <br />
                  <br />
                  <div>
                    {/* Button trigger modal and send email */}
                    <button
                      onClick={handleResetPassword}
                      className="btn-send"
                    >
                      Send
                    </button>
                  </div>
                </div>
            </>
            )}
            </div>
            );
          };