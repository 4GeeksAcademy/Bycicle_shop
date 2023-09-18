import React, { useEffect } from "react";
import "../../styles/home.css";

export const Home = () => {
  const images = [
    "https://images.pexels.com/photos/1595483/pexels-photo-1595483.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/90454/pexels-photo-90454.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/161407/church-bike-couple-models-retro-ferry-161407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/71104/utah-mountain-biking-bike-biking-71104.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/3067484/pexels-photo-3067484.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/5792901/pexels-photo-5792901.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/13061204/pexels-photo-13061204.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/3625740/pexels-photo-3625740.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ];
  const description = [
    "Road Bikes",
    "Mountain Bikes",
    "Hybrid Bikes",
    "Speciality Bikes",
    "BMX Bikes",
    "Kids Bikes",
    "News",
    "Promotions"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      window.scrollBy({
        top: 700, // Adjust the scroll position as needed
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(interval); // Clear the interval on unmount
  }, [images]);

  return (
    <div className="min-height-100">
      {/* Map through images and render each parallax */}
      {images.map((imageUrl, index) => (
        <div
          key={imageUrl} // Use the image URL as the key
          style={{ backgroundImage: `url(${imageUrl})` }}
          className="parallax"
        >
          <p className="parallax-title">{description[index]}</p>
        </div>
      ))}
    </div>
  );
};