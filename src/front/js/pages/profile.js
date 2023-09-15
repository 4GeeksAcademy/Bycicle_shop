import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Order } from "../component/order";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/profile.css";

const Profile = () => {
  const { store, actions } = useContext(Context);
  const [show, setShow] = useState("last_order");
  const [showClass1, setShowClass1] = useState(false);
  const [showClass2, setShowClass2] = useState(false);
  const [showClass3, setShowClass3] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Automatically fetch data when component mounts
    getData(token);
  }, []);
  function getData() {
    axios({
      method: "GET",
      url: "/profile",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {
        const res = response.data;
        res.access_token && props.setToken(res.access_token);
        setProfileData({
          profile_name: res.name,
          about_me: res.about,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  return (
    <div className="container-fluid my-5">
      <div className="row">
        <h1 className="hello col-sm-2 col-md-2 col-lg-4 col-xl-4"> Hello, </h1>
        {show !== 'last_order' &&
          <div className="return-second col-sm-10 col-md-10 col-lg-8 col-xl-8">
            <Link onClick={() => setShow('last_order')} className="return-second" to="/profile">
              <i className="fa-solid fa-arrow-left"></i> Return to my profile
            </Link>
          </div>
        }
      </div>
      <br />
      <div className="profile">
        <div className="order-description">
          <div className="my-order-description">
            <p>Personal Data</p>
            <p>Shipping Data</p>
            <p>Orders</p>
          </div>
          <div>
            <p><i onClick={() => { setShow('personal_data'); setShowClass1(true); setShowClass2(false); setShowClass3(false); }} className={`profile-fa fa-solid fa-chevron-down ${showClass1 ? 'profile-fa-active' : ''}`}></i></p>
            <p><i onClick={() => { setShow('shipping_data'); setShowClass1(false); setShowClass2(true); setShowClass3(false); }} className={`profile-fa fa-solid fa-chevron-down ${showClass2 ? 'profile-fa-active' : ''}`}></i></p>
            <p><i onClick={() => { setShow('orders'); setShowClass1(false); setShowClass2(false); setShowClass3(true); }} className={`profile-fa fa-solid fa-chevron-down ${showClass3 ? 'profile-fa-active' : ''}`}></i></p>
          </div>
        </div>
        {show === 'last_order' && store.orders && (
          <div className="order">
            <h4><i className="fa-solid fa-box-open"></i> Last Order</h4>
            <div className="details">
              <div className="my-details">
                <p>Order: Nº{store.orders.id} </p>
                <p>Date: {store.orders.date} </p>
                <p>Price: {store.orders.price} </p>
                <p>Product: </p>
              </div>
              <div className="status">
                <p>Status: {store.orders.status} </p>
              </div>
            </div>
          </div>
        )}

        {show === 'personal_data' && (
          <div className="order">
            <h4>Personal Data</h4>
            <div className="details-data">
              <p>Full Name: {store.user.fullName} </p>
              <p>Username: {store.user.username} </p>
              <p>Email: {store.user.email} </p>
            </div>
          </div>
        )}
        {show === 'shipping_data' && (
          <div className="order">
            <h4>Shipping Data</h4>
            <div className="details-data">
              <p>First Name: {store.orders.userFirstName} </p>
              <p>Last Name: {store.orders.userLastName}</p>
              <p>Country/region: {store.orders.country} </p>
              <p>Address: {store.orders.address} </p>
              <p>Zip code: {store.orders.zipcode} </p>
              <p>City: {store.orders.city} </p>
              <p>Phone: {store.orders.phone} </p>
              <p>Email: {store.orders.email} </p>
            </div>
          </div>
        )}
        {show === 'orders' && (
          <div className="order">
            <h4>Orders</h4>
            <Order
            />
          </div>
        )}
      </div>
      <div className="btn-container">
        <Link className="return-second" to="/">
          <button className="btn-logout" onClick={() => actions.logout()} type="submit">Logout</button>
        </Link>
      </div>
    </div>
  );
};


export default Profile;
