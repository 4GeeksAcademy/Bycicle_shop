import React, { useState, useEffect } from "react"; 
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config";
function Product(props) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  function getData() {
    axios
      .get(`${API_URL}/products`)
      .then((response) => {
        console.log(response);
        if (response.data.success === "true") {
          console.log(response.data.access_token);
          setProducts(response.data.bicycles);
        } else {
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  }
  useEffect(() => {
    if (!props.token && props.token !== "" && props.token !== undefined) {
      navigate("/login");
    }
    getData();
  }, []);
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4 p-5 bg-danger">
      {products && products.length > 0
        ? products.map((item) => (
            <div className="col">
              <div className="card mx-2">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp"
                  className="card-img-top p-2 pb-0"
                  alt="Hollywood Sign on The Hill"
                />
                <div className="card-body pb-0">
                  <div className="d-flex justify-content-between">
                    <div>
                      <div className="d-flex flex-row justify-content-end mt-1  text-danger">
                        <i className="fas fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body pb-0">
                  <div className="d-flex justify-content-start">
                    <a href="#!" className="text-dark">
                      {item.name}
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-centermb-1">
                    <a href="#!" className="text-dark fw-bold">
                      ${item.price}
                    </a>
                    <Link
                      to={`/product_detail/${item.id}`}
                      type="button"
                      className="btn btn-primary"
                    >
                      Buy now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
}

export default Product;
