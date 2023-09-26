import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/resetPassword.css";

export const NewPassword = () => {
  const { actions } = useContext(Context);
  const [password, setPassword] = useState("");
  const [confermePassword, setConfermePassword] = useState("");

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
              <p className="text-danger" id="newMessage"></p>
            </div>
         </div>   
  );
};
