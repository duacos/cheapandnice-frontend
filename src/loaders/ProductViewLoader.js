import React from "react";
import "../assets/styles/loaders/productViewLoader.sass";

const ProductViewLoader = () => {
  return (
    <React.Fragment>
      <div className="product">
        <div className="container">
          <div className="product-view">
            <div className="product-gallery loader-box loader-gallery"></div>
            <div className="product-details">
              <div className="loader-box loader-title"></div>
              <div className="product-description loader-box loader-description"></div>
              <div className="cart-product-details loader-box">
                <div className="cart-product-quantity"></div>
                <span>
                  <div className="cart-product-price"></div>
                </span>
              </div>

              <button className="product-button loader-box loader-button"></button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductViewLoader;
