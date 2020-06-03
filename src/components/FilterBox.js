import React, { useState, useEffect } from "react";

const FilterBox = ({ products, setFilteredData }) => {
  const [category, setCategory] = useState("all");

  const handleClick = (category) => {
    // if there is a category then filter the data
    const filtered = products.filter((product) => {
      return product.type === category;
    });
    debugger;
    setCategory(category);
    setFilteredData(filtered);
  };

  return (
    <div className="filter-box">
      <ul>
        <li
          className={category === "all" ? "active" : "inactive"}
          onClick={handleClick.bind(this, "all")}
        >
          All products
        </li>
        <li
          className={category === "fashion" ? "active" : "inactive"}
          onClick={handleClick.bind(this, "fashion")}
        >
          Fashion
        </li>
        <li
          className={category === "technology" ? "active" : "inactive"}
          onClick={handleClick.bind(this, "technology")}
        >
          Technology
        </li>
        <li
          className={category === "art" ? "active" : "inactive"}
          onClick={handleClick.bind(this, "art")}
        >
          Art
        </li>
        <li
          className={category === "photography" ? "active" : "inactive"}
          onClick={handleClick.bind(this, "photography")}
        >
          Photography
        </li>
      </ul>
    </div>
  );
};

export default FilterBox;
