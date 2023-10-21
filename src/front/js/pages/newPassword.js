import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useSearchParams } from "react-router-dom";
import "../../styles/resetPassword.css";
import { useTheme } from "../themeContext"; 

export const NewPassword = () => {
  const { actions } = useContext(Context);
  const [password, setPassword] = useState("");
  const [confermePassword, setConfermePassword] = useState("");
  const [searchParams] = useSearchParams();
  const { theme } = useTheme();

  //function to send the data form the input to the database
  const handleNewPassword = (event) => {
    console.log(searchParams.get('token'));
    // prevent the default form submission behavior
    event.preventDefault();
    // Check the token exist
    const token = searchParams.get('token');
    if(!token)
    document.getElementById("newMessage").textContent = "We canoot reset the password.";
    // Check if password is empty
    else if (!password) {
      document.getElementById("newMessage").textContent = "Password cannot be empty.";
      return;
    }
    // Check if passwords match on the client side
    else if (password !== confermePassword) {
      document.getElementById("newMessage").textContent = "Passwords do not match.";
      return; // Don't proceed with the request
    }
    //call function resetPassword from flux
    else actions.newPass(token, password);  
};

  return (
          <div className="container-fluid min-height-100 reset-container " data-theme={theme}>
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
              <button onClick={handleNewPassword} id="newPass" aria-label="newPass" className="btn-pass">
                Send
              </button>
              <p className="text-danger" id="newMessage"></p>
            </div>
         </div>   
  );
};
