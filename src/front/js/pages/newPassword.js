import React, { useState } from "react";
import axios from "axios";
import "../../styles/resetPassword.css";

export const NewPassword = () => {
    const [password, setPassword] = useState("");
    const [confermePassword, setConfermePassword] = useState("");
    const [passResult, setPassResult] = useState("");

    const NewPass = async () => {
      // Check if passwords match on the client side
      if (password !== confermePassword) {
        setPassResult("Passwords do not match.");
        return; // Don't proceed with the request
      }
    
      const data = {
        'password': password,
        'confermePassword': confermePassword,
      };
    
      const jsonString = JSON.stringify(data, (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (value === data) {
            return undefined; // Exclude the circular reference
          }
        }
        return value;
      });
    
      const opts = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data: jsonString, // Send the JSON string in the request body
      };
    
      try {
        // Send a PUT request to your server to update the password
        const response = await axios.put(process.env.BACKEND_URL + "/newPassword", data, opts);
    
        if (response.status === 200) {
          setPassResult("Password changed successfully");
        } else if (response.status === 404) {
          setPassResult("User not found.");
        } else {
          setPassResult("Something went wrong.");
        }
      } catch (error) {
        console.error("Something went wrong:", error);
        setPassResult("Something went wrong.");
      }
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
              <p className="text-danger">{passResult}</p>
            </div>
         </div>   
  );
};
