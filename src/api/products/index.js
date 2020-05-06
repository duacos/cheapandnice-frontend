import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export const useFetchAllProducts = (loadPage) => {
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

export const useFetchOneProduct = (loadPage, productId) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    // ONLY if "products" is empty
    if (Object.keys(product).length === 0) {
      axios
        .get(`http://localhost:8000/api/products/${productId}`)
        .then((response) => {
          setProduct(response.data.body);
          loadPage.setLoading(false);
        });
    }
  }, [productId, loadPage, product]);

  return product;
};

export const useFetchFilteredProducts = (filter) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    // ONLY if "products" is empty
    if (Object.keys(product).length === 0) {
      axios
        .get("http://localhost:8000/api/products/filtered", {
          filter: "fashion",
        })
        .then((response) => {
          setProduct(response.data.body);
        });
    }
  }, [product, filter]);

  return product;
};

export async function searchProducts(searchValue) {
  const response = await axios.post(
    "http://localhost:8000/api/products/filter/search",
    { search: searchValue },
    { headers: { "Content-Type": "application/json" } }
  );
  console.log(response.data.body);
}

export const useHeaderProfileData = (isLoggedIn, localUsername) => {
  const [username, setUsername] = useState("");

  async function fetchData() {
    const response = await axios.get("http://localhost:8000/api/users/store", {
      username: localUsername,
    });

    setUsername(response.data.body.username);
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  });

  return username;
};
