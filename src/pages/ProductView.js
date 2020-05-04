import React, { useState, useEffect } from "react";
import "../assets/styles/home.sass";
import "../assets/styles/productView.sass";
import axios from "axios";
import { useLoading } from "../helpers";
import ReactMarkdown from "react-markdown";
import ImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";

const ProductView = (props) => {
  const loadPage = useLoading();
  const product = useFetchData(loadPage, props.match.params.productId);
  const products = useFecthAllProducts(loadPage);
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

const useFecthAllProducts = (loadPage, filter) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (products.length === 0) {
      axios
        .get(`http://localhost:8000/api/products/list`, filter)
        .then((response) => {
          setProducts(response.data.body);
          // setLoding is set to false once we get the data
          loadPage.setLoading(false);
        });
    }
  }, [filter]);
  return products;
};

const useFetchData = (loadPage, productId) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    // make the request ONLY if "products" is empty (to avoid infinite loop)
    if (Object.keys(product).length === 0) {
      axios
        .get(`http://localhost:8000/api/products/${productId}`)
        .then((response) => {
          setProduct(response.data.body);
          // setLoding is set to false once we get the data
          loadPage.setLoading(false);
        });
    }
  }, [productId, loadPage, product]);

  return product;
};

export default ProductView;
