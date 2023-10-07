import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import addToCart from "../store/flux";
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
  const[price, setPrice] = useState(null);
    
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
    /*funtion to add product tp the cart
    useEffect(() => {
      actions.buyNow(id, quantity, props, navigate);
    }, []);*/

  return (
    <div className="container-fluid min-height-100 ">
      <div className="container  py-5 ">
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col ">
            <div className="row">
              <div className="col-lg-6 px-2 py-4">
                <img className="img-detail" src={product && product.image_url} />
              </div>
              <div className="produt-description col-lg-6 ">
                <h2 className="mb-3 pt-2 text-start fw-bold text-uppercase">
                  {product && product.name}
                </h2>
                <h4>
                  Color: {product && product.color}
                </h4>
                <h4>
                  Manufacturer: {product && product.manufacturer}
                </h4>
                <h4>
                  Material: {product && product.material}
                </h4>
                <h4>
                  Weight: {product && product.weight}
                </h4>
                <h4>
                  price: {product && product.price}
                </h4>
                <br />
                <br />
                <h4>
                  {reviews.length} reviews
                </h4>
                <br />
                <br />
                <h4 className="d-flex justify-content-start  w-100">
                  Quantity
                </h4>
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
                    onClick={() => actions.addToCart(product.image_url, product.name, product.price, quantity, product.price_id, id)}
                    className="btn-By"
                  >
                    Add to Cart
                  </button>
                  <Link to="/shoppingCart">
                    <button
                      className="btn-By"
                      onClick={() => actions.addToCart(product.image_url, product.name, product.price, quantity, product.price_id, id)}
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