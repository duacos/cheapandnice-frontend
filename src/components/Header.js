import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { ReactComponent as ProfileSImg } from "../assets/images/profile.svg";
import { ReactComponent as CartImg } from "../assets/images/cart.svg";
import axios from "axios";

import { searchProducts, useHeaderProfileData } from "../api/products";

axios.defaults.withCredentials = true;

const localUsername = localStorage.getItem("username");
const isLoggedIn = localStorage.getItem("isLoggedIn");

const Header = () => {
  const [value, setValue] = useState("");
  const username = useHeaderProfileData(isLoggedIn, localUsername);

  const handleChange = (e) => {
    setValue(e.target.value);
    searchProducts(e.target.value);
  };

  const handleClick = () => {
    searchProducts(value);
  };

  return (
    <header className="header">
      <img className="header-img" src={logo} alt="cheap and nice logo"></img>
      <div className="header-search">
        <input
          className="header-input"
          placeholder="Enter your search ..."
          onChange={handleChange}
          type="text"
        />
        <button onClick={handleClick}>Search</button>
      </div>
      <div className="header-icons">
        <div className="header-icon">
          <ProfileSImg />
        </div>
        <div className="header-text">
          {username ? (
            username
          ) : (
            <div>
              <Link to="/login">Login</Link> | Register
            </div>
          )}
        </div>

        <div className="header-icon">
          <CartImg />
        </div>
        <div className="header-text">
          <Link to="/login">Shopping cart</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
