import React, { useState } from "react";
import "../assets/styles/productView.sass";
import { useLoading, useTitle } from "../helpers";
import ReactMarkdown from "react-markdown";
import ImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";
import { useFetchOneProduct, addToCart } from "../api/products";
import { useHistory } from "react-router-dom";
import ProductViewLoader from "../loaders/ProductViewLoader";

const ProductView = (props) => {
  const { setLoading, isLoading } = useLoading();
  const [quantity, setQuantity] = useState(1);

  const productId = props.match.params.productId;
  const product = useFetchOneProduct(setLoading, productId);
  useTitle(product.title);

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const history = useHistory();

  const showGallery = () => {
    const images = product.photos.map((photo) => {
      return {
        original: photo.fullsize,
        thumbnail: photo.thumbnail,
      };
    });

    return <ImageGallery items={images} />;
  };

  const handleClick = (productId) => {
    // addToCart makes the request
    addToCart(productId, quantity).then(() => {
      history.push("/products/cart");
    });
  };

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  return isLoading ? (
    <ProductViewLoader />
  ) : (
    <React.Fragment>
      <div className="product">
        <div className="container">
          <div className="product-view">
            <div className="product-gallery">{showGallery()}</div>
            <div className="product-details">
              <h1>{product.title}</h1>
              <div className="product-description">
                <ReactMarkdown source={product.description} />
              </div>

              <div className="cart-product-details">
                <div className="cart-product-quantity">
                  <span>QTY: </span>
                  <input
                    type="number"
                    className="product-quantity"
                    onChange={handleChange}
                    value={quantity}
                    min="1"
                    max="10"
                    step="1"
                  />
                </div>
                <span>
                  <div className="cart-product-price">
                    Price :${product.price * quantity}
                  </div>
                </span>
              </div>

              {isLoggedIn ? (
                <button
                  className="product-button"
                  onClick={handleClick.bind(this, product._id)}
                >
                  Add to cart
                </button>
              ) : (
                <button className="product-button-login">
                  <Link to="/login">Login first</Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductView;
