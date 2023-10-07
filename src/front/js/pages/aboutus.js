import React from "react";
import "../../styles/aboutus.css";

export const AboutUs = () => {

    return (
        <div className="min-height-100 container-fluid aboutus-container">
          <div className="row d-flex align-items-center justify-content-center ">
            <div className="col-6">
                <h1 className="aboutus-title" >About Us</h1>
              <div className="about-line"></div>
              <p className="text-about text-start mx-3 mb-0 text-white">
              lLorem ipsum dolor sit amet, consectetur adipiscing elit. In erat quam, pellentesque vitae ultricies et, dapibus a magna. Duis et lectus nec sem rhoncus vehicula. Aliquam malesuada erat eget iaculis volutpat. Donec lobortis, urna et accumsan varius, nibh nulla feugiat odio, sed ultrices arcu elit vel magna. Nulla vitae pellentesque purus, vitae pellentesque nisl. Praesent ligula nibh, rutrum quis tellus et, tempus porta orci. Nulla lacus sapien, fringilla eget viverra in, posuere sit amet nulla. Donec posuere ligula justo, ac cursus nisl dictum eget.
              </p>
            </div>
            <div className="col-6 p-5">
              <img
                src="https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1600"
                className="aboutus-img-1"
                alt="Bike image"
              />
              <img
                src="https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="aboutus-img-2"
                alt="Desk image"
              />
              <div
                className="aboutus-square"
                alt="Black Sqare">
              </div>
            </div>
          </div>
        </div>
  );
};
