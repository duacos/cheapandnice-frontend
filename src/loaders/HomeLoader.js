import React from "react";

import "../assets/styles/loaders/homeLoader.sass";

const HomeLoader = () => {
  return (
    <React.Fragment>
      <div className="slider loader-box"></div>
      <div className="container">
        <div className="content-title loader-box loader-content-title"></div>

        <div className="filter-box loader-box loader-filter-bar"></div>

        <ul className="flex-listing">
          <div className="product-item loader-box"></div>
          <div className="product-item loader-box"></div>
          <div className="product-item loader-box"></div>
          <div className="product-item loader-box"></div>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default HomeLoader;
