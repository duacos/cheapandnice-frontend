import React from "react";
import logo from "../assets/images/logo.png";
import { Link, useHistory } from "react-router-dom";
import SearchBar from "./SearchBar";
import { ReactComponent as ProfileSImg } from "../assets/images/profile.svg";
import { ReactComponent as CartImg } from "../assets/images/cart.svg";
import axios from "axios";
import { config } from "../config";
import { useFetchCurrentUser } from "../api/products";

const Header = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const username = useFetchCurrentUser(isLoggedIn);
  const history = useHistory();

  const handleClick = async () => {
    localStorage.clear();
    await axios.delete(`${config.url}/api/users/logout`);
    history.push("/login");
  };

  // Prevent search list from being visible all the time

  return (
    <header className="header">
      <Link to="/">
        <img className="header-img" src={logo} alt="cheap and nice logo"></img>
      </Link>

      <SearchBar />
      <div className="header-icons">
        <div className="header-icon">
          <ProfileSImg />
        </div>
        <div className="header-text">
          {isLoggedIn ? (
            <React.Fragment>
              {username} |{" "}
              <span className="header-logout" onClick={handleClick}>
                Logout
              </span>
            </React.Fragment>
          ) : (
            <div>
              <Link to="/login">Log in</Link> |{" "}
              <Link to="/signup">Sign up</Link>
            </div>
          )}
        </div>

        {isLoggedIn ? (
          <React.Fragment>
            <div className="header-icon">
              <CartImg />
            </div>
            <div className="header-text">
              <Link to="/products/cart">Shopping cart</Link>
            </div>
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

export default Header;
