import React, { useState } from "react";
import SearchResults from "../components/SearchResults";
import { useHistory } from "react-router-dom";
import { searchProducts } from "../api/products";

const SearchBar = () => {
  const [resultsVisible, setResultsVisible] = useState(false);
  const [results, setResults] = useState([]);
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    searchProducts(e.target.value).then((data) => {
      setResults(data);
    });

    // search results are visible while typing
    setResultsVisible(true);
  };

  const handleOnFocus = () => {
    // Remove the search results if active
    setResultsVisible(false);
  };

  const handleClick = () => {
    // Invisible when pressing "search"
    setResultsVisible(false);
    if (searchValue) history.push(`/products?search=${searchValue}`);
  };
  return (
    <div className="header-search">
      <div className="header-search-bar">
        <input
          className="header-input"
          placeholder="Enter your search ..."
          onChange={handleChange}
          onFocus={handleOnFocus}
          type="text"
        />
      </div>
      {resultsVisible ? (
        <ul className="header-search-results">
          <SearchResults results={results} />
        </ul>
      ) : (
        ""
      )}

      <button className="header-search-button" onClick={handleClick}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
