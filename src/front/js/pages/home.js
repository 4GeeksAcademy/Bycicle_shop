<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import "../../styles/home.css";
=======
import React, { useContext } from "react";
import { Context } from "../store/appContext";
>>>>>>> origin/develop

export const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Initial image index
  const images = [
    "https://images.pexels.com/photos/1595483/pexels-photo-1595483.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/90454/pexels-photo-90454.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/161407/church-bike-couple-models-retro-ferry-161407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/71104/utah-mountain-biking-bike-biking-71104.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/3067484/pexels-photo-3067484.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/13061204/pexels-photo-13061204.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/3625740/pexels-photo-3625740.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ];
  const description = [
    "Road Bike",
    "Mountain Bike",
    "Hybrid Bike",
    "Speciality Bikes",
    "BMX Bikes",
    "Kids Bikes",
    "News",
    "Promotions"
  ];
  const rotationSpeed = 3000; // Time interval between rotations in milliseconds

<<<<<<< HEAD
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % images.length
      );
    }, rotationSpeed);
  

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [images, rotationSpeed]);

  return (
    <div className="parallax-container">
      <div className="min-height-100">
        {/* Map through images and render each parallax */}
        {images.map((imageUrl, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url("${imageUrl}")`,
              minHeight: "100vh",
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="parallax-description">
              <p className="parallax-title">{description[index]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
=======
	return (
		<div className="min-height-100 text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<p>
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
>>>>>>> origin/develop
