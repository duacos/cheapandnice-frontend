import React, { useState, useEffect } from "react";
import "../assets/styles/home.sass";
import { useLoading, useTitle } from "../helpers";
import ProductItem from "../components/ProductItem";

import { searchProducts } from "../api/products";

import { useHistory } from "react-router-dom";
import queryString from "query-string";
import Beat from "../loaders/Beat";

const ProductList = () => {
  const { setLoading, isLoading } = useLoading();
  const history = useHistory();
  // we parse the query into something more readable, an object!
  const urlQuery = queryString.parse(history.location.search);
  const products = useFetchData(setLoading, urlQuery.search);
  useTitle(urlQuery.search);

  const getList = () => {
    return products.map((product) => {
      return (
        <li className="product-item" key={product._id}>
          <ProductItem product={product} />
        </li>
      );
    });
  };

  return isLoading ? (
    <Beat />
  ) : (
    <React.Fragment>
      <div className="container">
        <h1 className="content-title">Search results for {urlQuery.search} </h1>

        <ul className="flex-listing">{getList()}</ul>
      </div>
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
  }, [products.length, setLoading, query]);

  return products;
};

export default ProductList;
