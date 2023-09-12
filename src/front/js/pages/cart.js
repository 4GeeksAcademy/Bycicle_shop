import { useEffect, useState } from "react";
import axios from "axios";
// import { API_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";

function Profile(props) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  function getData() {
    axios
      .get(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${props.token}` },
      })
      .then((response) => {
        console.log(response);
        if (response.data.success === "true") {
          console.log(response.data.shooping_cart_items);
          setProducts(response.data.shooping_cart_items);
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

  return <div className="">Carts {products ? products.length : null}</div>;
}

export default Profile;
