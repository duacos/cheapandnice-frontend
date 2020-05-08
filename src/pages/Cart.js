import React from "react";
import "../assets/styles/cart.sass";
import { useLoading } from "../helpers";

import { useFetchCartProducts } from "../api/products";

const Cart = () => {
  const loadPage = useLoading();
  const cart = useFetchCartProducts(loadPage.setLoading);

  const getList = () => {
    if (cart.products) {
      return cart.products.map((product) => {
        return (
          <li key={product._id}>
            <div className="cart-product-img">
              <img src={product.photo} alt="products"></img>
            </div>
            <div className="cart-product-name">
              <h2>{product.name}</h2>
            </div>

            <div className="cart-product-details">
              <div className="cart-product-quantity">
                Quantity: {product.quantity}
              </div>
              <div className="cart-product-price">
                ${product.price.toFixed(2) * product.quantity} USD
              </div>
            </div>
          </li>
        );
      });
    }
  };

  return (
    <React.Fragment>
      <div className="container">
        <h1 className="content-title">These are your products</h1>
        <div className="flex-listing">
          <ul className="cart">{getList()}</ul>
          <div className="cart-summay">
            <div className="cart-summay-text">Subtotal (2 items): </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cart;
