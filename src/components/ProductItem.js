import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  return (
    <React.Fragment>
      <div className="product-item-img">
        <img src={product.photos[0].fullsize} alt="Gafas lujosas" />
      </div>
      <div className="product-item-details">
        <b>${product.price}</b>
        <h2>{product.title}</h2>
        <button className="product-item-button">
          <Link to={`products/${product._id}`}>See details</Link>
        </button>
      </div>
    </React.Fragment>
  );
};

export default ProductItem;
