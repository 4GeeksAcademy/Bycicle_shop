import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import minusQuantity from "../component/shoopingCartOne"
import reviewList from "../store/flux"
import onChangeQuantity from "../component/shoopingCartOne"
import plusQuantity from "../component/shoopingCartOne"
import addToCart from "../store/flux"
import rating from "../store/flux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import onChangeName from "../store/flux"
import title from "../store/flux"
import onChangeTitle from "../store/flux"
import review from "../store/flux"
import onChangeReview from "../store/flux"
import submitReview from "../store/flux"
import "../../styles/product_detail.css";
import changeRating from "../store/flux"


import axios from "axios";

function ProductDetail(props) {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("Please fill all fields");
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const onChangeName = (e) => setName(e.target.value);
  const onChangeTitle = (e) => setTitle(e.target.value);
  const changeRating = (value) => setRating(value);
  const [reviewText, setReviewText] = useState("");
  const onChangeReview = (e) => setReviewText(e.target.value);

  const submitReview = () => {
    if (!name || !title || !reviewText) {
      setMessage("Please fill all fields");
      return;
    }
    props.submitReviewAction(name, title, reviewText, id, setMessage, setReviewText, setTitle, setName, props.getData);
  };

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/products/${id}`)
      .then(response => {
      if (response.data.success === "true") {
        setProduct(response.data.bicycle);
        console.log('ID:', id);
        console.log('URL:', `${process.env.BACKEND_URL}/product/${id}`);
      }
    })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });

    // Fetch reviews for the specific product
    axios.get(`${process.env.BACKEND_URL}/api/products/${id}/reviews`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, [id]);

  return (
    <div className="container-fluid min-height-100 ">
      <div className="container  py-5 ">
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col ">
            <div className="row">
              <div className="col-lg-6 px-2 py-4">
                <div className="d-flex align-items-center mb-5">
                  <div className="d-flex align-items-center">
                    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <img className="d-block w-100 img-fluid" src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp" style={{ width: "350px" }} alt="First slide" />
                        </div>
                        <div className="carousel-item">
                          <img className="d-block w-100" src="..." alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                          <img className="d-block w-100" src="..." alt="Third slide" />
                        </div>
                      </div>
                      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="produt-description col-lg-6 ">
                <h2 className="mb-3 pt-2 text-start fw-bold text-uppercase">
                  {product && product.name}
                </h2>
                <h6>
                  Color: {product && product.color}
                </h6>
                <h6>
                  Manufacturer: {product && product.manufacturer}
                </h6>
                <h6>
                  Material: {product && product.material}
                </h6>
                <h6>
                  Weight: {product && product.weight}
                </h6>
                <h6>
                  price: {product && product.price}
                </h6>
                <br />
                <br />
                <h6>
                  {reviewList.length} reviews
                </h6>
                <br />
                <br />
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
                        className="btn-detail1"
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
                          type="text"
                          className="btn-detail-middle"
                        />
                      </div>

                      <button
                        className="btn-detail2"
                        onClick={plusQuantity}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <button
                    className="btn-By"
                  >
                    Add to Cart
                  </button>
                  <Link to="/shoppingCart">
                    <button
                      className="btn-By"
                    >
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row">
              <form className="form-review">
                <div className="text-center">
                  <strong>Write a review</strong>
                  <p className="mt-2">Rating</p>
                </div>

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
                    className="form-label d-flex text-center"
                    htmlFor="fullname"
                  >
                    Name (displayed publicly)
                    <i className="fa-solid fa-chevron-down d-inline-flex ms-1 pt-1"></i>
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
                    className="form-label d-flex text-center"
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
                    className="form-label d-flex text-center"
                    htmlFor="fullname"
                  >
                    Review
                  </label>
                  <textarea
                    className="form-control"
                    id="form4Example3"
                    value={reviewText}
                    onChange={onChangeReview}
                    rows="4"
                  ></textarea>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <button
                    onClick={() => submitReview(name, title, review, id, props, setMessage, setReview, setTitle, setName, getData)}
                    className="btn-review"
                  >
                    Submit Review
                  </button>
                  <button
                    className="btn-review"
                  >
                    Cancel Review
                  </button>
                </div>
                {/* Render fetched reviews */}
                <div className="reviews-list">
                  {reviews.map((review, index) => (
                    <div key={index} className="review-item">
                      <div>{review.title}</div>
                      <div>{review.review_text}</div>
                      <div>{review.rating}</div>
                    </div>
                  ))}
                </div>
              </form>
            </div>
            {Array.isArray(reviewList) && reviewList.length > 0
              ? reviewList.map((item, index) => (
                <div key={index} className="row bg-primary text-start mb-3">
                  <div className="h2 d-flex  justify-content-center pb-3">
                    {[...Array(5)].map((_, index) => (
                      <div key={index}>
                        {index < item.rating ? (
                          <FontAwesomeIcon key={index} icon={faStar} color="yellow" />
                        ) : (
                          <FontAwesomeIcon key={index} icon={faStar} color="dark" />
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
  );
}

export default ProductDetail;
