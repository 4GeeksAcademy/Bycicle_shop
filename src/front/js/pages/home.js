import React from "react";
import openAI from "../../img/ai.png";
import "../../styles/home.css";

export const Home = () => {
  return (
    <div className="
    home-container min-height-100">
      <button type="button" className="btn btn-ai">
        <img src={openAI} className="ai-icon" alt="AI Icon" />
        Do you want help choosing the perfect bike for you?
      </button>
      <div id="carouselExampleAutoplaying" className="carousel carousel-dark slide" data-bs-ride="carousel">
        <div className="carousel-inner carousel-container">
          <div className="carousel-item active" data-bs-interval="1000">
            <img
              src="https://images.pexels.com/photos/1595483/pexels-photo-1595483.jpeg?auto=compress&cs=tinysrgb&w=1600"
              className="d-block equal-height-img"
              alt="Bike 1"
            />
            <div class="carousel-caption d-none d-md-block">
              <p className="carousel-text">Road Bikes</p>
            </div>
          </div>
          <div className="carousel-item " data-bs-interval="2000"> 
            <div class="carousel-caption d-none d-md-block">
              <p className="carousel-text">Mountain Bikes</p>
            </div>
            <img
              src="https://images.pexels.com/photos/90454/pexels-photo-90454.jpeg?auto=compress&cs=tinysrgb&w=1600"
              className="d-block equal-height-img"
              alt="Bike 2"
           />  
          </div>
          <div className="carousel-item " data-bs-interval="3000">
            <img
              src="https://images.pexels.com/photos/248559/pexels-photo-248559.jpeg?auto=compress&cs=tinysrgb&w=1600"
              className="d-block equal-height-img"
              alt="Bike 3"
            />
            <div class="carousel-caption d-none d-md-block">
              <p className="carousel-text">Hybrid Bikes</p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="4000">
            <img
              src="https://images.pexels.com/photos/71104/utah-mountain-biking-bike-biking-71104.jpeg?auto=compress&cs=tinysrgb&w=1600"
              className="d-block equal-height-img"
              alt="Bike 4"
            />
            <div class="carousel-caption d-none d-md-block">
              <p className="carousel-text">Speciality Bikes</p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="5000">
            <img
              src="https://images.pexels.com/photos/3281020/pexels-photo-3281020.jpeg?auto=compress&cs=tinysrgb&w=1600"
              className="d-block equal-height-img"
              alt="Bike 5"
            />
            <div class="carousel-caption d-none d-md-block">
              <p className="carousel-text">BMX Bikes</p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="6000">
            <div class="carousel-caption d-none d-md-block">
              <p className="carousel-text">Kids Bikes</p>
            </div>
            <img
              src="https://images.pexels.com/photos/1605943/pexels-photo-1605943.jpeg?auto=compress&cs=tinysrgb&w=1600"
              className="d-block equal-height-img"
              alt="Bike 6"
            />
          </div>
          <div className="carousel-item" data-bs-interval="7000">
            <img
              src="https://images.pexels.com/photos/1149601/pexels-photo-1149601.jpeg?auto=compress&cs=tinysrgb&w=1600"
              className="d-block equal-height-img"
              alt="Bike 7"
            />
            <div class="carousel-caption d-none d-md-block">
              <p className="carousel-text">News</p>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};