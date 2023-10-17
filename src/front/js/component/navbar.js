import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../img/logo.png";
import "../../styles/navbar.css";
import SelectedTypeContext from "../TypeContext";
import { useUser } from "./userContext";


export const Navbar = (props) => {
  const [bar, setBar] = useState(false);
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const { setSelectedType } = useContext(SelectedTypeContext);
  const { isLoggedIn, setIsLoggedIn } = useUser(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const handleDropdownClick = (type) => {
    bicycleList(type);
    toggleDropdown();
  };

  const bicycleList = (type) => {
    setSelectedType(type);
    navigate('/products');
    
  };

  // Handle changes in the search input
  const handleChange = (value) => {
    setInput(value);
    if (value.trim() === "") {
      setSearchResults([]);
      setShowAutocomplete(false);
    } else {
      // Make an Axios request to fetch search results
      axios
        .get(process.env.BACKEND_URL + "/api/products")
        .then((response) => {
          console.log(response.data); // search function log
          if (response.data.success === "true") {
            // Filter the results by name
            const filteredResults = response.data.bicycles.filter((bike) =>
              bike.name.toLowerCase().includes(value.toLowerCase())
            );
            console.log(filteredResults); // search function log
            setSearchResults(filteredResults);
            setShowAutocomplete(true); // Show autocomplete suggestions
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  // Handle selecting an autocomplete suggestion
  const handleAutocompleteSelection = (selectedValue) => {
    console.log("handleAutocompleteSelection called with:", selectedValue);
    setInput("");
    setBar(false);
    setShowAutocomplete(false);
  };

  // Handle rendering of the autocomplete dropdown
  const renderAutocompleteDropdown = () => {
    if (showAutocomplete && searchResults.length > 0) {
      return (
        <ul className="autocomplete-results form-autocomplete">
          {searchResults.map((result) => (
            <li className="li-search" key={result.id} >
              <Link className="link-search" onClick={handleAutocompleteSelection} to={`/product/${result.id}`}>
                {result.name}
              </Link>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  useEffect(() => {
    console.log("ProfileRedirect triggered.");
    const token = localStorage.getItem('access_token');
    console.log("Token:", token);

    if (token) {
      console.log("Token found, navigating to /profile");
      setIsLoggedIn(true); 
    } else {
      console.log("No token found, not navigating.");
    }
  }, [isLoggedIn]);

  return (
    <nav className="navbar navbar-box navbar-dark navbar-expand-lg">
      <div className="container-fluid navbar-container d-flex">
        <Link to="/">
          <img src={logo} className="img" alt="logo" />
        </Link>
        <div className="menu col-sm-11 col-md-11 col-lg-8 col-xl-8">
          {/* Dropdown and navigation buttons */}
        
          <button
            className="navbar-toggler my-navbar-toggler"
            type="button"
            id="collapse-menu"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className='collapse my-collapse navbar-collapse' id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="link-collapse" to="/contactus">
                <button className="btn my-btn toggler" id="contactUs" aria-label="contactUs">
                  Contact Us
                </button>
              </Link>
              <Link className="link-collapse" to="/aboutus">
                <button className="btn my-btn toggler" id="aboutUs" aria-label="aboutUs">
                  About Us
                </button>
              </Link>
              <div>
              </div>
              <div className="link-collapse dropdown">
                <button
                  className="btn my-btn toggler custom-dropdown-toggle"
                  type="button"
                  id="dropdownProducts"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseProducts"
                  aria-label="dropdownProducts"
                  aria-expanded={isDropdownOpen}
                  aria-controls="collapseExample"
                  onClick={toggleDropdown}
                >
                  Products
                </button>
              </div>
              <div className={isDropdownOpen ? "collapse show" : "collapse"} id="collapseProducts">
                <ul className="card card-body my-dropdown-menu">
                  <li>
                    <button className="dropdown-item my-dropdown-item" id="roadBikes" aria-label="roadBikes" onClick={() => handleDropdownClick('Road Bikes')}>
                      Road Bikes
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item my-dropdown-item" id="mountainBikes" aria-label="mountainBikes" onClick={() => handleDropdownClick('Mountain Bikes')}>
                      Mountain Bikes
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item my-dropdown-item" id="hybridBikes" aria-label="hybridBikes" onClick={() => handleDropdownClick('Hybrid Bikes')}>
                      Hybrid Bikes
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item my-dropdown-item" id="cityBikes" aria-label="cityBikes" onClick={() => handleDropdownClick('City Bikes')}>
                      City Bikes
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item my-dropdown-item" id="cyclocrossBikes" aria-label="cyclocrossBikes" onClick={() => handleDropdownClick('Cyclocross Bikes')}>
                      Cyclocross Bikes
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item my-dropdown-item" id="kidsBikes" aria-label="kidsBikes" onClick={() => handleDropdownClick("Kid's Bikes")}>
                      Kid's Bikes
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item my-dropdown-item" id="otherTypes" aria-label="otherTypes" onClick={() => handleDropdownClick('')}>
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
                        placeholder="Search... "
                        value={input}
                        onChange={(e) => handleChange(e.target.value)}
                      />
                    </form>
                  )}
                  {renderAutocompleteDropdown()}
                 <Link className="show-buttons link-collapse" to={isLoggedIn ? "/profile" : "/login"}> 
                    <i className="icon fa-regular fa-user"></i>
                  </Link>
                  <Link className="show-buttons link-collapse" to="/ShoppingCart">
                    <i className="icon fa-solid fa-cart-shopping" tabIndex="-1"></i>
                  </Link>
                </div>
              </div>
              <div className="hide-buttons link-collapse">
                <div className="my-hide-buttons" onClick={() => setBar(true)}>
                  {bar && (
                    <form className="search my-lg-0">
                      <input className="form-search" type="search" placeholder="Search... " aria-label="Search" value={input} onChange={(e) => handleChange(e.target.value)} />
                      <i className="fa-solid fa-magnifying-glass fa-navbar"></i>
                    </form>
                  )}
                  {renderAutocompleteDropdown()}
                  <i className="icon fa-solid fa-magnifying-glass"></i> Search
                </div>
                <Link className="hide-buttons link-collapse" to="/login">
                  <div className="my-hide-buttons">
                    Login
                  </div>
                </Link>
                <Link className="hide-buttons link-collapse" to="/signup">
                  <div className="my-hide-buttons">
                    Register
                  </div>
                </Link>
                <Link className="hide-buttons link-collapse" to="/profile">
                  <div className="my-hide-buttons">
                    Profile
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
