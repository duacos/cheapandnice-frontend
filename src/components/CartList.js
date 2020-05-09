import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CartList = ({ product, cartId, filter }) => {
  const { productId } = product;
  const handleClick = async () => {
    await axios.patch("http://localhost:8080/api/cart/remove/product", {
      cartId,
      productId,
    });
    filter();
  };

  return (
    <React.Fragment>
      <div className="cart-product-remove" onClick={handleClick}>
        Remove
      </div>

      <div className="cart-product-img">
        <img src={product.photo} alt="products"></img>
      </div>
      <div className="cart-product-name">
        <h2>
          <Link to={`/products/${product.productId}`}>{product.name}</Link>
        </h2>
      </div>

      <div className="cart-product-details">
        <div className="cart-product-quantity">
          Quantity: {product.quantity}
        </div>
        <div className="cart-product-price">
          ${product.price.toFixed(2) * product.quantity} USD
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartList;
