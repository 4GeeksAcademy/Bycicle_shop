import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from 'react-google-login';
import { serverURL } from "../config";
import { Link, useNavigate } from "react-router-dom";


export function Login (props) {
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
    // Handle the error as needed
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
          //window.location.reload();
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
    <section className="container-fluid min-height-100 ">
      <h1 className="pb-2 text-white pt-2">Login</h1>
      <div className="container pb-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong">
              <div className="card-body p-5 text-center">
                <div className="text-center mt-4">
                  <GoogleLogin
                    clientId="YOUR_GOOGLE_CLIENT_ID"
                    buttonText="Sign in with Google"
                    onSuccess={responseGoogleSuccess}
                    onFailure={responseGoogleFailure}
                    cookiePolicy={'single_host_origin'}
                  />
                </div>
                or
                <div className="form-outline mb-4">
                  <label
                    className="form-label d-flex justify-content-start"
                    htmlFor="typeEmailX-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={onChangeEmail}
                    id="typeEmailX-2"
                    className="form-control form-control-lg"
                  />
                </div>
                <div className="form-outline mb-4">
                  <label
                    className="form-label d-flex justify-content-start"
                    htmlFor="typePasswordX-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    id="typePasswordX-2"
                    className="form-control form-control-lg"
                  />
                </div>
                <div className="form-check d-flex justify-content-start mb-4">
                  <div className="form-check-input-container">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="form1Example3"
                    />
                  </div>
                  <div className="form-check-label-container">
                    <label className="form-check-label labelRight" htmlFor="form1Example3">
                      {" "}
                      Remember password{" "}
                    </label>
                  </div>
                </div>
                {emailFlag || apiFlag || passwordFlag ? (
                  <p className="text-danger">{message}</p>
                ) : null}
                <div className="d-flex justify-content-between">
                  <button
                    onClick={login}
                    className="btn btn-primary btn-lg btn-block"
                  >
                    Login
                  </button>
                  <Link
                    to="/signup"
                    className="btn btn-primary btn-sm btn-block"
                    style={{ fontSize: "20px", paddingTop: "8px" }}
                    type="submit"
                  >
                    Register
                  </Link>
                  <Link
                    to="/reset"
                    className="btn btn-primary btn-sm btn-block"
                    style={{ fontSize: "18px", paddingTop: "12px" }}
                    type="submit"
                  >
                    Forgot Password?
                  </Link>

                </div>
                <hr className="my-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

