import { useState } from "react";
import axios from "axios";
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import { API_URL } from "../utils/config";
import { Link, Router, useNavigate } from "react-router-dom";
function Login(props) {
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

  function login(event) {
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
    axios
      .post(`${API_URL}/login`, payload)
      .then((response) => {
        console.log(response);
        if (response.data.success === "true") {
          console.log(response.data.access_token);
          props.setToken(response.data.access_token);
          navigate("/products");
        } else {
          setAPIFlag(true);
          setMessage(response.data.msg);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
    event.preventDefault();
  }
  return (
    <section className="bg-danger">
      <h1 className="pb-2 text-white pt-2">Login</h1>
      <div className="container pb-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong">
              <div className="card-body p-5 text-center">
                <button
                  className="btn btn-lg btn-block btn-primary bg-primary mb-3 form-control form-control-lg"
                  type="submit"
                >
                  <i className="fab fa-google me-2"></i> Sign in with google
                </button>
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
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="form1Example3"
                  />
                  <label className="form-check-label" htmlFor="form1Example3">
                    {" "}
                    Remember password{" "}
                  </label>
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
                    to="/register"
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    Register
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

export default Login;
