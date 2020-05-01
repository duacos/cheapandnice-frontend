import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";

// This allows me to load multiple layouts
const LayoutComponent = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <MainLayout>
          <Component {...props} />
        </MainLayout>
      )}
    />
  );
};

const Router = () => (
  <BrowserRouter>
    <Switch>
      <LayoutComponent exact path="/" component={Home} />

      <Route exact path="/login" component={Login} />
    </Switch>
  </BrowserRouter>
);

export default Router;
