import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/profile.css";

export const Profile = () => {
	const { actions } = useContext(Context);
    const [showData1, setShowData1] = useState(false);
    const [showData2, setShowData2] = useState(false);
    const [showData3, setShowData3] = useState(false);
    const [hideData, setHideData] = useState(true);

    // Function that when clicked on first arrow, displays the return button and the data
  const toggleButtons1 = () => {
    setShowData1(true);
  };

  // Function that when clicked on second arrow, displays the return button and the data
  const toggleButtons2 = () => {
    setShowButton(true);
    setShowData2(true);
  };

  // Function that when clicked on third arrow, displays the return button and the data
  const toggleButtons3 = () => {
    setShowButton(true);
    setShowData3(true);
  };

  // Function to hide the previous data
  const hideButton = () => {
    setHideData(!hideData);
  };

	return (
		<div className="container-fluid my-5">
			<h1 className="hello"> Hello </h1>
            <br />
            <div className="profile">
                <div className="order-description">
                    <div className="my-order-description">
                        <p>Personal Data</p>
                        <p>Shipping Data</p>
                        <p>Orders</p>
                    </div>
                    <div>
                        <p><i onClick={() => {toggleButtons1(); hideButton(); }} className="fa-solid fa-chevron-down"></i></p>
                        <p><i onClick={() => {toggleButtons2(); hideButton(); }} className="fa-solid fa-chevron-down"></i></p>
                        <p><i onClick={() => {toggleButtons3(); hideButton(); }} className="fa-solid fa-chevron-down"></i></p>
                    </div>
                </div>
                {hideData && (
                    <div className="order">
                        <h4><i className="fa-solid fa-box-open"></i> Last Order</h4>
                        <div className="details">
                            <div className="my-details">
                                <p>Order: Nº </p>
                                <p>Date:  </p>
                                <p>Price:  </p>
                                <p>Product:  x  </p>
                            </div>
                            <div className="status">
                                <p>Status:  </p>
                            </div>
                        </div>
                     </div>
                )}
                {showData1 && (
                    <>
                        <Link className="return" to="/profile">
                            <i className="fa-solid fa-arrow-left"></i> Return to my profile
                        </Link>
                        <div className="order">
                            <h4>Personal Data</h4>
                            <div className="details-data">
                                    <p>Full Name: </p>
                                    <p>Username:  </p>
                                    <p>Email:  </p>
                            </div>
                        </div>
                    </>
                )}
                {showData2 && (
                        <>
                            <Link className="return row" to="/profile">
                                <i className="fa-solid fa-arrow-left"></i> Return to my profile
                            </Link>
                            <div className="order">
                                <h4>Shipping Data</h4>
                                <div className="details-data">
                                    <p>First Name: </p>
                                    <p>Last Name: </p>
                                    <p>Country/region:  </p>
                                    <p>Adress:  </p>
                                    <p>Zip code:  </p>
                                    <p>City:  </p>
                                    <p>Phone:  </p>
                                    <p>Email:  </p>
                                </div>
                            </div>
                        </>
                )}{showData3 && (
                    <>
                        <Link className="return" to="/profile">
                            <i className="fa-solid fa-arrow-left"></i> Return to my profile
                        </Link>
                        <div className="order">
                        <h4>Orders</h4>
                            <div className="details-data">
                                <p>Order: Nº </p>
                                <p>Date:  </p>
                                <p>Price:  </p>
                                <p>Product:  x  </p>
                            </div>
                        </div>
                    </>
                )}
                </div>
        <button className="btn-logout" onClick={() => actions.logout()} type="submit">Logout</button>
	</div>
	);
};
