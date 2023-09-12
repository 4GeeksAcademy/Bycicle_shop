import React, { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [resetStatus, setResetStatus] = useState(null);

  const handleResetPassword = async () => {
    try {
      // Send a request to your server to initiate the password reset process
      const response = await axios.post("/api/reset-password", { email });
      if (response.status === 200) {
        setResetStatus("Password reset email sent.");
      }
    } catch (error) {
      setResetStatus("Error sending reset email.");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleResetPassword}>Send Reset Email</button>
      {resetStatus && <p>{resetStatus}</p>}
    </div>
  );
}

export default ResetPassword;