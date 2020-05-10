import React from "react";
import "../assets/styles/home.sass";
import "../assets/styles/loaders/loaders.sass";

const HomeLoader = () => {
  return (
    <React.Fragment>
      <div className="slider-content loader-box"></div>
      <div className="container">
        <div className="content-title loader-box loader-content-title"></div>

        <ul className="flex-listing">
          <div className="product-item loader-box loader-product-item"></div>
          <div className="product-item loader-box loader-product-item"></div>
          <div className="product-item loader-box loader-product-item"></div>
          <div className="product-item loader-box loader-product-item"></div>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default HomeLoader;
