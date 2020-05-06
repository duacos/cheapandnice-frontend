import React from "react";
import "../assets/styles/home.sass";
import "../assets/styles/productView.sass";
import { useLoading } from "../helpers";
import ReactMarkdown from "react-markdown";
import ImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";
import { useFetchOneProduct } from "../api/products";

const ProductView = (props) => {
  const loadPage = useLoading();
  const product = useFetchOneProduct(loadPage, props.match.params.productId);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const showGallery = () => {
    // do this only if product.photos is not undefined

    if (product.photos) {
      const images = product.photos.map((photo) => {
        return {
          original: photo.fullsize,
          thumbnail: photo.thumbnail,
        };
      });

      return <ImageGallery items={images} />;
    }
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
              <div className="product-price">Price :${product.price}</div>
              {isLoggedIn ? (
                <button className="product-button">Add to cart</button>
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
