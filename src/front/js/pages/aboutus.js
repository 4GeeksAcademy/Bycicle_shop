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
    <section class="vh-100 bg-danger">
      <div class="container py-5 h-100">
        <div class="row d-flex align-items-center justify-content-center h-100">
          <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <h1>About Us</h1>
            <hr />
            <p class="text-start fw-bold mx-3 mb-0 text-white">
              ILorem ipsum dolor sit amet, consectetur adipiscing elit. In erat
              quam, pellentesq ILorem ipsum dolor sit amet, consectetur
              adipiscing elit. In erat quam, pellentesq ILorem ipsum dolor sit
              amet, consectetur adipiscing elit. In erat quam, pellentesq ILorem
              ipsum dolor sit amet, consectetur adipiscing elit. In erat quam,
              pellentesq ILorem ipsum dolor sit amet, consectetur adipiscing
              elit. In erat quam, pellentesq ILorem ipsum dolor sit amet,
              consectetur adipiscing elit. In erat quam, pellentesq
            </p>
          </div>
          <div class="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              class="img-fluid"
              alt="Phone image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
