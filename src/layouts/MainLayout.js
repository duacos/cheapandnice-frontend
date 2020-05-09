import React from "react";
import Header from "../components/Header";

const MainLayout = (props) => {
  return (
    <React.Fragment>
      <Header />
      {props.children}
      <footer>&copy;</footer>
    </React.Fragment>
  );
};

export default MainLayout;
