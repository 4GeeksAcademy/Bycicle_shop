import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from 'react-google-login';
import { serverURL } from "../config";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";

export function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordFlag, setPasswordFlag] = useState(false);
  const [apiFlag, setAPIFlag] = useState(false);
  const [message, setMessage] = useState("Wrong credential");

  const onChangeEmail = (event) => {
    setEmailFlag(false);
    setEmail(event.target.value);
    if (event.target.value === "") {
      setEmailFlag(true);
    }
  };

  const onChangePassword = (event) => {
    setPasswordFlag(false);
    setPassword(event.target.value);
    if (event.target.value === "") {
      setPasswordFlag(true);
    }
  };

  // Handle Google login success
  const responseGoogleSuccess = (response) => {
    const { tokenId } = response;
    // Send the tokenId to your Flask server for authentication
    axios
      .post(`/google-login`, { tokenId })
      .then((response) => {
        console.log(response);
        if (response.data.success === "true") {
          console.log(response.data.access_token);
          console.log("Login successful");
          props.setToken(response.data.access_token);
          navigate("/products");
        } else {
          setAPIFlag(true);
          setMessage(response.data.msg);
          console.log("Login failed");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };

  // Handle Google login failure
  const responseGoogleFailure = (error) => {
    console.error("Google login failed:", error);

  };

  async function login(event) {
    event.preventDefault();
    let flag = true;
    if (email === "") {
      flag = false;
      setEmailFlag(true);
    }
    if (password === "") {
      flag = false;
      setPasswordFlag(true);
    }
    if (!flag) {
      setMessage("Wrong credential");
      return;
    }
    const payload = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(`${serverURL}/login`, payload);
      console.log(response);

      if (response.data.success === "true") {
        // Store access token in local storage
        localStorage.setItem('access_token', response.data.access_token);
        console.log("Login successful");

        console.log(localStorage.getItem('access_token'));

        console.log("Navigating to profile"); // to check if Navigation function is called

        if (localStorage.getItem('access_token')) {
          navigate("/profile");

        } else {
          console.log("Token not set");
        }
      } else {
        setAPIFlag(true);
        setMessage(response.data.msg);
        console.log("Login failed");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  }  return (
          <div className="container-fluid min-height-100 ">
              <h1 className="text-login">Login</h1>
              <div className="container my-login">
                <div className="btn-login-google">
                  <GoogleLogin
                    clientId="YOUR_GOOGLE_CLIENT_ID"
                    buttonText="LOGIN WITH GOOGLE "
                    onSuccess={responseGoogleSuccess}
                    onFailure={responseGoogleFailure}
                    cookiePolicy={'single_host_origin'}
                    className="login-google"
                  />
                </div>
                <div className="row mt-5 text-center">
                  <div className="col-5 line-login"></div>
                  <div className="col-2 p-0">or</div>
                  <div className="col-5 line-login"></div>
                </div>
                <br />
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={onChangeEmail}
                    id="typeEmailX-2"
                    className="form-control form-control-lg form-input-login"
                    placeholder="Email"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    id="typePasswordX"
                    className="form-control form-control-lg form-input-login"
                    placeholder="Password"
                  />
                </div>
                <div className="form-check d-flex row mt-4 p-0 ms-0">
                  <div className="d-flex ">
                    <div className=" d-flex col-6 ">
                      <input
                        className="form-check-input-login me-2"
                        type="checkbox"
                        value=""
                        id="form1Example3"
                      />
                        <label className="form-check-label" htmlFor="form1Example3">
                          {" "}
                          Remember password{" "}
                        </label>
                  </div>
                  <Link
                    className="forgot-link link col-6"
                    to="/resetPassword"
                    type="submit"
                  >
                    Forgot Password?
                  </Link>
                </div>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                {emailFlag || apiFlag || passwordFlag ? (
                  <p className="text-danger">{message}</p>
                ) : null}
                <div className="d-flex justify-content-between">
                  <button
                    onClick={login}
                    className="btn-login"
                  >
                    Login
                  </button>
                  <Link className="link" to="/signup">
                    <button
                      className="btn-login"
                      type="submit"
                    >
                      Register
                    </button>
                  </Link>
                </div>
              </div>
            </div>
  );
}

