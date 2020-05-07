import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export const useFetchAllProducts = (setLoading) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // make the request ONLY if "products" is empty (to avoid infinite loop)

    axios.get("http://localhost:8000/api/products/list").then((response) => {
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
    axios
      .get(`http://localhost:8000/api/products/${productId}`)
      .then((response) => {
        setProduct(response.data.body);
        setLoading(false);
      });
  }, [productLength, productId, setLoading]);

  return product;
};

export async function searchProducts(searchValue) {
  const response = await axios.post(
    "http://localhost:8000/api/products/filter/search",
    { search: searchValue },
    { headers: { "Content-Type": "application/json" } }
  );

  return response.data.body;
}

export const useHeaderProfileData = (isLoggedIn, localUsername) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:8000/api/users/store",
        { username: localUsername }
      );
      setUsername(response.data.body.username);
    }
    if (isLoggedIn) {
      fetchData();
    }
  }, [username, isLoggedIn, localUsername]);

  return username;
};
