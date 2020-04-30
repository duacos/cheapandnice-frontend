import React from "react";
import Header from "../components/Header";

const MainLayout = (props) => {
  return (
    <React.Fragment>
      <Header />
      {props.children}
    </React.Fragment>
  );
};

export default MainLayout;
