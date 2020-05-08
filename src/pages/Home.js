import React from "react";
import "../assets/styles/home.sass";
import { useLoading } from "../helpers";
import ProductItem from "../components/ProductItem";

import { useFetchAllProducts } from "../api/products";

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

  return loadPage.isLoading ? (
    <h1>Loading</h1>
  ) : (
    <React.Fragment>
      <div className="container">
        <h1>Deals and Promotions</h1>

        <div className="flex-listing">{getList()}</div>
      </div>
    </React.Fragment>
  );
};

export default Home;
