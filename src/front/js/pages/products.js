import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SelectedTypeContext from "../TypeContext";

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
    <div>
      <h1>Product List</h1>
      <div className="product-container">
        {Array.isArray(products) && products.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image_url || "placeholder-image-url.jpg"} alt={product.name} />
            <Link to={`/product/${product.id}`}>
              <h2>{product.name}</h2>
            </Link>
            <p>Manufacturer: {product.manufacturer}</p>
            <p>Material: {product.material}</p>
            <p>Gender: {product.gender}</p>
            <p>Price: ${product.price}</p>
            <p>Color: {product.color}</p>
            <p>Weight: {product.weight}</p>
            <p>Type: {product.type}</p>
            <p>In stock: {product.instock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
