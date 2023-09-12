import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
function Login(props) {
  const [loginForm, setloginForm] = useState({
    email: "",
    password: "",
  });

  function logMeIn(event) {
    axios({
      method: "POST",
      url: "/token",
      data: {
        email: loginForm.email,
        password: loginForm.password,
      },
    })
      .then((response) => {
        props.setToken(response.data.access_token);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

    setloginForm({
      email: "",
      password: "",
    });

    event.preventDefault();
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setloginForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }
  const gotoRegister = () => {};
  return (
    <section class="bg-danger">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong">
              <div class="card-body p-5 text-center">
                <h3 class="mb-5">Log in</h3>
                <button
                  class="btn btn-lg btn-block btn-primary bg-primary mb-3 form-control form-control-lg"
                  type="submit"
                >
                  <i class="fab fa-google me-2"></i> Sign in with google
                </button>
                or
                <div class="form-outline mb-4">
                  <label
                    class="form-label d-flex justify-content-start"
                    for="typeEmailX-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="typeEmailX-2"
                    class="form-control form-control-lg"
                  />
                </div>
                <div class="form-outline mb-4">
                  <label
                    class="form-label d-flex justify-content-start"
                    for="typePasswordX-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="typePasswordX-2"
                    class="form-control form-control-lg"
                  />
                </div>
                <div class="form-check d-flex justify-content-start mb-4">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="form1Example3"
                  />
                  <label class="form-check-label" for="form1Example3">
                    {" "}
                    Remember password{" "}
                  </label>
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    class="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    Login
                  </button>
                  <Link
                    to="/register"
                    class="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    Register
                  </Link>
                </div>
                <hr class="my-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
