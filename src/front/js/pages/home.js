import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import openAI from "../../img/ai.png";
import "../../styles/home.css";

export const Home = () => {
  const { store } = useContext(Context);

  return (
    <div className="container
    home-container min-height-100">
      <div className="text-center">
        <Link to="/ai">
          <button type="button" className="btn btn-ai my-3">
            <img src={openAI} className="ai-icon" alt="AI Icon" />
            Do you want help choosing the perfect bike for you?
          </button>
        </Link>
      </div>
      <div id="carouselExampleAutoplaying" className="carousel carousel-dark slide" data-bs-ride="carousel">
        <div className="carousel-inner carousel-container">
          <div className="carousel-item my-carousel active" data-bs-interval="1000">
                <Link className="carousel-text" to={`/products/${store.product.type}`}>
                  <p>Road Bikes</p>
                </Link>
            <img
              src="https://images.pexels.com/photos/1595483/pexels-photo-1595483.jpeg?auto=compress&cs=tinysrgb&w=1600"
              className="d-block equal-height-img"
              alt="Bike 1"
            />
            
          </div>
          <div className="carousel-item my-carousel" data-bs-interval="2000"> 
                <Link className="carousel-text" to={`/products/${store.product.type}`}>
                  <p>Mountain Bikes</p>
                </Link>
            <img
              src="https://images.pexels.com/photos/90454/pexels-photo-90454.jpeg?auto=compress&cs=tinysrgb&w=1600"
              className="d-block equal-height-img"
              alt="Bike 2"
          />  
          </div>
          <div className="carousel-item my-carousel" data-bs-interval="3000">
                <Link className="carousel-text" to={`/products/${store.product.type}`}>
                  <p>Hybrid Bikes</p>
                </Link>
            <img
              src="https://images.pexels.com/photos/248559/pexels-photo-248559.jpeg?auto=compress&cs=tinysrgb&w=1600"
              className="d-block equal-height-img"
              alt="Bike 3"
            />
          </div>
          <div className="carousel-item my-carousel" data-bs-interval="4000">
                <Link className="carousel-text" to={`/products/${store.product.type}`}>
                  <p>Speciality Bikes</p>
                </Link>
            <img
              src="https://images.pexels.com/photos/71104/utah-mountain-biking-bike-biking-71104.jpeg?auto=compress&cs=tinysrgb&w=1600"
              className="d-block equal-height-img"
              alt="Bike 4"
            />
          </div>
          <div className="carousel-item my-carousel" data-bs-interval="5000">
                <Link className="carousel-text" to={`/products/${store.product.type}`}>
                  <p>BMX Bikes</p>
                </Link>
            <img
              src="https://images.pexels.com/photos/3281020/pexels-photo-3281020.jpeg?auto=compress&cs=tinysrgb&w=1600"
              className="d-block equal-height-img"
              alt="Bike 5"
            />
          </div>
          <div className="carousel-item my-carousel" data-bs-interval="6000">
                <Link className="carousel-text" to={`/products/${store.product.type}`}>
                  <p>Kids Bikes</p>
                </Link>
            <img
              src="https://images.pexels.com/photos/5792902/pexels-photo-5792902.jpeg?auto=compress&cs=tinysrgb&w=1600"
              className="d-block equal-height-img"
              alt="Bike 6"
            />
          </div>
          <div className="carousel-item my-carousel" data-bs-interval="7000">
                <Link className="carousel-text" to={`/products/${store.product.type}`}>
                  <p>News</p>
                </Link>
            <img
              src="https://images.pexels.com/photos/2591990/pexels-photo-2591990.jpeg?auto=compress&cs=tinysrgb&w=1600"
              className="d-block equal-height-img"
              alt="Bike 7"
            />
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon arrow-control" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon arrow-control" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
);
}