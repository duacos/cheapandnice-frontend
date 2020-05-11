import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../config";

export const useFetchAllProducts = (setLoading) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${config.url}/api/products/list`).then((response) => {
      setProducts(response.data.body);
      // setLoding is set to false once we get the data
      setLoading(false);
    });
  }, [products.length, setLoading]);

  return products;
};

export const useFetchOneProduct = (setLoading, productId) => {
  const [product, setProduct] = useState({ photos: [] });
  const productLength = Object.keys(product).length;

  useEffect(() => {
    axios.get(`${config.url}/api/products/${productId}`).then((response) => {
      setProduct(response.data.body);
      setLoading(false);
    });
  }, [productLength, productId, setLoading]);

  return product;
};

export async function searchProducts(searchValue) {
  const response = await axios.post(
    `${config.url}/api/products/filter/search`,
    { search: searchValue },
    { headers: { "Content-Type": "application/json" } }
  );

  return response.data.body;
}

export const useFetchCurrentUser = (isLoggedIn) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${config.url}/api/users/current`);
      setUsername(response.data.body.username);
    }
    if (isLoggedIn) {
      fetchData();
    }
  }, [username, isLoggedIn]);

  return username;
};

export async function addToCart(productId, quantity) {
  const response = await axios.post(`${config.url}/api/cart/new`, {
    productId,
    quantity,
  });
  return response.data.body;
}

export const fetchCartProducts = async () => {
  const response = await axios.get(`${config.url}/api/cart`);
  return response.data.body;
};

export const removeProductFromCart = (cartId, productId) => {
  return axios
    .patch(`${config.url}/api/cart/remove/product`, {
      cartId,
      productId,
    })
    .catch((e) => {
      throw new Error(e.message);
    });
};
