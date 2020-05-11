import React, { useState } from "react";
import "../assets/styles/home.sass";
import { useLoading, useTitle } from "../helpers";
import ProductItem from "../components/ProductItem";
import HomeLoader from "../loaders/HomeLoader";
import FilterBox from "../components/FilterBox";
import MainSlider from "../components/MainSlider";
import { useFetchAllProducts } from "../api/products";

const Home = () => {
  useTitle("Home");
  const { isLoading, setLoading } = useLoading();
  const products = useFetchAllProducts(setLoading);
  const [filteredData, setFilteredData] = useState([]);

  const getList = () => {
    // if data has been filtered then use that, otherwise get all products
    const filtered = filteredData.length === 0 ? products : filteredData;
    return filtered.map((product) => {
      return (
        <li className="product-item" key={product._id}>
          <ProductItem product={product} />
        </li>
      );
    });
  };

  return isLoading ? (
    <HomeLoader />
  ) : (
    <React.Fragment>
      <MainSlider />
      <div className="container">
        <h1 className="content-title">Deals and Promotions</h1>
        <FilterBox products={products} setFilteredData={setFilteredData} />
        <ul className="flex-listing filter-items">{getList()}</ul>
      </div>
    </React.Fragment>
  );
};

export default Home;
