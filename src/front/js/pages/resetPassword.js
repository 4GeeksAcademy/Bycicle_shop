import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import logo from "../../img/logo.png";
import "../../styles/resetPassword.css";

export const ResetPassword = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");

  // send an email to your account to reset button
  const resetButton = () => {
    setEmail("");
  };

  return (
    <div className="container reset-big-box">
      <br />
      <div>
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
        <br />
        <br />
        <div>
          {/* Button trigger modal */}
          <button
            onClick={resetButton}
            className="btn-send"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Send
          </button>
          {/* Modal */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  <img src={logo} className="logo" alt="logo" />
                  <p>Check your email for a new reset</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};