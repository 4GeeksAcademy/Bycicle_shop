import React, { useState } from "react";
import axios from "axios";
import logo from "../../img/logo.png";
import axios from "axios";
import "../../styles/resetPassword.css";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [hideContainer, setHideContainer] = useState(true);
  const [resetStatus, setResetStatus] = useState(null);

<<<<<<< HEAD
  //function to send the email to reset password 
const handleResetPassword = async () => {
  const data = {
    email: email
=======
  const handleResetPassword = async () => {
    const data = {
      email: email, // You can also use shorthand: email
    };
  
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data), // Use the 'data' option for the JSON payload
    };
  
    console.log(opts);
  
    try {
      // Send a POST request to your server to initiate the password reset process
      const response = await axios.post(process.env.BACKEND_URL + "/resetPassword", opts);
      console.log("ok");
  
      if (response.status === 200) {
        setResetStatus("Check your email for a password reset!");
      } else if (response.status === 404) {
        setResetStatus("Your email does not exist.");
      } else {
        setResetStatus("Error sending reset email.");
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
      setResetStatus("Error sending reset email.");
    }
  
    setHideContainer(false);
>>>>>>> 80ff9f8a7ca9eecf13cf7987ee228d77a7e7cad8
  };

  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data), // Use the 'data' option for the JSON payload
  };

  console.log(opts);

  try {
    // Send a POST request to your server to initiate the password reset process
    const response = await axios.post(process.env.BACKEND_URL + "/resetPassword", opts);
    console.log("ok");

    if (response.status === 200) {
      setResetStatus("Check your email for a password reset!");
    } else if (response.status === 404) {
      setResetStatus("Your email does not exist.");
    } else {
      setResetStatus("Error sending reset email.");
    }
  } catch (error) {
    console.error("Error sending reset email:", error);
    setResetStatus("Error sending reset email.");
  }

  setHideContainer(false);
};


  return (
<<<<<<< HEAD
        <div className="min-height-100 container reset-big-box">
         {/* Modal */}
          {resetStatus &&  (
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
=======
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
                onChange={(e) => setEmail(e.target.value)}
              />
>>>>>>> 80ff9f8a7ca9eecf13cf7987ee228d77a7e7cad8
            </div>
            <br />
            <br />
            <br />
            <div>
              {/* Button trigger modal and send email */}
              <button onClick={handleResetPassword} className="btn-send">
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};