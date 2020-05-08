import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

console.log(process.env.REACT_APP_API);

// general configuration of api point
const config = {
  url: process.env.REACT_APP_API,
};

export const useFetchAllProducts = (setLoading) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${config.url}/products/list`).then((response) => {
      setProducts(response.data.body);
      // setLoding is set to false once we get the data
      setLoading(false);
    });
  }, [products.length, setLoading]);

  return products;
};

export const useFetchOneProduct = (setLoading, productId) => {
  const [product, setProduct] = useState({});
  const productLength = Object.keys(product).length;

  useEffect(() => {
    axios.get(`${config.url}/products/${productId}`).then((response) => {
      setProduct(response.data.body);
      setLoading(false);
    });
  }, [productLength, productId, setLoading]);

  return product;
};

export async function searchProducts(searchValue) {
  const response = await axios.post(
    `${config.url}/products/filter/search`,
    { search: searchValue },
    { headers: { "Content-Type": "application/json" } }
  );

  return response.data.body;
}

export async function addToCart(productId, quantity) {
  const response = await axios.post(`${config.url}/cart/new`, {
    productId,
    quantity,
  });

  return response.data.body;
}

export const useFetchCartProducts = (setLoading) => {
  const [cart, setCart] = useState({});
  const cartLength = Object.keys(cart).length;

  useEffect(() => {
    axios.get(`${config.url}/cart`).then((response) => {
      setCart(response.data.body);
      setLoading(false);
    });
  }, [cartLength, setLoading]);
  return cart;
};

export const useHeaderProfileData = (isLoggedIn, localUsername) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${config.url}/users/store`, {
        username: localUsername,
      });
      setUsername(response.data.body.username);
    }
    if (isLoggedIn) {
      fetchData();
    }
  }, [username, isLoggedIn, localUsername]);

  return username;
};
