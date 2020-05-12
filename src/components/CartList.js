import React from "react";
import { Link } from "react-router-dom";
import { removeProductFromCart } from "../api/cart";

const CartList = ({ product, cartId, filter }) => {
  const { productId } = product;

  const handleClick = async () => {
    removeProductFromCart(cartId, productId).then(() => {
      filter();
    });
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
