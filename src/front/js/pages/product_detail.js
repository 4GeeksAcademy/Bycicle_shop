import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Router, useNavigate, useParams } from "react-router-dom";
// import { API_URL } from "../utils/config";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar } from "@fortawesome/free-solid-svg-icons";
function ProductDetail(props) {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [nameFlag, setNameFlag] = useState(false);
  const [title, setTitle] = useState("");
  const [titleFlag, setTitleFlag] = useState(false);
  const [review, setReview] = useState("");
  const [reviewFlag, setReviewFlag] = useState(false);
  const [rating, setRating] = useState(1);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("Please fill all fields");
  const [reviewList, setReviewList] = useState([]);
  const [product, setProduct] = useState({});
  const onChangeName = (event) => {
    setNameFlag(false);
    setName(event.target.value);
    if (event.target.value === "") {
      setNameFlag(true);
    }
  };
  const onChangeTitle = (event) => {
    setTitleFlag(false);
    setTitle(event.target.value);
    if (event.target.value === "") {
      setTitleFlag(true);
    }
  };
  const onChangeReview = (event) => {
    setReviewFlag(false);
    setReview(event.target.value);
    if (event.target.value === "") {
      setReviewFlag(true);
    }
  };
  const plusQuantity = () => {
    setQuantity(quantity + 1);
  };
  const minusQuantity = () => {
    if (quantity < 2) return;
    setQuantity(quantity - 1);
  };
  const onChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };
  useEffect(() => {
    if (!props.token && props.token !== "" && props.token !== undefined) {
      navigate("/login");
    }
    getData();
  }, []);

  function getData() {
    axios
      .get(`${API_URL}/product?id=${id}`, {
        headers: { Authorization: `Bearer ${props.token}` },
      })
      .then((response) => {
        console.log(response);
        if (response.data.success === "true") {
          console.log(response.data.access_token);
          setProduct(response.data.bicycle);
          setReviewList(response.data.bicycle_reviews);
        } else {
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  }
  const addToCart = () => {
    const payload = {
      bicycle_id: id,
      quantity: quantity,
    };
    axios
      .post(`${API_URL}/cart`, payload, {
        headers: { Authorization: `Bearer ${props.token}` },
      })
      .then((response) => {
        console.log(response);
        if (response.data.success === "true") {
          console.log(response.data.access_token);
          navigate("/products");
        } else {
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };
  const submitReview = () => {
    let flag = true;
    if (name === "") {
      flag = false;
      setNameFlag(true);
    }
    if (title === "") {
      flag = false;
      setTitleFlag(true);
    }
    if (review === "") {
      flag = false;
      setReviewFlag(true);
    }
    if (!flag) {
      setMessage("Please fill all fields");
      return;
    }
    const payload = {
      rating: rating,
      name: name,
      title: title,
      review: review,
      bicycle_id: id,
    };
    axios
      .post(`${API_URL}/review`, payload, {
        headers: { Authorization: `Bearer ${props.token}` },
      })
      .then((response) => {
        console.log(response);
        if (response.data.success === "true") {
          console.log(response.data.access_token);
          setReview("");
          setTitle("");
          setName("");
          getData();
        } else {
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };
  const changeRating = (value) => {
    setRating(value);
  };
  return (
    <section className="h-100 h-custom bg-danger">
      <div className="container  py-5 bg-danger">
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col ">
            <div className="card bg-danger">
              <div className="card-body text-black">
                <div className="row">
                  <div className="col-lg-6 px-2 py-4">
                    <div className="d-flex align-items-center mb-5">
                      <div className="flex-shrink-0">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp"
                          className="img-fluid"
                          style={{ width: "350px" }}
                          alt="Generic placeholder image"
                        />
                      </div>
                    </div>

                    {/* <hr
                      className="mb-4"
                      style="height: 2px; background-color: #1266f1; opacity: 1;"
                    /> */}
                  </div>
                  <div className="col-lg-6 px-5 py-4">
                    <h2 className="mb-3 pt-2 text-start fw-bold text-uppercase">
                      Name: {product && product.name}
                    </h2>
                    <h6 className="mb-3 pt-2 text-start fw-bold text-uppercase">
                      Color: {product && product.color}
                    </h6>
                    <h6 className="mb-3 pt-2 text-start fw-bold text-uppercase">
                      Manufacturer: {product && product.manufacturer}
                    </h6>
                    <h6 className="mb-3 pt-2 text-start fw-bold text-uppercase">
                      Material: {product && product.Material}
                    </h6>
                    <h6 className="mb-3 pt-2 text-start fw-bold text-uppercase">
                      Weight: {product && product.weight}
                    </h6>
                    <h6 className="mb-3 pt-2 text-start fw-bold text-uppercase">
                      price: {product && product.price}
                    </h6>
                    <h6 className="mb-3 pt-2 text-start fw-bold text-uppercase">
                      {reviewList.length} reviews
                    </h6>

                    <h6 className="d-flex justify-content-start  w-100">
                      Quantity
                    </h6>
                    <div className="d-flex justify-content-between p-2 mb-2">
                      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <div
                          className="d-flex mb-4"
                          style={{ maxWidth: "500px" }}
                        >
                          <button
                            className="btn btn-primary px-3 me-2"
                            onClick={minusQuantity}
                          >
                            -
                          </button>

                          <div className="form-outline">
                            <input
                              id="form1"
                              min="0"
                              name="quantity"
                              value={quantity}
                              onChange={onChangeQuantity}
                              type="number"
                              className="form-control"
                              style={{ width: "50px" }}
                            />
                          </div>

                          <button
                            className="btn btn-primary px-3 ms-2"
                            onClick={plusQuantity}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex  justify-content-between">
                      <button
                        className="btn btn-primary px-3 "
                        onClick={addToCart}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <form className="p-5">
                    <p className="text-center">
                      <strong>How do you rate customer support:</strong>
                    </p>

                    <div className="h2 d-flex  justify-content-center pb-3">
                      {[...Array(5)].map((_, index) => (
                        <div key={index}>
                          {index < rating ? (
                            <FontAwesomeIcon
                              key={index}
                              icon={faStar}
                              color="yellow"
                              onClick={() => changeRating(index + 1)}
                            />
                          ) : (
                            <FontAwesomeIcon
                              key={index}
                              icon={faStar}
                              onClick={() => changeRating(index + 1)}
                              color="dark"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="form-outline mb-2">
                      <label
                        className="form-label d-flex justify-content-start"
                        htmlFor="fullname"
                      >
                        Name (displayed publicly)
                      </label>
                      <input
                        type="text"
                        id="fullname"
                        value={name}
                        onChange={onChangeName}
                        className="form-control form-control-lg"
                      />
                    </div>
                    <div className="form-outline mb-2">
                      <label
                        className="form-label d-flex justify-content-start"
                        htmlFor="fullname"
                      >
                        Review Title
                      </label>
                      <input
                        type="text"
                        id="fullname"
                        value={title}
                        onChange={onChangeTitle}
                        className="form-control form-control-lg"
                      />
                    </div>
                    <div className="form-outline mb-2">
                      <label
                        className="form-label d-flex justify-content-start"
                        htmlFor="fullname"
                      >
                        Review
                      </label>
                      <textarea
                        className="form-control"
                        id="form4Example3"
                        value={review}
                        onChange={onChangeReview}
                        rows="4"
                      ></textarea>
                    </div>
                    <button
                      onClick={submitReview}
                      className="btn btn-primary btn-block mb-4"
                    >
                      Submit Review
                    </button>
                  </form>
                </div>
                {reviewList && reviewList.length > 0
                  ? reviewList.map((item, index) => (
                      <div
                        key={index}
                        className="row bg-primary text-start mb-3"
                      >
                        <div className="h2 d-flex  justify-content-center pb-3">
                          {[...Array(5)].map((_, index) => (
                            <div key={index}>
                              {index < item.rating ? (
                                <FontAwesomeIcon
                                  key={index}
                                  icon={faStar}
                                  color="yellow"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  key={index}
                                  icon={faStar}
                                  color="dark"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                        <div>{item.title}</div>
                        <div>{item.review_text}</div>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
