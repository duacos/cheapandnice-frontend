import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { ReactComponent as ProfileSImg } from "../assets/images/profile.svg";
import { ReactComponent as CartImg } from "../assets/images/cart.svg";
import axios from "axios";

axios.defaults.withCredentials = true;

const Header = () => {
  const [username, setUsername] = useState("");

  async function fetchData() {
    const response = await axios.get("http://localhost:8000/api/users/store", {
      username: localStorage.getItem("username"),
    });

    setUsername(response.data.body.username);
  }

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      fetchData();
    }
  }, []);

  return (
    <header className="header">
      <div className="container">
        <img className="header-img" src={logo} alt="cheap and nice logo"></img>
        <div className="header-search">
          <input className="header-input" type="text" />
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
      </div>
    </header>
  );
};

export default Header;
