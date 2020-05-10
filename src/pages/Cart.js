import React, { useState, useEffect } from "react";
import "../assets/styles/cart.sass";
import { useLoading } from "../helpers";
import CartList from "../components/CartList";
import { fetchCartProducts } from "../api/products";

const Cart = () => {
  const { setLoading, isLoading } = useLoading();
  const [cart, setCart] = useState({ products: [] });
  const { totalPrice, quantity } = useCartSummary(cart);
  const cartLength = Object.keys(cart).length;

  useEffect(() => {
    fetchCartProducts().then((cart) => {
      setCart(cart);
      setLoading(false);
    });
  }, [cartLength, setLoading]);

  const filterWhenDeleted = () => {
    fetchCartProducts().then((cart) => {
      setCart(cart);
      setLoading(false);
    });
  };

  const getList = () => {
    const { products, _id } = cart;
    return products.map((product) => {
      return (
        <li key={product._id}>
          <CartList product={product} filter={filterWhenDeleted} cartId={_id} />
        </li>
      );
    });
  };

  return isLoading ? (
    <h1>Loading</h1>
  ) : (
    <React.Fragment>
      <div className="container">
        <h1 className="content-title">These are your products</h1>
        <div className="flex-listing">
          <ul className="cart">{getList()}</ul>
          <div className="cart-summary">
            <div className="cart-product-details">
              <div className="cart-product-quantity">
                Subtotal ({quantity}):
              </div>
              <span>
                <div className="cart-product-price">
                  ${totalPrice.toFixed(2)}
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const useCartSummary = (cart) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    const { products } = cart;
    // reduce product prices to a single value
    setTotalPrice(
      products.reduce((acum, product) => {
        const priceForEachItem = product.price.toFixed(2) * product.quantity;
        return acum + priceForEachItem;
      }, 0) // starting value of the accumulator (acum)
    );
    // same process as above for quantity
    setQuantity(products.reduce((acum, product) => acum + product.quantity, 0));
  }, [setTotalPrice, setQuantity, cart]);

  return {
    totalPrice,
    quantity,
  };
};

export default Cart;
