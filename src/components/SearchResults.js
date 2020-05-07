import React from "react";
import "../assets/styles/home.sass";
import { Link } from "react-router-dom";

const SearchResults = (props) => {
  const getList = () => {
    return props.results.map((result) => {
      return (
        <li className="header-search-list" key={result._id}>
          <div className="header-search-img">
            <img src={result.photos[0].thumbnail} className="" alt="results" />
          </div>
          {/* it's amazin <Link> doesn't work with param change, that's why the url chnages but not the component
           I'm using a tag for now */}
          <div className="header-search-text">
            <Link to={`/products/${result._id}`}>{result.title}</Link>
          </div>
        </li>
      );
    });
  };

  return <React.Fragment>{getList()}</React.Fragment>;
};

export default SearchResults;
