import React from "react";
import Header from "../components/Header";

const MainLayout = (props) => {
  return (
    <React.Fragment>
      <div id="page-container">
        <div id="content-wrap">
          <Header />
          {props.children}
          <footer>
            <div className="container">
              &copy; {new Date().getFullYear()} Cheap and Nice - All rights
              reserved
            </div>
          </footer>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainLayout;
