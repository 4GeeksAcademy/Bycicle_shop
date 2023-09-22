import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../img/logo.png";
import "../../styles/navbar.css";

export const Navbar = (props) => {
  // State for controlling the search bar and results
  const [bar, setBar] = useState(false);
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [showAutocomplete, setShowAutocomplete] = useState(false);

// Handle changes in the search input
const handleChange = (value) => {
  setInput(value);
  if (value.trim() === "") {
    setSearchResults([]);
    setShowAutocomplete(false);
  } else {
    // Make an Axios request to fetch search results
    // Make an Axios request to fetch search results
    axios
    .get(`https://cautious-carnival-xpqwxwxp9p4h65xp-3001.app.github.dev/api/products`)
    .then((response) => {
      console.log("Response received: ", response.data);
      if (response.data.success === true) {
        const data = response.data.bicycles.filter((result) =>
          result.name.toLowerCase().includes(value.toLowerCase())
        );
        console.log("ok");
        setShowAutocomplete(true);
        setSearchResults(data);
        console.log("Fetched products: ", response.data.bicycles);
      }
    })
    .catch((error) => {
      console.error("Error occurred during the request:", error);
    });
}
};

  // Handle selecting an autocomplete suggestion
  const handleAutocompleteSelection = (selectedValue) => {
    console.log("handleAutocompleteSelection called with:", selectedValue);
    setInput(selectedValue);
    setShowAutocomplete(false);
    navigate(`/products/${selectedValue.id}`);
  };

  // Navigate to the products page
  const bicycleList = () => {
    navigate('/products');
  };

  return (
    <nav className="navbar navbar-box navbar-dark navbar-expand-lg">
      <div className="container-fluid navbar-container d-flex">
        <Link to="/">
          <img src={logo} className="img" alt="logo" />
        </Link>
        <div className="menu col-sm-11 col-md-11 col-lg-8 col-xl-8">
          {/* Dropdown and navigation buttons */}
          <div className="dropdown mb-3 language">
            <button
              className="btnlanguage dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              English - Euro <i className="fa-solid fa-chevron-down"></i>
            </button>
            <ul className="dropdown-language dropdown-menu">
              <li>
                <label className="form-label my-form-label">Language</label>
                <input type="text" className="form-control mb-3" id="exampleFormControlInput1" />
              </li>
              <li>
                <label className="form-label my-form-label">Currency</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" />
              </li>
              <br />
              <button className="form-btn">
                APPLY
              </button>
            </ul>
          </div >
          <button
            className="navbar-toggler my-navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className='collapse my-collapse navbar-collapse' id="navbarNavAltMarkup">
            <div className="navbar-nav ">
              <Link className="link-collapse" to="/contactus">
                <button className="btn my-btn toggler">
                  Contact Us
                </button>
              </Link>
              <Link className="link-collapse" to="/aboutus">
                <button className="btn my-btn toggler">
                  About Us
                </button>
              </Link>
              <div>
              </div>
              <div className="link-collapse dropdown">
                <button
                  className="btn my-btn toggler custom-dropdown-toggle"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseProducts"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Products
                </button>
              </div>
              <div className="collapse" id="collapseProducts">
                <ul className="card card-body my-dropdown-menu">
                  <li>
                    <button className="dropdown-item my-dropdown-item" onClick={bicycleList}>
                      Road Bikes
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item my-dropdown-item" onClick={bicycleList}>
                      Mountain Bikes
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item my-dropdown-item" onClick={bicycleList}>
                      Hybrid Bikes
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item my-dropdown-item" onClick={bicycleList}>
                      Speciality Bikes
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item my-dropdown-item" onClick={bicycleList}>
                      BMX Bikes
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item my-dropdown-item" onClick={bicycleList}>
                      Kid's Bikes
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item my-dropdown-item" onClick={bicycleList}>
                      Other types
                    </button>
                  </li>
                </ul>
              </div>
              <div>
              {/* Search bar */}
              <div className="show-buttons link-collapse">
                <i className="icon fa-solid fa-magnifying-glass" onClick={() => setBar(true)}></i>
                {bar && ( 
                  <form className="form-inline search my-lg-0">
                    <input
                      id="searchInput"
                      className="form-search"
                      type="search"
                      placeholder="Search... "
                      value={input}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                    <i className="fa-solid fa-magnifying-glass fa-navbar"></i>
                  </form>
                )}
                
                {showAutocomplete && (
                  <ul className="autocomplete-results">
                    {searchResults.map((result) => (
                      <li key={result.id} onClick={() => handleAutocompleteSelection(result.name)}>
                        {result.name}
                      </li>
                    ))}
                  </ul>
                )}
                <Link className="show-buttons link-collapse" to="/login">
                  <i className="icon fa-regular fa-user"></i>
                </Link>
                <Link className="show-buttons link-collapse" to="/ShoppingCart">
                  <i className="icon fa-solid fa-cart-shopping" tabIndex="-1"></i>
                </Link>
              </div> 
              </div>
              {/* Hidden buttons */}
              <div className="hide-buttons link-collapse">
                <div className="my-hide-buttons" onClick={() => setBar(true)}>
                  {bar && ( 
                    <form className="search my-lg-0">
                      <input className="form-search" type="search" placeholder="Search... " aria-label="Search" value={input} onChange={(e) => handleChange(e.target.value)} />
                      <i className="fa-solid fa-magnifying-glass fa-navbar"></i>
                    </form>
                  )}
                   {searchResults.map((result) => (
                      <li key={result.id} onClick={() => handleAutocompleteSelection(result.name)}>
                        {result.name}
                      </li>
                    ))}
                         <i className="icon fa-solid fa-magnifying-glass"></i> Search
                  </div>
                  <Link className="hide-buttons link-collapse" to="/login">
                    <div className="my-hide-buttons">
                      Login
                    </div>
                  </Link>
                  <Link className="hide-buttons link-collapse" to="/ShoppingCart">
                    <div className="my-hide-buttons">
                      <i className="icon fa-solid fa-cart-shopping"></i> Cart
                    </div>
                  </Link>
                </div>
              </div>
              </div>
              </div>
          </div>       
       </nav>
    );
  };