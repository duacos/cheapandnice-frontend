import React, { useState, useEffect } from "react";
import "../assets/styles/home.sass";
import { useLoading } from "../helpers";
import ProductItem from "../components/ProductItem";

import { searchProducts } from "../api/products";

import { useHistory } from "react-router-dom";
import queryString from "query-string";

const ProductList = () => {
  const loadPage = useLoading();
  const history = useHistory();
  // we parse the query into something more readable, an object!
  const urlQuery = queryString.parse(history.location.search);
  const products = useFetchData(loadPage.setLoading, urlQuery.search);

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
      <h1>Deals and Promotions</h1>
      <div className="container">{getList()}</div>
    </React.Fragment>
  );
};

const useFetchData = (setLoading, query) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    searchProducts(query).then((foundProducts) => {
      setProducts(foundProducts);
      setLoading(false);
    });

    console.log("loop");
  }, [products.length, setLoading, query]);

  return products;
};

export default ProductList;
