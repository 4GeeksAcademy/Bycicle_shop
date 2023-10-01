import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import fluxStore from "../store/flux"; // Adjust the path accordingly
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import "../../styles/product_detail.css";
import { Context } from "../store/appContext";

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
  const { store, actions } = useContext(Context);
  const onChangeReview = (e) => setReviewText(e.target.value);
  const [reviewIds, setReviewIds] = useState([]);

  const submitReview = () => {
    const token = localStorage.getItem('access_token');
    console.log("Token before calling submitReview: ", token);

    actions.submitReview(name, title, reviewText, id, rating, setMessage, setReviewText, setTitle, setName, props.getData, token)
      .then(() => {
        if (props.getData && typeof props.getData === 'function') {
          props.getData(id);
        }
        // Clear the form fields
        setReviewText('');
        setTitle('');
        setName('');
        setRating([]);

        fetchAndUpdateReviews();
      })
      .catch(error => {
        console.error('Error in submitReview:', error);
      });
  };


  useEffect(() => {
    const retrievedToken = localStorage.getItem('access_token');
    console.log("Retrieved Token in ProductDetail: ", retrievedToken);

    axios.get(`${process.env.BACKEND_URL}/api/products/${id}`, {
      headers: { Authorization: `Bearer ${retrievedToken}` }
    })
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
    axios.get(`${process.env.BACKEND_URL}/api/products/${id}/reviews`, {
      headers: { Authorization: `Bearer ${retrievedToken}` }
    })
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, [id]);

  useEffect(() => {
    fetchAndUpdateReviews();
  }, [id]);

  const fetchAndUpdateReviews = () => {
    const retrievedToken = localStorage.getItem('access_token');

    axios.get(`${process.env.BACKEND_URL}/api/products/${id}/reviews`, {
      headers: { Authorization: `Bearer ${retrievedToken}` }
    })
      .then(response => {

        const newReviews = response.data.filter(review => !reviewIds.includes(review.id));

        // Update the reviewIds list 
        setReviewIds(prevIds => [...new Set([...newReviews.map(review => review.id), ...prevIds])]);

        // Add the new reviews at the beginning of the list
        setReviews(prevReviews => [...newReviews, ...prevReviews]);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  };
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
                  {reviews.length} reviews
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
                        onClick={() => actions.minusQuantity(quantity, setQuantity)}
                      >
                        -
                      </button>

                      <div className="form-outline">
                        <input
                          id="form1"
                          min="0"
                          name="quantity"
                          value={quantity}
                          onChange={(e) => actions.onChangeQuantity(setQuantity, e.target.value)}
                          type="text"
                          className="btn-detail-middle"
                        />
                      </div>

                      <button
                        className="btn-detail2"
                        onClick={() => actions.plusQuantity(quantity, setQuantity)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <button
                    className="btn-By"
                    onClick={() => actions.addToCart(product.id, quantity)}
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
              <form className="form-review" onSubmit={(e) => e.preventDefault()}>
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
                  <label className="form-label d-flex text-center" htmlFor="name">
                    Name
                  </label>
                  <input type="text" className="input-review" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-outline mb-2">
                  <label className="form-label d-flex text-center" htmlFor="title">
                    Review Title
                  </label>
                  <input type="text" className="input-review" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-outline mb-2">
                  <label className="form-label d-flex text-center" htmlFor="review">
                    Review
                  </label>
                  <textarea className="form-control" id="review" value={reviewText} onChange={(e) => setReviewText(e.target.value)} rows="4"></textarea>
                </div>

                <div className="form-outline row d-flex justify-content-between p-2 mb-2">
                  <button onClick={submitReview} className="btn-review col-6 ">
                    Submit Review
                  </button>

                  <button
                    className="btn-review col-6 "
                  >
                    Cancel Review
                  </button>
                </div>

              </form>
            </div>
            <div id="reviews-container">
              {Array.isArray(reviews) && reviews.length > 0
                ? reviews.map((item, index) => (
                  <div key={index} className="row review-color text-start mb-3">
                    <div className="h2 d-flex  justify-content-center pb-3">
                      {[...Array(5)].map((_, index) => (
                        <div key={index}>
                          {index < item.rating ? (
                            <FontAwesomeIcon key={index} icon={faStar} color="#7C0514" />
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
                : null}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;