import React, { useState, useEffect } from "react"; 
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Product(props) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  
  function getData() {
    console.log("getData called");
    axios
      .get(process.env.BACKEND_URL + "/api/products")  
      .then((response) => {
        console.log("Response received: ", response.data); 
        if (response.data.success === "true") {
          setProducts(response.data.bicycles);
          console.log("Fetched products: ", response.data.bicycles);
        }
      })
  }
  
  useEffect(() => {
    console.log("useEffect called"); 
    if (!props.token && props.token !== "" && props.token !== undefined) {
      navigate("/login");
    }
    getData();
  }, []);
  
  return (
    <div>
      <h1>Product List</h1>
      <div className="product-container">
        {Array.isArray(products) && products.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image_url || "placeholder-image-url.jpg"} alt={product.name} />
            <h2>{product.name}</h2>
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
