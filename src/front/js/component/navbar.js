import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import "../../styles/navbar.css";

export const Navbar = () => {
/*const [searchBar, setSearchBar] = useState(false);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [combinedAutocompleteData, setCombinedAutocompleteData] = useState([]);
  const navigate = useNavigate();

  const handleChange = (value) => {
    setInput(value);
    if (value.trim() === "") {
      setCombinedAutocompleteData([]);
      setShowAutocomplete(false);
    } else {
      const fetchCharacters = fetch(`https://www.swapi.tech/api/people?`);
      const fetchPlanets = fetch(`https://www.swapi.tech/api/planets?`);

      Promise.all([fetchCharacters, fetchPlanets])
        .then((responses) =>
          Promise.all(responses.map((response) => response.json()))
        )
        .then(([charactersData, planetsData]) => {
          const combinedData = [
            ...charactersData.results.filter((result) =>
              result.name.toLowerCase().includes(value.toLowerCase())
            ),
            ...planetsData.results.filter((result) =>
              result.name.toLowerCase().includes(value.toLowerCase())
            ),
          ];
          setCombinedAutocompleteData(combinedData);
          console.log(combinedData)
          setShowAutocomplete(true);
        })
        .catch((error) => {
          console.log("Looks like there was a problem: \n", error);
        });
    }
  };

  const selectedItemType = (item) => {
    return item.url && item.url.toLowerCase().includes("people")
      ? "characters"
      : "planets";
  };

  const handleSelectAutocomplete = (selectedItem) => {
    setInput(selectedItem.name);
    setShowAutocomplete(false);
    console.log(`/details/${selectedItemType(selectedItem)}/${selectedItem.uid}`)
    navigate(`/details/${selectedItemType(selectedItem)}/${selectedItem.uid}`);
  };*/
  const navigate = useNavigate();

  const bicycle_list = () => {
    navigate('/products');
  };

  return (
    <nav className="navbar navbar-box navbar-dark navbar-expand-lg">
      <div className="container-fluid navbar-container d-flex">
        <Link to="/">
          <img src={logo} className="img" alt="logo" />
        </Link>
        <div className="menu col-sm-11 col-md-11 col-lg-8 col-xl-8">
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
                  onClick={bicycle_list}
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
                    <button className="dropdown-item my-dropdown-item">
                      Road Bikes
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item my-dropdown-item">
                      Mountain Bikes
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item my-dropdown-item">
                      Hybrid Bikes
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item my-dropdown-item">
                      Speciality Bikes
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item my-dropdown-item">
                      BMX Bikes
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item my-dropdown-item">
                      Kid's Bikes
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item my-dropdown-item">
                      Other types
                    </button>
                  </li>
                </ul>
              </div>
              <>
                <Link className="show-buttons link-collapse" to="/">
                  <i className="icon fa-solid fa-magnifying-glass"></i>
                </Link>
                <Link className="show-buttons link-collapse" to="/login">
                  <i className="icon fa-regular fa-user"></i>
                </Link>
                <Link className="show-buttons link-collapse" to="/ShoppingCart">
                  <i className="icon fa-solid fa-cart-shopping" tabIndex="-1"></i>
                </Link>
              </>
              <>
                <Link className="hide-buttons link-collapse" to="/">
                  <div className="my-hide-buttons">
                    <i className=" icon fa-solid fa-magnifying-glass"></i> Search
                  </div>
                </Link>
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
                <Link className="hide-buttons link-collapse" to="/">
                  <div className="my-hide-buttons">
                    Give us your feedback
                  </div>
                </Link>
              </>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};