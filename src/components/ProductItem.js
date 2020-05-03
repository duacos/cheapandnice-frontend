import React from "react";

const ProductItem = ({ product }) => {
  console.log(product.photos.length);
  return (
    <React.Fragment>
      <div className="product-item-img">
        <img src={product.photos[0]} alt="Gafas lujosas" />
      </div>
      <div className="product-item-details">
        <b>${product.price}</b>
        <h2>{product.title}</h2>
        <button className="product-item-button">See details</button>
      </div>
    </React.Fragment>
  );
};

export default ProductItem;
