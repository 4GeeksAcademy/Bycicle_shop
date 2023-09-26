import React, { useState } from "react";
import axios from "axios";
import "../../styles/resetPassword.css";

export const NewPassword = () => {
    const [password, setPassword] = useState("");
    const [confermePassword, setConfermePassword] = useState("");

  //function to send the email to reset password 
const NewPass = async () => {
  const data = {
    'password': password,
  };
  console.log(data)

  const opts = {
    method: "OPTIONS",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data), // Use the 'data' option for the JSON payload
  };

  console.log(opts);

  try {
    // Send a OPTIONS request to your server to initiate the password reset process
    const response = await axios.options(process.env.BACKEND_URL + "/api/resetPassword", opts);
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
          <div className="container-fluid min-height-100">
            <br />
            <label className="password">New password</label>
              <input
                className="control new-input"
                type="password"
                aria-label="default input example"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            <br />
            <br />
            <label className="password">Repeat password</label>
            <input
                className="control new-input"
                type="password"
                aria-label="default input example1"
                value={confermePassword}
                onChange={(e) => setConfermePassword(e.target.value)}
              />
            <br />
            <br />
            <br />
            <div >
              {/* Button trigger modal and send email */}
              <button onClick={NewPass} className="btn-pass">
                Send
              </button>
            </div>
         </div>   
  );
};
