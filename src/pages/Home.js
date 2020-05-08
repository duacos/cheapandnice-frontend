import React from "react";
import "../assets/styles/home.sass";
import { useLoading } from "../helpers";
import ProductItem from "../components/ProductItem";

import { useFetchAllProducts } from "../api/products";

import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";

const Home = () => {
  const loadPage = useLoading();
  const products = useFetchAllProducts(loadPage.setLoading);

  const getList = () => {
    return products.map((product) => {
      return (
        <li className="product-item" key={product._id}>
          <ProductItem product={product} />
        </li>
      );
    });
  };

  const slides = [
    {
      image:
        "https://www.futureworld.com.np/wp-content/uploads/2017/02/ipad-pro-banner-global.jpg",
    },
    {
      image:
        "https://thedigital.agency/wp-content/uploads/2019/04/BlackFriday_StoreWF.jpg",
    },

    {
      image:
        "https://file.hstatic.net/1000347078/collection/banner_macbook_92054b106e2d457f9391d59825973023.jpg",
    },
  ];

  return loadPage.isLoading ? (
    <h1>Loading</h1>
  ) : (
    <React.Fragment>
      <Slider autoplay={3000}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="slider-content"
            style={{
              background: `url('${slide.image}') no-repeat center center`,
              width: "100%",
            }}
          >
            <div className="slider-text" key={index}></div>
          </div>
        ))}
      </Slider>
      <div className="container">
        <h1 className="content-title">Deals and Promotions</h1>

        <ul className="flex-listing">{getList()}</ul>
      </div>
    </React.Fragment>
  );
};

export default Home;
