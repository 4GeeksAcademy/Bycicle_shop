import { useState } from "react";
import axios from "axios";
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import { Link } from "react-router-dom";
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
      <h1 class="pb-2 text-white pt-2">Send us a message</h1>
      <h5 class=" text-white pt-2">
        We'd happy to answer your questions! Fill out the form bellow with your
        contact details and contact us.
      </h5>
      <div class="container py-2 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong">
              <div class="card-body p-4 text-center">
                <div class="form-outline mb-2">
                  <label
                    class="form-label d-flex justify-content-start"
                    for="fullname"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    class="form-control form-control-lg"
                  />
                </div>
                <div class="form-outline mb-2">
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
                <div class="form-outline mb-2">
                  <label
                    class="form-label d-flex justify-content-start"
                    for="phone"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    class="form-control form-control-lg"
                  />
                </div>
                <div class="form-outline mb-2">
                  <label
                    class="form-label d-flex justify-content-start"
                    for="phone"
                  >
                    The issue/problem
                  </label>
                  <input
                    type="text"
                    id="phone"
                    class="form-control form-control-lg"
                  />
                </div>
                <div class="form-outline mb-2">
                  <label
                    class="form-label d-flex justify-content-start"
                    for="phone"
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    rows={2}
                    id="phone"
                    class="form-control form-control-lg"
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    class="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 class="pb-2 text-white pt-2">Our Contacts</h1>
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <p class=" text-dark pt-2 d-flex justify-content-start">
            <b>Email:</b> bicycle@shop.com
          </p>
          <p class=" text-dark pt-2 d-flex justify-content-start">
            <b>Telephone:</b> *************
          </p>
          <p class=" text-dark pt-2 d-flex justify-content-start">
            <b>warehouse address:</b>{" "}
            wehwrthjsrhsdrhqersrtjdtykdrthjsrthsrhsrehszdfg
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
