import React from "react";
import Header from "../components/Header";

const MainLayout = (props) => {
  return (
    <React.Fragment>
      <div id="page-container">
        <div id="content-wrap">
          <Header />
          {props.children}
          <footer>&copy;</footer>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainLayout;
