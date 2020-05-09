import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { Link, useHistory } from "react-router-dom";
import SearchResults from "../components/SearchResults";

import { ReactComponent as ProfileSImg } from "../assets/images/profile.svg";
import { ReactComponent as CartImg } from "../assets/images/cart.svg";

import { searchProducts, useHeaderProfileData } from "../api/products";

const Header = () => {
  const localUsername = localStorage.getItem("username");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  /* we don't want the search list to be visible the whole time,
   but only when we type in the search bar*/
  const [resultsVisible, setResultsVisible] = useState(false);
  const username = useHeaderProfileData(isLoggedIn, localUsername);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    searchProducts(e.target.value).then((data) => {
      setResults(data);
    });

    // search results are visible while typing
    setResultsVisible(true);
  };

  const handleClick = () => {
    // Invisible when pressing "search"
    setResultsVisible(false);
    if (searchValue) history.push(`/products?search=${searchValue}`);
  };

  const handleOnFocus = () => {
    // Remove the search results if active
    setResultsVisible(false);
  };

  return (
    <header className="header">
      <Link to="/">
        <img className="header-img" src={logo} alt="cheap and nice logo"></img>
      </Link>
      <div className="header-search">
        <div className="header-search-bar">
          <input
            className="header-input"
            placeholder="Enter your search ..."
            onChange={handleChange}
            onFocus={handleOnFocus}
            type="text"
          />
          <button className="header-search-button" onClick={handleClick}>
            Search
          </button>
        </div>
        {resultsVisible ? (
          <ul className="header-search-results">
            <SearchResults results={results} />
          </ul>
        ) : (
          ""
        )}
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

        {username ? (
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
