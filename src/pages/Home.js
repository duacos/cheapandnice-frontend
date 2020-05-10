import React, { useState, useEffect } from "react";
import "../assets/styles/home.sass";
import { useLoading } from "../helpers";
import ProductItem from "../components/ProductItem";

import { useFetchAllProducts } from "../api/products";

import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";

import HomeLoader from "../loaders/HomeLoader";

const Home = () => {
  const [activeOn, setActiveOn] = useState("");
  const { isLoading, setLoading } = useLoading();
  const products = useFetchAllProducts(setLoading);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(products);
  }, [setFilteredData, products]);

  const getList = () => {
    return filteredData.map((product) => {
      return (
        <li className="product-item" key={product._id}>
          <ProductItem product={product} />
        </li>
      );
    });
  };

  const handleClick = (category) => {
    const filtered = products.filter((product) => {
      return product.type === category;
    });
    setFilteredData(filtered);
    setActiveOn(category);
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

  return isLoading ? (
    <HomeLoader />
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

        <div className="filter-box">
          <ul>
            <li
              className={activeOn === "fashion" ? "active" : "inactive"}
              onClick={handleClick.bind(this, "fashion")}
            >
              Fashion
            </li>
            <li
              className={activeOn === "technology" ? "active" : "inactive"}
              onClick={handleClick.bind(this, "technology")}
            >
              Technology
            </li>
            <li
              className={activeOn === "art" ? "active" : "inactive"}
              onClick={handleClick.bind(this, "art")}
            >
              Art
            </li>
            <li
              className={activeOn === "photography" ? "active" : "inactive"}
              onClick={handleClick.bind(this, "photography")}
            >
              Photography
            </li>
          </ul>
        </div>

        <ul className="flex-listing">{getList()}</ul>
      </div>
    </React.Fragment>
  );
};

export default Home;
