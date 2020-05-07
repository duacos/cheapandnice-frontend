import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { ReactComponent as ProfileSImg } from "../assets/images/profile.svg";
import { ReactComponent as CartImg } from "../assets/images/cart.svg";
import { searchProducts, useHeaderProfileData } from "../api/products";
import SearchResults from "../components/SearchResults";

const localUsername = localStorage.getItem("username");
const isLoggedIn = localStorage.getItem("isLoggedIn");

const Header = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [resultsVisible, setResultsVisible] = useState(false);
  const username = useHeaderProfileData(isLoggedIn, localUsername);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    searchProducts(e.target.value).then((data) => {
      setResults(data);
    });
    setResultsVisible(true);
  };

  const handleClick = () => {
    searchProducts(searchValue).then((data) => {
      setResults(data);
    });
    setResultsVisible(false);
  };

  const handleOnFocus = () => {
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
