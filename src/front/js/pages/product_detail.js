import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetail(props) {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("Please fill all fields");
  const navigate = useNavigate();

  const {
    onChangeName,
    onChangeTitle,
    onChangeReview,
    plusQuantity,
    minusQuantity,
    onChangeQuantity,
    addToCart,
    submitReview,
    changeRating,
    
  } = useStoreActions((actions) => actions);
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
