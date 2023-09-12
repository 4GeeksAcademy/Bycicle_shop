import React, { useState, useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { Order } from "../component/order";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../styles/profile.css";

export const Profile = () => {
	const { store, actions } = useContext(Context);
    const [showButton, setShowButton] = useState(false);
    const [showData1, setShowData1] = useState(false);
    const [showData2, setShowData2] = useState(false);
    const [showData3, setShowData3] = useState(false);
    const [hideData, setHideData] = useState(true);
    const params = useParams();

    // Function that when clicked on first arrow, displays the return button and the data
  const toggleButtons1 = () => {
    setShowButton(true);
    setHideData(false);
    setShowData1(true);
    setShowData2(false);
    setShowData3(false);
  };

  // Function that when clicked on second arrow, displays the return button and the data
  const toggleButtons2 = () => {
    setShowButton(true);
    setShowData1(false);
    setShowData2(true);
    setShowData3(false);
    setHideData(false);
  };

  // Function that when clicked on the return button, displays the profile page like in the beggining
  const toggleButtons3 = () => {
    setShowButton(true);
    setShowData1(false);
    setShowData2(false);
    setShowData3(true);
    setHideData(false);
  };

  // Function that when clicked on third arrow, displays the return button and the data
  const resetPage = () => {
    setShowButton(false);
    setShowData1(false);
    setShowData2(false);
    setShowData3(false);
    setHideData(true);
  };

  /*useEffect(() => {
    if (params.id && params.orders === "order") {
        actions.getInicialvalue(params.id);
    } }, []);*/

	return (
		<div className="container-fluid my-5">
            <div className="big-title">
                <h1 className="hello"> Hello, {store.user.username} </h1>
                {showButton &&  (
                        <Link onClick={() => {resetPage() }} className="return-second mt-3" to="/profile">
                            <i className="fa-solid fa-arrow-left"></i> Return to my profile
                        </Link>
                )}
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
                        <p><i onClick={() => {toggleButtons1() }} className="profile-fa fa-solid fa-chevron-down"></i></p>
                        <p><i onClick={() => {toggleButtons2() }} className="profile-fa fa-solid fa-chevron-down"></i></p>
                        <p><i onClick={() => {toggleButtons3() }} className="profile-fa fa-solid fa-chevron-down"></i></p>
                    </div>
                </div>
                {hideData && (
                    <>
                    <div className="order">
                        <h4><i className="fa-solid fa-box-open"></i> Last Order</h4>
                        <div className="details">
                            <div className="my-details">
                                <p>Order: Nº{store.orders.id} </p>
                                <p>Date: {store.orders.date} </p>
                                <p>Price: {store.orders.price} </p>
                                <p>Product: {/*{store.Bicycles.name} + "x" + {store.orderItem.quantity} */}</p>
                            </div>
                            <div className="status">
                                <p>Status: {store.orders.status} </p>
                            </div>
                        </div>
                     </div>
                    </>
                )}
                {showData1 && (
                    <>
                        <div className="order">
                            <h4>Personal Data</h4>
                            <div className="details-data">
                                    <p>Full Name: {store.orders.userFirstName + " " + store.orders.userLasttName } </p>
                                    <p>Username: {store.orders.username} </p>
                                    <p>Email: {store.orders.email}  </p>
                            </div>
                        </div>
                    </>
                )}
                {showData2 && (
                            <div className="order">
                                <h4>Shipping Data</h4>
                                <div className="details-data">
                                    <p>First Name: {store.orders.userFirstName} </p>
                                    <p>Last Name: {store.orders.userLasttName}</p>
                                    <p>Country/region: {store.orders.country} </p>
                                    <p>Adress: {store.orders.address} </p>
                                    <p>Zip code: {store.orders.zipcode} </p>
                                    <p>City: {store.orders.city} </p>
                                    <p>Phone: {store.orders.phone} </p>
                                    <p>Email: {store.orders.email} </p>
                                </div>
                            </div>
                )}
                {showData3 && (
                        <div className="order">
                        <h4>Orders</h4>
                            {store.orders && store.orders.length > 0
                            ? store.orders.map((order) => (
                                <Order
                                    key={order.id}
                                    orders={order}
                                    addCart={actions.addProduct}
                                />
                            ))
                            : ""}
                        </div>
                )}
                </div>
            <Link to="/">    
                <button className="btn-logout" onClick={() => actions.logout()} type="submit">Logout</button>
            </Link>  
            <br />  
            <br />  
	    </div>
	);
};
