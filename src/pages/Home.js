import React, { useState, useEffect } from "react";
import "../assets/styles/home.sass";
import axios from "axios";
import { useLoading } from "../helpers";
import ProductItem from "../components/ProductItem";

import { useFetchAllProducts } from "../api/products";

const Home = () => {
  const loadPage = useLoading();
  const products = useFetchAllProducts(loadPage);

  const getList = () => {
    return products.map((product) => {
      return (
        <li className="product-item" key={product._id}>
          <ProductItem product={product} />
        </li>
      );
    });
  };

  return (
    <React.Fragment>
      <h1>Deals and Promotions</h1>
      <div className="container">{getList()}</div>
    </React.Fragment>
  );
};

export default Home;
