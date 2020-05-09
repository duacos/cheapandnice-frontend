import React, { useState } from "react";
import "../assets/styles/home.sass";
import "../assets/styles/productView.sass";
import { useLoading } from "../helpers";
import ReactMarkdown from "react-markdown";
import ImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";
import { useFetchOneProduct, addToCart } from "../api/products";
import { useHistory } from "react-router-dom";

const ProductView = (props) => {
  const [quantity, setQuantity] = useState(1);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const { setLoading } = useLoading();
  const history = useHistory();
  const productId = props.match.params.productId;
  const product = useFetchOneProduct(setLoading, productId);

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

  return (
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
              <div className="product-price">
                <span>Quantity:</span>
                <input
                  type="number"
                  className="product-quantity"
                  onChange={handleChange}
                  value={quantity}
                  min="1"
                  max="10"
                  step="1"
                />
                Price :${product.price * quantity}
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
