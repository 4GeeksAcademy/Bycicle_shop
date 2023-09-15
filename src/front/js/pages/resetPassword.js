import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import logo from "../../img/logo.png";
import "../../styles/resetPassword.css";

export const ResetPassword = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [hideContainer, setHideContainer] = useState(true);

  // send an email to your account to reset button
  const resetButton = () => {
    setShowModal(true);
    setHideContainer(false);
  };

  return (
        <div className="container reset-big-box">
         {/* Modal */}
          {showModal && (
                  <div className="my-modal">
                    <img src={logo} className="logo" alt="logo" />
                    <p>Check your email for a password reset!</p>
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
                      onClick={resetButton}
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