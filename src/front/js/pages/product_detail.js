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


import axios from "axios";

function ProductDetail(props) {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("Please fill all fields");
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
    /*const [rating, setRating] = useState([]);
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [review, setReview] = useState(""); */

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/api/products/${id}`)
      .then(response => {
        if (response.data.success === "true") {
          setProduct(response.data.bicycle);
      }
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  /*const {
    onChangeName,
    onChangeTitle,
    onChangeReview,
    plusQuantity,
    minusQuantity,
    onChangeQuantity,
    addToCart,
    submitReview,
    changeRating,
    
  }= useStoreActions((actions) => actions);*/

  /*function to cancel review
  const cancelReview = () => {
    setRating([]);
    setName("");
    setTitle("");
    setReview("");
  }*/

  return (
    <div className="container-fluid min-height-100 ">
      <div className="container  py-5 ">
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col ">
                <div className="row">
                  <div className="col-lg-6 px-2 py-4">
                    <div className="d-flex align-items-center mb-5">
                      <div className="d-flex align-items-center">
                    <div id="carouselExampleIndicators" className="carousel slide">
                      <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                      </div>
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                          <img src="https://images.pexels.com/photos/1010546/pexels-photo-1010546.jpeg?auto=compress&cs=tinysrgb&w=1600" className="d-block w-100" alt="..."/>
                        </div>
                      </div>
                      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
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
                    <br/>
                    <br/>
                    <h6>
                      {reviewList.length} reviews
                    </h6>
                    <br/>
                    <br/>
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
                        value={review}
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
