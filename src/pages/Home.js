import React, { useState, useEffect } from "react";
import "../assets/styles/home.sass";
import axios from "axios";
import { useLoading } from "../helpers";
import ProductItem from "../components/ProductItem";

const Home = () => {
  const loadPage = useLoading();
  const products = useFetchData(loadPage);

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

const useFetchData = (loadPage) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // make the request ONLY if "products" is empty (to avoid infinite loop)
    if (products.length === 0) {
      axios.get("http://localhost:8000/api/products/list").then((response) => {
        setProducts(response.data.body);
        // setLoding is set to false once we get the data
        loadPage.setLoading(false);
      });
    }
  }, [loadPage, products]);

  return products;
};

export default Home;
