import axios from "axios";
import { config } from "../config";

export async function addToCart(productId, quantity) {
  const response = await axios.post(`${config.url}/api/cart/new`, {
    productId,
    quantity,
  });
  return response.data.body;
}

export const fetchCartProducts = async () => {
  const response = await axios.get(`${config.url}/api/cart`);
  // if null is returned send  { products: [] }
  return response.data.body ? response.data.body : { products: [] };
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
