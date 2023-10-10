import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SelectedTypeContext from "../TypeContext";
import "../../styles/product.css";

function Product(props) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { selectedType } = useContext(SelectedTypeContext);

  function getData() {
    console.log("getData called");


    let url = process.env.BACKEND_URL + "/api/products";
    if (selectedType) {
      axios
        .get(url)
        .then((response) => {
          console.log("Response received: ", response.data);
          if (response.data.success === "true") {
            const filteredProducts = response.data.bicycles.filter((product) =>
              product.name.includes(selectedType)
            );
            setProducts(filteredProducts);
            console.log("Fetched products: ", filteredProducts);
          }
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    } else {
      axios
        .get(url)
        .then((response) => {
          console.log("Response received: ", response.data);
          if (response.data.success === "true") {
            setProducts(response.data.bicycles);
            console.log("Fetched products: ", response.data.bicycles);
          }
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  }

  useEffect(() => {
    getData(); // fetch the products when selectedType is changed
  }, [selectedType]);

  useEffect(() => {
    console.log("useEffect called");
    if (!props.token && props.token !== "" && props.token !== undefined) {
      navigate("/login");
    }
    getData();
  }, [selectedType]);


  return (
    <div className="container-fluid min-height-100 ">
      <div className="row row-card">
        {Array.isArray(products) && products.map((product, index) => (
          <div className="card my-card " >
            <div key={index} className="product-card my-product-card">
              <div className="card-img-top card-producct-img" >
                <img className="img-bike " src={product.image_url || "placeholder-image-url.jpg"} alt={product.name} />
              </div>
              <div className="card-body card-product">
                  <p><strong>{product.name}</strong></p>
                  <p><strong>Color:</strong> {product.color}</p>
                  <p><strong>Price:</strong> $ {product.price}</p>
                  <p><strong>In stock:</strong> {product.instock}</p>
            </div> 
          </div>  
          <Link to={`/product/${product.id}`}>
            <button tipe="button" id="seeDetails" aria-label="seeDetails" className="btn-product-card">See details</button>
          </Link>
      </div> 
        ))}
        </div>
  </div>
  );
}

export default Product;